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
