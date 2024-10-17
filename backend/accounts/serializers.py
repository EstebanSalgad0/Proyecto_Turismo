from rest_framework import serializers
from .models import Servicio

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ['id', 'nombre', 'correo', 'redes_sociales', 'descripcion', 'estado', 'created_at', 'fecha_accion']
        read_only_fields = ['estado', 'created_at', 'fecha_accion']  
