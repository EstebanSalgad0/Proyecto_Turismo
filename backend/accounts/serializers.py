from rest_framework import serializers  # Importa el módulo serializers de Django REST Framework para crear serializadores.
from .models import CustomUser  # Importa el modelo CustomUser desde los modelos locales.
from .models import Servicio  # Importa el modelo Servicio desde los modelos locales.

class UserSerializer(serializers.ModelSerializer):  # Define un serializador para el modelo CustomUser, heredando de ModelSerializer.
    class Meta:  # Meta clase para especificar detalles del serializador.
        model = CustomUser  # Especifica que el modelo a serializar es CustomUser.
        fields = ['id', 'email', 'first_name', 'last_name', 'is_active', 'role']  # Define los campos que se incluirán en la serialización: ID, email, nombre, apellido, estado activo y rol.

class ServicioSerializer(serializers.ModelSerializer):  # Define un serializador para el modelo Servicio, heredando de ModelSerializer.
    class Meta:  # Meta clase para especificar detalles del serializador.
        model = Servicio  # Especifica que el modelo a serializar es Servicio.
        fields = ['id', 'nombre', 'correo', 'redes_sociales', 'descripcion', 'estado', 'created_at', 'fecha_accion']  # Define los campos que se incluirán en la serialización: ID, nombre, correo, redes sociales, descripción, estado, fecha de creación y fecha de acción.
        read_only_fields = ['estado', 'created_at', 'fecha_accion']  # Especifica que los campos 'estado', 'created_at' y 'fecha_accion' son solo de lectura, es decir, no pueden ser modificados al crear o actualizar el servicio.