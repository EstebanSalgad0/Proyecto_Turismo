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
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated  # Permisos de acceso a vistas.
from .models import SolicitudOferente, Servicio  # Importa los modelos de la app (SolicitudOferente y Servicio).
from .serializers import ServicioSerializer  # Importa el serializador para el modelo Servicio.

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
        
class SolicitudOferenteView(APIView):
    def post(self, request):
        email = request.data.get('email')  # Obtiene el email de la solicitud.
        password = request.data.get('password')  # Obtiene la contraseña de la solicitud.
        servicio = request.data.get('servicio')  # Obtiene el nombre del servicio en la solicitud.

        try:
            user = CustomUser.objects.get(email=email)  # Busca al usuario por email.
            if user.check_password(password):  # Verifica la contraseña proporcionada.
                # Crea una solicitud para que el usuario se convierta en oferente.
                solicitud = SolicitudOferente.objects.create(user=user, servicio=servicio)
                solicitud.save()  # Guarda la solicitud en la base de datos.
                return Response({'success': True, 'mensaje': 'Solicitud enviada correctamente'}, status=status.HTTP_200_OK)
            return Response({'error': 'Contraseña incorrecta'}, status=status.HTTP_400_BAD_REQUEST)  # Error si la contraseña es incorrecta.
        except CustomUser.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)  # Error si el usuario no existe.
        

class ManejarSolicitudOferenteView(APIView):
    permission_classes = [IsAdminUser]  # Solo los administradores pueden acceder a esta vista.

    def post(self, request, solicitud_id):
        try:
            solicitud = SolicitudOferente.objects.get(id=solicitud_id)  # Busca la solicitud por su ID.
            accion = request.data.get('accion')  # Obtiene la acción ('aceptar' o 'rechazar').

            if accion == 'aceptar':
                # Cambia el rol del usuario a 'oferente' y acepta la solicitud.
                solicitud.user.role = 'oferente'
                solicitud.user.save()
                solicitud.estado = 'aceptada'
                solicitud.save()
                return Response({'success': True, 'mensaje': 'Solicitud aceptada'}, status=status.HTTP_200_OK)

            elif accion == 'rechazar':
                # Rechaza la solicitud.
                solicitud.estado = 'rechazada'
                solicitud.save()
                return Response({'success': True, 'mensaje': 'Solicitud rechazada'}, status=status.HTTP_200_OK)

            return Response({'error': 'Acción no válida'}, status=status.HTTP_400_BAD_REQUEST)  # Si la acción no es válida, devuelve un error.

        except SolicitudOferente.DoesNotExist:
            return Response({'error': 'Solicitud no encontrada'}, status=status.HTTP_404_NOT_FOUND)  # Error si la solicitud no existe.

        
class ListarSolicitudesView(APIView):
    permission_classes = [IsAdminUser]  # Solo los administradores pueden acceder a esta vista.

    def get(self, request):
        # Obtiene todas las solicitudes y devuelve una lista con su información.
        solicitudes = SolicitudOferente.objects.all()
        data = [{'id': solicitud.id, 'user': solicitud.user.email, 'servicio': solicitud.servicio, 'estado': solicitud.estado} for solicitud in solicitudes]
        return Response(data, status=status.HTTP_200_OK)  # Devuelve la lista de solicitudes.

    
class CrearServicioView(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden crear servicios.

    def post(self, request):
        serializer = ServicioSerializer(data=request.data)  # Serializa los datos enviados en la solicitud.
        if serializer.is_valid():  # Verifica si los datos son válidos.
            # Crea un nuevo servicio con el usuario logueado y estado 'pendiente'.
            servicio = serializer.save(usuario=request.user, estado='pendiente')
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Devuelve el servicio creado.
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Devuelve errores si los datos no son válidos.


class ListarServiciosView(APIView):  # Define una vista basada en clase usando APIView de Django REST Framework.
    def get(self, request):  # Define el método HTTP GET para manejar solicitudes GET.
        servicios = Servicio.objects.all()  # Consulta todos los objetos del modelo Servicio en la base de datos.
        serializer = ServicioSerializer(servicios, many=True)  # Serializa los objetos de servicio en una lista (many=True).
        return Response(serializer.data)  # Devuelve la lista de servicios serializados en una respuesta HTTP.


class ManejarServiciosView(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden manejar servicios.

    def get(self, request):
        # Obtiene todos los servicios con estado 'pendiente'.
        servicios = Servicio.objects.filter(estado='pendiente')
        serializer = ServicioSerializer(servicios, many=True)  # Serializa los servicios.
        return Response(serializer.data)  # Devuelve los servicios pendientes.

    def post(self, request, servicio_id):
        # Acepta o rechaza un servicio según el ID y la acción proporcionada.
        try:
            servicio = Servicio.objects.get(id=servicio_id)  # Busca el servicio por ID.
            accion = request.data.get('accion')  # 'aceptar' o 'rechazar'.

            if accion == 'aceptar':
                # Cambia el estado del servicio a 'aceptado'.
                servicio.estado = 'aceptado'
                servicio.save()
                return Response({'success': True, 'mensaje': 'Servicio aceptado'}, status=status.HTTP_200_OK)
            elif accion == 'rechazar':
                # Cambia el estado del servicio a 'rechazado'.
                servicio.estado = 'rechazado'
                servicio.save()
                return Response({'success': True, 'mensaje': 'Servicio rechazado'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Acción no válida'}, status=status.HTTP_400_BAD_REQUEST)  # Error si la acción no es válida.
        except Servicio.DoesNotExist:
            return Response({'error': 'Servicio no encontrado'}, status=status.HTTP_404_NOT_FOUND)  # Error si el servicio no existe.


class ListarServiciosAceptadosView(APIView):
    def get(self, request):
        # Obtiene todos los servicios aceptados.
        servicios = Servicio.objects.filter(estado='aceptado')
        serializer = ServicioSerializer(servicios, many=True)  # Serializa los servicios.
        return Response(serializer.data)  # Devuelve los servicios aceptados.

