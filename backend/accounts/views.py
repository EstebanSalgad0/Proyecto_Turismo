from rest_framework.authtoken.views import ObtainAuthToken  # Importa la vista prediseñada para obtener tokens de autenticación en Django REST Framework.
from rest_framework.authtoken.models import Token  # Importa el modelo Token, que se utiliza para gestionar los tokens de autenticación.
from rest_framework.response import Response  # Importa la clase Response para devolver respuestas HTTP personalizadas.
from django.contrib.auth import authenticate  # Importa la función authenticate, que verifica las credenciales del usuario.
from rest_framework import status  # Importa los códigos de estado HTTP de Django REST Framework.
from rest_framework.views import APIView  # Importa la clase base APIView para crear vistas basadas en API.
from django.contrib.auth import get_user_model  # Obtiene el modelo de usuario personalizado configurado en el proyecto.
from rest_framework.permissions import AllowAny  # Permiso que permite el acceso a cualquier usuario, autenticado o no.
from django.core.mail import send_mail  # Importa la función send_mail para enviar correos electrónicos.
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode  # Funciones que codifican y decodifican datos en base64 de manera segura.
from django.utils.encoding import force_bytes, force_str  # Funciones para convertir datos a bytes o strings.
from django.template.loader import render_to_string  # Importa render_to_string para renderizar plantillas HTML a cadenas de texto.
from django.contrib.sites.shortcuts import get_current_site  # Obtiene el sitio actual (dominio) en el que se está ejecutando la solicitud.
from django.contrib.auth.tokens import default_token_generator  # Importa el generador de tokens predeterminado para autenticación de usuarios.
from django.urls import reverse  # Importa reverse para obtener URLs en base a sus nombres en el sistema de rutas.
from .models import CustomUser  # Importa el modelo CustomUser definido en la aplicación.
from .serializers import UserSerializer  # Importa el serializador UserSerializer para el modelo CustomUser.
from django.shortcuts import render  # Importa la función render para generar respuestas HTML.
from django.core.mail import EmailMultiAlternatives  # Importa EmailMultiAlternatives para enviar correos electrónicos con formato HTML y texto plano.
from django.template.loader import render_to_string  # Se usa para renderizar plantillas HTML como cadenas de texto (importado de nuevo).
from django.utils.html import strip_tags  # Elimina etiquetas HTML de un string para generar una versión de texto plano de un contenido HTML.
from .utils import verify_captcha  # Importa la función verify_captcha, que se usa para verificar el captcha con Google reCAPTCHA.
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated  # Importa permisos: acceso para cualquier usuario, solo admins o usuarios autenticados.
from .models import SolicitudOferente, Servicio  # Importa los modelos SolicitudOferente y Servicio de la app.
from .serializers import ServicioSerializer  # Importa el serializador ServicioSerializer para el modelo Servicio.
from django.utils import timezone  # Importa timezone para manejar fechas y horas con soporte de zona horaria.
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.html import strip_tags
from django.contrib.auth.tokens import default_token_generator
from django.shortcuts import get_object_or_404, render, redirect
from .models import CustomUser
import csv
from django.core.mail import EmailMessage
from django.http import HttpResponse
from io import StringIO
from rest_framework.response import Response
from rest_framework.views import APIView

class CustomAuthToken(ObtainAuthToken):  # Define una clase CustomAuthToken que hereda de ObtainAuthToken para personalizar la autenticación basada en tokens.
    def post(self, request, *args, **kwargs):  # Sobrescribe el método POST para manejar las solicitudes de autenticación.
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
            token, created = Token.objects.get_or_create(user=user)  # Obtiene o crea un token de autenticación para el usuario.
            return Response({  
                'token': token.key,  # Devuelve el token del usuario.
                'user_id': user.pk,  # Devuelve el ID del usuario.
                'email': user.email,  # Devuelve el email del usuario.
                'role': user.role,  # Devuelve el rol del usuario.
            })
        else:  # Si la autenticación falla:
            return Response({'error': 'Credenciales incorrectas'}, status=400)  # Devuelve un error indicando credenciales incorrectas.

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
                # Procesar el formulario y activar la cuenta
                user_data = {
                    'tipo_formulario': 'Formulario de Artesanos',  # Añadir título del formulario
                    'nombre_completo': request.data.get('nombre_completo', ''),
                    'tipo_artesania': request.data.get('tipo_artesania', ''),
                    'descripcion': request.data.get('descripcion', ''),
                    'agrupacion': request.data.get('agrupacion', ''),
                    'direccion': request.data.get('direccion', ''),
                    'coordenadas': request.data.get('coordenadas', ''),
                    'localidad': request.data.get('localidad', ''),
                    'telefono': request.data.get('telefono', ''),
                    'email': user.email,
                    'redes_sociales': request.data.get('redes_sociales', ''),
                    'pagina_web': request.data.get('pagina_web', ''),
                    'medios_pago': request.data.getlist('medios_pago', [])
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
                # Procesar el formulario y activar la cuenta
                user_data = {
                    'tipo_formulario': 'Formulario de Bienes y Servicios',  # Añadir título del formulario
                    'nombre_local': request.data.get('nombre_local', ''),
                    'actividad': request.data.get('actividad', ''),
                    'direccion': request.data.get('direccion', ''),
                    'coordenadas': request.data.get('coordenadas', ''),
                    'localidad': request.data.get('localidad', ''),
                    'telefono': request.data.get('telefono', ''),
                    'horarios_atencion': request.data.get('horarios_atencion', ''),
                    'redes_sociales': request.data.get('redes_sociales', ''),
                    'email': user.email,
                    'medios_pago': request.data.getlist('medios_pago', [])
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
                # Procesar el formulario y activar la cuenta
                user_data = {
                    'tipo_formulario': 'Formulario de Cabañas',  # Añadir título del formulario
                    'nombre': request.data.get('nombre', ''),
                    'actividad': request.data.get('actividad', ''),
                    'direccion': request.data.get('direccion', ''),
                    'coordenadas': request.data.get('coordenadas', ''),
                    'localidad': request.data.get('localidad', ''),
                    'telefono': request.data.get('telefono', ''),
                    'horarios': request.data.get('horarios', ''),
                    'redes': request.data.get('redes', ''),
                    'pagina_web': request.data.get('pagina_web', ''),
                    'email': user.email,
                    'medios_pago': request.data.getlist('medios_pago', [])
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
        writer.writerow([key, value])

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
                email=email, password=password, role='oferente', tipo_oferente=tipo_oferente, is_active=False
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
            

class ActivateAccountView(APIView):  # Define una vista para activar cuentas de usuario, heredando de APIView.
    def get(self, request, uidb64, token):  # Sobrescribe el método GET para manejar las solicitudes de activación de cuenta.
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))  # Decodifica el ID del usuario (uidb64) de la URL y lo convierte a una cadena.
            user = CustomUser.objects.get(pk=uid)  # Intenta obtener el usuario de la base de datos utilizando el ID decodificado.
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):  # Captura excepciones si hay un error en la decodificación o si el usuario no existe.
            user = None  # Si hay un error, establece user en None.

        if user is not None and default_token_generator.check_token(user, token):  # Verifica si el usuario existe y si el token es válido para ese usuario.
            user.is_active = True  # Cambia el estado del usuario a activo.
            user.save()  # Guarda los cambios en la base de datos.
            return render(request, 'accounts/activation_success.html', {'user': user})  # Renderiza la plantilla de éxito de activación, pasando el usuario.
        else:
            return render(request, 'accounts/activation_error.html')  # Si el usuario no es válido o el token es incorrecto, renderiza la plantilla de error de activación.
        
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


class ManejarSolicitudOferenteView(APIView):  # Define una vista para manejar solicitudes de oferentes, heredando de APIView.
    permission_classes = [IsAdminUser]  # Solo los administradores pueden acceder a esta vista.

    def post(self, request, solicitud_id):  # Maneja las solicitudes POST para aceptar o rechazar una solicitud de oferente.
        try:
            solicitud = SolicitudOferente.objects.get(id=solicitud_id)  # Busca la solicitud por su ID.
            accion = request.data.get('accion')  # Obtiene la acción ('aceptar' o 'rechazar') de los datos de la solicitud.

            if accion == 'aceptar':  # Verifica si la acción solicitada es 'aceptar'.
                # Cambia el rol del usuario a 'oferente' y acepta la solicitud.
                solicitud.user.role = 'oferente'  # Cambia el rol del usuario relacionado con la solicitud a 'oferente'.
                solicitud.user.save()  # Guarda los cambios en el modelo del usuario.
                solicitud.estado = 'aceptada'  # Actualiza el estado de la solicitud a 'aceptada'.
                solicitud.save()  # Guarda los cambios en el modelo de la solicitud.
                return Response({'success': True, 'mensaje': 'Solicitud aceptada'}, status=status.HTTP_200_OK)  # Devuelve una respuesta de éxito.

            elif accion == 'rechazar':  # Verifica si la acción solicitada es 'rechazar'.
                # Rechaza la solicitud.
                solicitud.estado = 'rechazada'  # Actualiza el estado de la solicitud a 'rechazada'.
                solicitud.save()  # Guarda los cambios en el modelo de la solicitud.
                return Response({'success': True, 'mensaje': 'Solicitud rechazada'}, status=status.HTTP_200_OK)  # Devuelve una respuesta de éxito.

            return Response({'error': 'Acción no válida'}, status=status.HTTP_400_BAD_REQUEST)  # Si la acción no es válida, devuelve un error con estado 400.

        except SolicitudOferente.DoesNotExist:  # Captura la excepción si la solicitud no se encuentra.
            return Response({'error': 'Solicitud no encontrada'}, status=status.HTTP_404_NOT_FOUND)  # Devuelve un error 404 si la solicitud no existe.

        
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
    
    def get(self, request):
        # Obtiene todos los servicios, independientemente de su estado.
        servicios = Servicio.objects.all()
        serializer = ServicioSerializer(servicios, many=True)  # Serializa los servicios.
        return Response(serializer.data)  # Devuelve todos los servicios.

    def post(self, request, servicio_id):
        # Acepta o rechaza un servicio según el ID y la acción proporcionada.
        try:
            servicio = Servicio.objects.get(id=servicio_id)  # Busca el servicio por ID.
            accion = request.data.get('accion')  # 'aceptar' o 'rechazar'.

            if accion == 'aceptar':
                # Cambia el estado del servicio a 'aceptado'.
                servicio.estado = 'aceptado'
                servicio.fecha_accion = timezone.now()  # Registra la fecha de la acción
                servicio.save()
                return Response({'success': True, 'mensaje': 'Servicio aceptado'}, status=status.HTTP_200_OK)
            elif accion == 'rechazar':
                # Cambia el estado del servicio a 'rechazado'.
                servicio.estado = 'rechazado'
                servicio.fecha_accion = timezone.now()  # Registra la fecha de la acción
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

class MisServiciosView(APIView):  # Define una vista para manejar los servicios del usuario, heredando de APIView.
    permission_classes = [IsAuthenticated]  # Requiere que el usuario esté autenticado para acceder a esta vista.

    def get(self, request):  # Maneja las solicitudes GET para obtener los servicios del usuario autenticado.
        servicios = Servicio.objects.filter(usuario=request.user)  # Filtra los servicios del usuario actual.
        serializer = ServicioSerializer(servicios, many=True)  # Serializa los servicios obtenidos.
        return Response(serializer.data)  # Devuelve la respuesta con los datos serializados.

    def put(self, request, servicio_id):  # Maneja las solicitudes PUT para actualizar un servicio específico.
        try:
            servicio = Servicio.objects.get(id=servicio_id, usuario=request.user)  # Intenta obtener el servicio que se va a actualizar.
            serializer = ServicioSerializer(servicio, data=request.data)  # Crea un serializador con los datos proporcionados.
            if serializer.is_valid():  # Verifica si los datos del serializador son válidos.
                serializer.save()  # Guarda los cambios en la base de datos.
                return Response(serializer.data)  # Devuelve la respuesta con los datos del servicio actualizado.
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Si hay errores en los datos, devuelve el error con estado 400.
        except Servicio.DoesNotExist:  # Captura la excepción si el servicio no se encuentra.
            return Response({'error': 'Servicio no encontrado'}, status=status.HTTP_404_NOT_FOUND)  # Devuelve un error 404 si el servicio no existe.

    def delete(self, request, servicio_id):  # Maneja las solicitudes DELETE para eliminar un servicio específico.
        try:
            servicio = Servicio.objects.get(id=servicio_id, usuario=request.user)  # Intenta obtener el servicio que se va a eliminar.
            servicio.delete()  # Elimina el servicio de la base de datos.
            return Response({'mensaje': 'Servicio eliminado correctamente'}, status=status.HTTP_200_OK)  # Devuelve un mensaje de éxito.
        except Servicio.DoesNotExist:  # Captura la excepción si el servicio no se encuentra.
            return Response({'error': 'Servicio no encontrado'}, status=status.HTTP_404_NOT_FOUND)  # Devuelve un error 404 si el servicio no existe.

    def post(self, request, servicio_id):  # Maneja las solicitudes POST para realizar acciones sobre un servicio específico.
        accion = request.data.get('accion')  # Obtiene la acción a realizar desde los datos de la solicitud.

        try:
            servicio = Servicio.objects.get(id=servicio_id, usuario=request.user)  # Intenta obtener el servicio que se va a modificar.

            if accion == 'reenviar':  # Verifica si la acción solicitada es 'reenviar'.
                if servicio.estado == 'aceptado':  # Verifica si el estado del servicio es 'aceptado'.
                    return Response({'error': 'No se puede reenviar un servicio que ya ha sido aceptado.'}, status=status.HTTP_400_BAD_REQUEST)
                    # Si el servicio ya ha sido aceptado, devuelve un error indicando que no se puede reenviar.

                # Cambia el estado a 'pendiente' y permite que el administrador lo revise nuevamente
                servicio.estado = 'pendiente'  # Actualiza el estado del servicio a 'pendiente'.
                servicio.save()  # Guarda los cambios en la base de datos.
                return Response({'mensaje': 'Servicio reenviado correctamente.'}, status=status.HTTP_200_OK)  # Devuelve un mensaje de éxito.

            return Response({'error': 'Acción no válida.'}, status=status.HTTP_400_BAD_REQUEST)  # Si la acción no es válida, devuelve un error 400.

        except Servicio.DoesNotExist:  # Captura la excepción si el servicio no se encuentra.
            return Response({'error': 'Servicio no encontrado'}, status=status.HTTP_404_NOT_FOUND)  # Devuelve un error 404 si el servicio no existe.

