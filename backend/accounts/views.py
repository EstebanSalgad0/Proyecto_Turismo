from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from .models import SolicitudOferente, Servicio
from .serializers import ServicioSerializer


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

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
        
        if not email or not password:
            return Response({'error': 'Faltan datos'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Solo asigna el rol "turista" a los nuevos registros
            user = CustomUser.objects.create_user(email=email, password=password, role='turista')
            user.save()
            return Response({'message': 'Usuario registrado exitosamente.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class SolicitudOferenteView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        servicio = request.data.get('servicio')

        try:
            user = CustomUser.objects.get(email=email)
            if user.check_password(password):
                # Almacenar la solicitud en la base de datos
                solicitud = SolicitudOferente.objects.create(user=user, servicio=servicio)
                solicitud.save()
                return Response({'success': True, 'mensaje': 'Solicitud enviada correctamente'}, status=status.HTTP_200_OK)
            return Response({'error': 'Contraseña incorrecta'}, status=status.HTTP_400_BAD_REQUEST)
        except CustomUser.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)


class ManejarSolicitudOferenteView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, solicitud_id):
        try:
            solicitud = SolicitudOferente.objects.get(id=solicitud_id)
            accion = request.data.get('accion')  # Puede ser 'aceptar' o 'rechazar'

            if accion == 'aceptar':
                # Cambia el rol del usuario a 'oferente'
                solicitud.user.role = 'oferente'
                solicitud.user.save()
                solicitud.estado = 'aceptada'
                solicitud.save()
                return Response({'success': True, 'mensaje': 'Solicitud aceptada'}, status=status.HTTP_200_OK)

            elif accion == 'rechazar':
                solicitud.estado = 'rechazada'
                solicitud.save()
                return Response({'success': True, 'mensaje': 'Solicitud rechazada'}, status=status.HTTP_200_OK)

            return Response({'error': 'Acción no válida'}, status=status.HTTP_400_BAD_REQUEST)

        except SolicitudOferente.DoesNotExist:
            return Response({'error': 'Solicitud no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        

class ListarSolicitudesView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        solicitudes = SolicitudOferente.objects.all()
        data = [{'id': solicitud.id, 'user': solicitud.user.email, 'servicio': solicitud.servicio, 'estado': solicitud.estado} for solicitud in solicitudes]
        return Response(data, status=status.HTTP_200_OK)
    

class CrearServicioView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ServicioSerializer(data=request.data)
        if serializer.is_valid():
            # Asigna el usuario logueado y el estado pendiente al servicio
            servicio = serializer.save(usuario=request.user, estado='pendiente')  # Cambia user a usuario
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListarServiciosView(APIView):
    def get(self, request):
        servicios = Servicio.objects.all()
        serializer = ServicioSerializer(servicios, many=True)
        return Response(serializer.data)

class ManejarServiciosView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        servicios = Servicio.objects.filter(estado='pendiente')
        serializer = ServicioSerializer(servicios, many=True)
        return Response(serializer.data)


class ListarServiciosAceptadosView(APIView):
    def get(self, request):
        servicios = Servicio.objects.filter(estado='aceptado')
        serializer = ServicioSerializer(servicios, many=True)
        return Response(serializer.data)
