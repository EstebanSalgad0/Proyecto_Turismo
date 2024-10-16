from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from .models import CustomUser
from .serializers import UserSerializer  # Aquí está el serializador importado
from django.shortcuts import render
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from .utils import verify_captcha  # Importa la función de verificación de captcha

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        captcha_response = request.data.get('captcha')  # Obtener la respuesta del captcha

        # Verificar CAPTCHA
        if not verify_captcha(captcha_response):
            return Response({'error': 'Captcha inválido. Por favor verifica que no eres un robot.'}, status=status.HTTP_400_BAD_REQUEST)

        # Autenticando con email y password
        user = authenticate(request, email=email, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'email': user.email,
                'role': user.role,
            })
        else:
            return Response({'error': 'Credenciales incorrectas'}, status=400)


CustomUser = get_user_model()

class RegisterView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        captcha_response = request.data.get('captcha')  # Obtener la respuesta del captcha

        # Verificar CAPTCHA
        if not verify_captcha(captcha_response):
            return Response({'error': 'Captcha inválido. Por favor verifica que no eres un robot.'}, status=status.HTTP_400_BAD_REQUEST)

        if not email or not password:
            return Response({'error': 'Faltan datos'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.create_user(email=email, password=password, role='turista', is_active=False)
            user.save()

            # Enviar correo de verificación
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            current_site = get_current_site(request)
            verification_link = reverse('activate', kwargs={'uidb64': uid, 'token': token})
            activation_url = f"http://{current_site.domain}{verification_link}"

            # Renderizar el contenido HTML y la versión en texto plano
            html_content = render_to_string('accounts/activation_email.html', {
                'user': user,
                'activation_url': activation_url,
            })
            text_content = strip_tags(html_content)  # Convertir a texto plano por si el cliente no soporta HTML

            # Crear el objeto de correo electrónico con HTML
            subject = 'Activa tu cuenta en Turismo Colbún'
            from_email = 'mueca@mueblescaracol.cl'
            to_email = user.email

            email = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
            email.attach_alternative(html_content, "text/html")  # Adjuntar la versión HTML

            # Enviar el correo
            email.send()

            return Response({'message': 'Usuario registrado. Revisa tu correo para activar la cuenta.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ActivateAccountView(APIView):
    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return render(request, 'accounts/activation_success.html', {'user': user})
        else:
            return render(request, 'accounts/activation_error.html')

