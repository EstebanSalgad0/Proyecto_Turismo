from django.shortcuts import render

# views.py
from rest_framework import viewsets
from .models import LugarTuristico
from .serializers import LugarTuristicoSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

class LugarTuristicoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LugarTuristico.objects.all()
    serializer_class = LugarTuristicoSerializer

    @action(detail=False, methods=['get'])
    def buscar(self, request):
        nombre = request.query_params.get('nombre', None)
        id = request.query_params.get('id', None)
        if id:
            lugar = LugarTuristico.objects.filter(id=id).first()
        elif nombre:
            lugar = LugarTuristico.objects.filter(nombre__icontains=nombre).first()
        else:
            return Response({"error": "No se proporcionó un id o nombre válido"}, status=400)

        if lugar:
            serializer = LugarTuristicoSerializer(lugar)
            return Response(serializer.data)
        return Response({"error": "Lugar no encontrado"}, status=404)
