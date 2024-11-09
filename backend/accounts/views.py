from rest_framework.authtoken.views import ObtainAuthToken  # Importa la vista prediseñada para obtener tokens de autenticación en Django REST Framework.
from rest_framework.authtoken.models import Token  # Importa el modelo Token, que se utiliza para gestionar los tokens de autenticación.
from rest_framework.response import Response  # Importa la clase Response para devolver respuestas HTTP personalizadas.
from django.contrib.auth import authenticate  # Importa la función authenticate, que verifica las credenciales del usuario.
from rest_framework import status  # Importa los códigos de estado HTTP de Django REST Framework.
from rest_framework.views import APIView  # Importa la clase base APIView para crear vistas basadas en API.
from django.contrib.auth import get_user_model  # Obtiene el modelo de usuario personalizado configurado en el proyecto.
from django.core.mail import EmailMultiAlternatives, EmailMessage  # Importa funciones para enviar correos electrónicos.
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode  # Funciones que codifican y decodifican datos en base64 de manera segura.
from django.utils.encoding import force_bytes, force_str  # Funciones para convertir datos a bytes o strings.
from django.template.loader import render_to_string  # Importa render_to_string para renderizar plantillas HTML a cadenas de texto.
from django.utils.html import strip_tags  # Elimina etiquetas HTML de un string para generar una versión de texto plano de un contenido HTML.
from django.contrib.sites.shortcuts import get_current_site  # Obtiene el sitio actual (dominio) en el que se está ejecutando la solicitud.
from django.contrib.auth.tokens import default_token_generator  # Importa el generador de tokens predeterminado para autenticación de usuarios.
from django.urls import reverse  # Importa reverse para obtener URLs en base a sus nombres en el sistema de rutas.
from django.shortcuts import render, get_object_or_404, redirect  # Importa funciones para manejar respuestas y vistas.
from .models import CustomUser  # Importa modelos de la app.
from .utils import verify_captcha  # Importa la función verify_captcha para verificar captchas.
from django.http import JsonResponse  # Importa clases para respuestas HTTP.
import csv  # Importa csv para manejar archivos CSV.
from io import StringIO  # Importa StringIO para operaciones de manejo de strings en memoria.
from django.db import transaction

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')  # Obtiene el email enviado en la solicitud POST.
        password = request.data.get('password')  # Obtiene la contraseña enviada en la solicitud POST.
        captcha_response = request.data.get('captcha')  # Obtiene la respuesta del captcha enviado en la solicitud POST.

        # Verificar CAPTCHA
        if not verify_captcha(captcha_response):  # Llama a la función verify_captcha para comprobar si el captcha es válido.
            return Response({'error': 'Captcha inválido. Por favor verifica que no eres un robot.'}, status=status.HTTP_400_BAD_REQUEST)  
            # Si el captcha no es válido, devuelve un error con estado 400.

        # Autenticando con email y password
        user = authenticate(request, email=email, password=password)  # Autentica al usuario utilizando el email y la contraseña proporcionados.

        if user is not None:  # Si el usuario fue autenticado correctamente:

            # Crea el token para el usuario
            token, created = Token.objects.get_or_create(user=user)  # Obtiene o crea un token de autenticación para el usuario.

            # Respuesta con los datos del usuario
            response_data = {
                'token': token.key,  # Devuelve el token del usuario.
                'user_id': user.pk,  # Devuelve el ID del usuario.
                'email': user.email,  # Devuelve el email del usuario.
                'first_name': user.first_name,  # Devuelve el primer nombre
                'last_name': user.last_name,  # Devuelve el apellido
                'role': user.role,  # Devuelve el rol del usuario.
                'is_first_login': user.is_first_login,  # Devolver esta información al frontend
            }

            # Usar transaction.on_commit para que el cambio se haga después de la respuesta
            if user.is_first_login:
                # Actualiza el valor de is_first_login después de enviar la respuesta
                transaction.on_commit(lambda: self.update_first_login_status(user))  # Cambia el valor de `is_first_login` después de la respuesta

            return Response(response_data)  # Devuelve la respuesta al frontend

        else:  # Si la autenticación falla:
            return Response({'error': 'Credenciales incorrectas'}, status=400)  # Devuelve un error indicando credenciales incorrectas.

    def update_first_login_status(self, user):
        """Actualiza el estado de 'is_first_login' después de la transacción"""
        user.is_first_login = False  # Marca como falso después del primer inicio de sesión
        user.save()

CustomUser = get_user_model()  # Obtiene el modelo de usuario personalizado configurado en el proyecto.

class ArtesanoFormView(APIView):
    def get(self, request, uidb64, token):
        try:
            # Decodificar uidb64 para obtener el ID original
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = get_object_or_404(CustomUser, pk=uid)
            
            if default_token_generator.check_token(user, token):
                return render(request, 'accounts/formulario_artesano.html', {'user': user, 'uidb64': uidb64, 'token': token})
            else:
                return render(request, 'accounts/activation_error.html')
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            return render(request, 'accounts/activation_error.html')

    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = get_object_or_404(CustomUser, pk=uid)

            if default_token_generator.check_token(user, token):
                # Nombre de la persona que envia el formulario
                nombre_completo = f"{user.first_name} {user.last_name}"

                # Procesar el formulario y activar la cuenta
                user_data = {
                    'tipo_formulario': 'Formulario de Artesanos',  # Añadir título del formulario
                    'separador': '-' * 60,  # Separador visual
                    'nombre_completo': f"Nombre completo: {request.data.get('nombre_completo', '')}",
                    'tipo_artesania': f"Tipo de artesanía: {request.data.get('tipo_artesania', '')}",
                    'descripcion': f"Descripción: {request.data.get('descripcion', '')}",
                    'agrupacion': f"Agrupación: {request.data.get('agrupacion', '')}",
                    'direccion': f"Dirección: {request.data.get('direccion', '')}",
                    'coordenadas': f"Coordenadas: {request.data.get('coordenadas', '')}",
                    'localidad': f"Localidad: {request.data.get('localidad', '')}",
                    'telefono': f"Teléfono: {request.data.get('telefono', '')}",
                    'email': f"Email: {request.data.get('email', '')}",
                    'redes_sociales': f"Redes sociales: {request.data.get('redes_sociales', '')}",
                    'pagina_web': f"Páginas web: {request.data.get('pagina_web', '')}",
                    'medios_pago': f"Medios de pago: {', '.join(request.data.getlist('medios_pago', []))}",
                    'separador1': '-' * 60,  # Separador visual
                    'enviado_por': f"Enviado por: {nombre_completo}",
                    'correo_asociado': f"Correo asociado a la cuenta: {user.email}"  # Formatear el correo
                }
                send_csv_email(user_data)
                user.is_active = True
                user.save()
                return redirect('activation_success')
            else:
                return render(request, 'accounts/activation_error.html')
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            return render(request, 'accounts/activation_error.html')

class BienesServiciosFormView(APIView):
    def get(self, request, uidb64, token):
        try:
            # Decodificar uidb64 para obtener el ID original
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = get_object_or_404(CustomUser, pk=uid)
            
            if default_token_generator.check_token(user, token):
                return render(request, 'accounts/formulario_bienes.html', {'user': user, 'uidb64': uidb64, 'token': token})
            else:
                return render(request, 'accounts/activation_error.html')
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            return render(request, 'accounts/activation_error.html')

    def post(self, request, uidb64, token):
        try:
            # Decodificar uidb64 para obtener el ID original
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = get_object_or_404(CustomUser, pk=uid)
            
            if default_token_generator.check_token(user, token):
               
                # Nombre de la persona que envia el formulario
                nombre_completo = f"{user.first_name} {user.last_name}"

                 # Procesar el formulario y activar la cuenta
                user_data = {
                    'tipo_formulario': 'Formulario de Bienes y Servicios',  # Añadir título del formulario
                    'separador': '-' * 60,  # Separador visual
                    'nombre_local': f"Nombre del local: {request.data.get('nombre_local', '')}",
                    'actividad': f"Actividad: {request.data.get('actividad', '')}",
                    'direccion': f"Dirección: {request.data.get('direccion', '')}",
                    'coordenadas': f"Coordenadas: {request.data.get('coordenadas', '')}",
                    'localidad': f"Localidad: {request.data.get('localidad', '')}",
                    'telefono': f"Teléfono: {request.data.get('telefono', '')}",
                    'horarios_atencion': f"Horarios de atención: {request.data.get('horarios_atencion', '')}",
                    'redes_sociales': f"Redes sociales: {request.data.get('redes_sociales', '')}",
                    'email': f"Email: {request.data.get('email', '')}",
                    'medios_pago': f"Medios de pago: {', '.join(request.data.getlist('medios_pago', []))}",
                    'separador1': '-' * 60,  # Separador visual
                    'enviado_por': f"Enviado por: {nombre_completo}",
                    'correo_asociado': f"Correo asociado a la cuenta: {user.email}"  # Formatear el correo
                }
                send_csv_email(user_data)
                user.is_active = True
                user.save()
                return redirect('activation_success')
            else:
                return render(request, 'accounts/activation_error.html')
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            return render(request, 'accounts/activation_error.html')

class CabanasFormView(APIView):
    def get(self, request, uidb64, token):
        try:
            # Decodificar uidb64 para obtener el ID original
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = get_object_or_404(CustomUser, pk=uid)
            
            if default_token_generator.check_token(user, token):
                return render(request, 'accounts/formulario_cabanas.html', {'user': user, 'uidb64': uidb64, 'token': token})
            else:
                return render(request, 'accounts/activation_error.html')
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            return render(request, 'accounts/activation_error.html')

    def post(self, request, uidb64, token):
        try:
            # Decodificar uidb64 para obtener el ID original
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = get_object_or_404(CustomUser, pk=uid)
            
            if default_token_generator.check_token(user, token):

                # Nombre de la persona que envia el formulario
                nombre_completo = f"{user.first_name} {user.last_name}"

                # Procesar el formulario y activar la cuenta
                user_data = {
                    'tipo_formulario': 'Formulario de Cabañas',  # Añadir título del formulario
                    'separador': '-' * 60,  # Separador visual
                    'nombre': f"Nombre del local: {request.data.get('nombre', '')}",
                    'actividad': f"Actividad: {request.data.get('actividad', '')}",
                    'direccion': f"Dirección: {request.data.get('direccion', '')}",
                    'coordenadas': f"Coordenadas: {request.data.get('coordenadas', '')}",
                    'localidad': f"Localidad: {request.data.get('localidad', '')}",
                    'telefono': f"Teléfono: {request.data.get('telefono', '')}",
                    'horarios': f"Horarios de atención: {request.data.get('horarios', '')}",
                    'redes': f"Redes sociales: {request.data.get('redes', '')}",
                    'pagina_web': f"Páginas web: {request.data.get('pagina_web', '')}",
                    'email': f"Email: {request.data.get('email', '')}",
                    'medios_pago': f"Medios de pago: {', '.join(request.data.getlist('medios_pago', []))}",
                    'separador1': '-' * 60,  # Separador visual
                    'enviado_por': f"Enviado por: {nombre_completo}",
                    'correo_asociado': f"Correo asociado a la cuenta: {user.email}"  # Formatear el correo
                }
                send_csv_email(user_data)
                user.is_active = True
                user.save()
                return redirect('activation_success')
            else:
                return render(request, 'accounts/activation_error.html')
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            return render(request, 'accounts/activation_error.html')

def send_csv_email(user_data):
    csv_file = StringIO()
    writer = csv.writer(csv_file)
    
    # Escribir los datos en formato de filas: columna 1 para el encabezado y columna 2 para el valor
    for key, value in user_data.items():
        writer.writerow([f"{value}\t"])

    email = EmailMessage(
        subject="Nuevo Registro de Oferente",
        body="Adjunto el archivo CSV con los datos del nuevo registro.",
        from_email="mueca@mueblescaracol.cl",
        to=["mueca@mueblescaracol.cl"],
    )
    csv_file.seek(0)
    email.attach("registro_oferente.csv", csv_file.getvalue(), "text/csv")
    email.send()


class RegisterView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        first_name = request.data.get('first_name')  # Obtiene el primer nombre
        last_name = request.data.get('last_name')  # Obtiene el apellido
        captcha_response = request.data.get('captcha')
        tipo_oferente = request.data.get('tipo_oferente')  # Obtiene el tipo de oferente

        # Verificar CAPTCHA
        if not verify_captcha(captcha_response):
            return Response({'error': 'Captcha inválido. Por favor verifica que no eres un robot.'}, status=status.HTTP_400_BAD_REQUEST)

        if not email or not password:
            return Response({'error': 'Faltan datos'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Crear el usuario sin activar
            user = CustomUser.objects.create_user(
                email=email, password=password, first_name=first_name, last_name=last_name, role='oferente', tipo_oferente=tipo_oferente, is_active=False, is_first_login=True
            )
            user.save()

            # Generar token y enlace de activación
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            current_site = get_current_site(request)

            # Determinar el enlace de activación según el tipo de oferente
            if tipo_oferente == 'artesano':
                verification_link = reverse('activar_artesano', kwargs={'uidb64': uid, 'token': token})
                subject = 'Activa tu cuenta como Artesano/a en Turismo Colbún'
                template_name = 'accounts/activation_email_artesano.html'
            elif tipo_oferente == 'bienesServicios':
                verification_link = reverse('activar_bienes', kwargs={'uidb64': uid, 'token': token})
                subject = 'Activa tu cuenta de Bienes y Servicios en Turismo Colbún'
                template_name = 'accounts/activation_email_bienes.html'
            elif tipo_oferente == 'cabanas':
                verification_link = reverse('activar_cabanas', kwargs={'uidb64': uid, 'token': token})
                subject = 'Activa tu cuenta de Cabañas en Turismo Colbún'
                template_name = 'accounts/activation_email_cabanas.html'
            else:
                return Response({'error': 'Tipo de oferente no válido.'}, status=status.HTTP_400_BAD_REQUEST)

            # Construir el enlace completo de activación
            activation_url = f"http://{current_site.domain}{verification_link}"

            # Renderizar el contenido del correo
            html_content = render_to_string(template_name, {
                'user': user,
                'activation_url': activation_url,
            })
            text_content = strip_tags(html_content)

            # Crear y enviar el correo de verificación
            from_email = 'mueca@mueblescaracol.cl'
            to_email = user.email
            email = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
            email.attach_alternative(html_content, "text/html")
            email.send()

            return Response({'message': 'Usuario registrado. Revisa tu correo para activar la cuenta.'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
        
class ActivateView(APIView):
    def get(self, request, uidb64, token):
        try:
            uid = force_bytes(urlsafe_base64_decode(uidb64))
            user = get_object_or_404(CustomUser, pk=uid)
            if default_token_generator.check_token(user, token):
                if user.tipo_oferente == 'artesano':
                    template_name = 'accounts/formulario_artesano.html'
                elif user.tipo_oferente == 'bienesServicios':
                    template_name = 'accounts/formulario_bienes.html'
                elif user.tipo_oferente == 'cabanas':
                    template_name = 'accounts/formulario_cabanas.html'
                else:
                    return Response({'error': 'Tipo de oferente no válido.'}, status=status.HTTP_400_BAD_REQUEST)
                return render(request, template_name, {'user': user, 'uidb64': uidb64, 'token': token})
            else:
                return Response({'error': 'Token inválido o expirado.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error de activación.'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, uidb64, token):
        try:
            uid = force_bytes(urlsafe_base64_decode(uidb64))
            user = get_object_or_404(CustomUser, pk=uid)
            if default_token_generator.check_token(user, token):
                # Procesa el formulario completado y activa la cuenta
                user.is_active = True
                user.save()
                return redirect('activation_success')  # Redirige a una página de éxito de activación
            else:
                return render(request, 'activation_error.html')
        except Exception as e:
            return render(request, 'activation_error.html')
        
class RequestPasswordResetView(APIView):
    def post(self, request):
        email = request.data.get('email')  # Cambiado de request.POST a request.data
        user = CustomUser.objects.filter(email=email).first()

        if user:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_link = request.build_absolute_uri(
                reverse('password_reset_confirm', kwargs={'uidb64': uid, 'token': token})
            )

            # Cargar la plantilla HTML y pasar el enlace de restablecimiento
            email_html = render_to_string('accounts/reset_email.html', {'reset_link': reset_link})

            # Enviar correo en formato HTML
            email_message = EmailMessage(
                subject="Restablecimiento de Contraseña",
                body=email_html,
                from_email="mueca@mueblescaracol.cl",
                to=[user.email]
            )
            email_message.content_subtype = "html"  # Importante: especificar que es HTML
            email_message.send()

            return JsonResponse({'message': 'Se ha enviado un correo de restablecimiento de contraseña.'}, status=200)
        
        return JsonResponse({'error': 'No existe una cuenta con ese correo electrónico.'}, status=404)
    
def password_reset_confirm_view(request, uidb64, token):
    # Decodificar uid
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = CustomUser.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
        user = None

    # Verificar que el token sea válido
    if user and default_token_generator.check_token(user, token):
        if request.method == 'POST':
            new_password = request.POST.get('new_password')
            if new_password:
                user.set_password(new_password)
                user.save()
                return redirect('password_reset_success')  # Redirige a la vista de éxito
            else:
                return JsonResponse({'error': 'La nueva contraseña no puede estar vacía.'}, status=400)
    
    # Renderiza la vista de confirmación con el uid y el token
    return render(request, 'accounts/password_reset_confirm.html', {
        'uid': uidb64,
        'token': token,
    })

def password_reset_success_view(request):
    return render(request, 'accounts/password_reset_success.html')

