from rest_framework import serializers  # Importa el módulo serializers de Django REST Framework para crear serializadores.
from .models import CustomUser  # Importa el modelo CustomUser desde los modelos locales.


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'is_active', 'role', 'tipo_oferente', 'is_first_login']  # Agregar tipo_oferente aquí

