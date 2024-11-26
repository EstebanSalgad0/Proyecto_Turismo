# serializers.py
from rest_framework import serializers
from .models import LugarTuristico

class LugarTuristicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LugarTuristico
        fields = ['id', 'nombre', 'latitud', 'longitud']