from rest_framework import serializers  # Importa el módulo serializers de Django REST Framework para crear serializadores.
from .models import Servicio  # Importa el modelo Servicio desde los modelos locales.

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ['id', 'nombre', 'correo', 'redes_sociales', 'descripcion', 'estado', 'imagen', 'telefono', 'precio', 'created_at', 'fecha_accion']
        read_only_fields = ['estado', 'created_at', 'fecha_accion']