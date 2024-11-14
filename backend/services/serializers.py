from rest_framework import serializers  # Importa el módulo serializers de Django REST Framework para crear serializadores.
from .models import Servicio  # Importa el modelo Servicio desde los modelos locales.

class ServicioSerializer(serializers.ModelSerializer):
    tipo_oferente = serializers.CharField(source='usuario.tipo_oferente', read_only=True)  # Accede al campo tipo_oferente desde el usuario
    first_name = serializers.CharField(source='usuario.first_name', read_only=True)  # Accede al first_name del usuario
    last_name = serializers.CharField(source='usuario.last_name', read_only=True)  # Accede al last_name del usuario

    class Meta:
        model = Servicio
        fields = ['id', 'nombre', 'redes_sociales', 'descripcion', 'estado', 'imagen', 'imagen2', 'imagen3', 'imagen4', 'telefono', 'precio', 'created_at', 'fecha_accion', 'tipo_oferente', 'first_name', 'last_name']
        read_only_fields = ['estado', 'created_at', 'fecha_accion']