from rest_framework import serializers
from .models import CustomUser
from .models import Servicio

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'is_active', 'role']

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ['id', 'nombre', 'correo', 'redes_sociales', 'descripcion', 'estado', 'created_at', 'fecha_accion']
        read_only_fields = ['estado', 'created_at', 'fecha_accion']  