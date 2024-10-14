from rest_framework.authtoken.views import ObtainAuthToken  # Importa la vista base para autenticación por token.
from rest_framework.authtoken.models import Token  # Modelo de token para gestionar tokens de autenticación.
from rest_framework.response import Response  # Proporciona respuestas HTTP a las peticiones.
from django.contrib.auth import authenticate  # Función para autenticar un usuario con email y contraseña.
from rest_framework import status  # Importa códigos de estado HTTP (200, 400, etc).
from rest_framework.views import APIView  # Clase base para vistas basadas en API en Django REST Framework.
from django.contrib.auth import get_user_model  # Obtiene el modelo de usuario personalizado.
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated  # Permisos de acceso a vistas.
from .models import SolicitudOferente, Servicio  # Importa los modelos de la app (SolicitudOferente y Servicio).
from .serializers import ServicioSerializer  # Importa el serializador para el modelo Servicio.


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')  # Obtiene el email del cuerpo de la petición.
        password = request.data.get('password')  # Obtiene la contraseña del cuerpo de la petición.

        # Autenticación del usuario con el email y la contraseña proporcionados.
        user = authenticate(request, email=email, password=password)

        if user is not None:  # Si el usuario existe y la autenticación es correcta.
            token, created = Token.objects.get_or_create(user=user)  # Obtiene o crea un token para el usuario.
            return Response({  # Responde con el token, ID de usuario, email y rol.
                'token': token.key,
                'user_id': user.pk,
                'email': user.email,
                'role': user.role,
            })
        else:
            return Response({'error': 'Credenciales incorrectas'}, status=400)  # Devuelve un error si la autenticación falla.


CustomUser = get_user_model()  # Obtiene el modelo de usuario personalizado.

class RegisterView(APIView):
    def post(self, request):
        email = request.data.get('email')  # Obtiene el email del cuerpo de la petición.
        password = request.data.get('password')  # Obtiene la contraseña del cuerpo de la petición.
        
        if not email or not password:  # Si faltan datos, devuelve un error.
            return Response({'error': 'Faltan datos'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Crea un nuevo usuario con el rol predeterminado de 'turista'.
            user = CustomUser.objects.create_user(email=email, password=password, role='turista')
            user.save()  # Guarda el usuario en la base de datos.
            return Response({'message': 'Usuario registrado exitosamente.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)  # Devuelve un error si la creación falla.


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
