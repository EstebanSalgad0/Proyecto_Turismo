from rest_framework import serializers
from .models import Servicio

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ['nombre', 'correo', 'redes_sociales', 'descripcion']
        # No incluyas 'valoracion' si este se asignará posteriormente

        read_only_fields = ['estado']  # Esto asegura que el estado no se pueda establecer desde el cliente
