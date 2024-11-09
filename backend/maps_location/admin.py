from django.contrib import admin
from .models import LugarTuristico

@admin.register(LugarTuristico)
class LugarTuristicoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'latitud', 'longitud')
