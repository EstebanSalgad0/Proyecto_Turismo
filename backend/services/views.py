from django.shortcuts import render
from rest_framework.response import Response  # Importa la clase Response para devolver respuestas HTTP personalizadas.
from rest_framework import status  # Importa los códigos de estado HTTP de Django REST Framework.
from rest_framework.views import APIView  # Importa la clase base APIView para crear vistas basadas en API.
from rest_framework.permissions import IsAuthenticated  # Importa permisos: acceso para cualquier usuario, solo admins o usuarios autenticados.
from .models import Servicio  # Importa modelos de la app.
from .serializers import ServicioSerializer  # Importa serializadores para los modelos.
from django.utils import timezone  # Importa timezone para manejar fechas y horas con soporte de zona horaria.
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.
class CrearServicioView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # Permitir la carga de archivos

    def post(self, request):
        tipo_oferente = request.user.tipo_oferente
        serializer = ServicioSerializer(data=request.data)
        if serializer.is_valid():
            servicio = serializer.save(usuario=request.user, tipo_oferente=tipo_oferente, estado='pendiente')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListarServiciosView(APIView):
    def get(self, request):
        # Solo mostrar servicios aceptados
        servicios = Servicio.objects.filter(estado='aceptado')
        serializer = ServicioSerializer(servicios, many=True)
        return Response(serializer.data)


class ManejarServiciosView(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden manejar servicios.

    def get(self, request):
        # Obtiene todos los servicios, independientemente de su estado.
        servicios = Servicio.objects.all()
        serializer = ServicioSerializer(servicios, many=True)  # Serializa los servicios.
        return Response(serializer.data)  # Devuelve todos los servicios.

    def post(self, request, servicio_id):
        """
        Maneja acciones sobre servicios pendientes, como aceptar o rechazar.
        """
        try:
            # Buscar el servicio pendiente con el ID proporcionado
            servicio_modificado = Servicio.objects.get(id=servicio_id, estado='pendiente')
            accion = request.data.get('accion')

            if accion == 'aceptar':
                # Buscar un servicio aceptado del mismo usuario, si existe
                servicio_original = Servicio.objects.filter(
                    usuario=servicio_modificado.usuario, estado='aceptado'
                ).first()

                if servicio_original:
                    # Actualizar campos del servicio original con los nuevos datos
                    servicio_original.nombre = servicio_modificado.nombre
                    servicio_original.descripcion = servicio_modificado.descripcion
                    servicio_original.fecha_accion = timezone.now()  # Registrar la fecha de la acción
                    servicio_original.save()
                else:
                    # Si no existe un servicio aceptado previo, marcar este como aceptado
                    servicio_modificado.estado = 'aceptado'
                    servicio_modificado.fecha_accion = timezone.now()
                    servicio_modificado.save()

                return Response({'mensaje': 'Servicio aceptado correctamente.'}, status=status.HTTP_200_OK)

            elif accion == 'rechazar':
                # Eliminar el servicio pendiente
                servicio_modificado.delete()
                return Response({'mensaje': 'Servicio rechazado correctamente.'}, status=status.HTTP_200_OK)

            else:
                return Response({'error': 'Acción no válida.'}, status=status.HTTP_400_BAD_REQUEST)

        except Servicio.DoesNotExist:
            return Response({'error': 'Servicio no encontrado.'}, status=status.HTTP_404_NOT_FOUND)


class ListarServiciosAceptadosView(APIView):
    def get(self, request):
        # Obtiene todos los servicios aceptados.
        servicios = Servicio.objects.filter(estado='aceptado')
        serializer = ServicioSerializer(servicios, many=True)  # Serializa los servicios.
        return Response(serializer.data)  # Devuelve los servicios aceptados.

class MisServiciosView(APIView):  
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Mostrar servicios aceptados y pendientes del usuario
        servicios = Servicio.objects.filter(usuario=request.user)
        serializer = ServicioSerializer(servicios, many=True)
        return Response(serializer.data)

    def put(self, request, servicio_id):
        try:
            # Buscar el servicio del usuario, independientemente del estado
            servicio = Servicio.objects.get(id=servicio_id, usuario=request.user)

            # Actualizar los datos del servicio existente
            serializer = ServicioSerializer(servicio, data=request.data, partial=True)
            if serializer.is_valid():
                servicio.estado = 'pendiente'  # Cambiar el estado a "pendiente" para revisión
                serializer.save()
                return Response({
                    'mensaje': 'Los cambios se han enviado para revisión.',
                    'servicio': serializer.data
                }, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Servicio.DoesNotExist:
            return Response({'error': 'Servicio no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, servicio_id):
        try:
            servicio = Servicio.objects.get(id=servicio_id, usuario=request.user)
            servicio.delete()
            return Response({'mensaje': 'Servicio eliminado correctamente'}, status=status.HTTP_200_OK)
        except Servicio.DoesNotExist:
            return Response({'error': 'Servicio no encontrado'}, status=status.HTTP_404_NOT_FOUND)

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
