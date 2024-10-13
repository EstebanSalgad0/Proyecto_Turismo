from django.urls import path
from . import views  # Importar las vistas de tu aplicación

urlpatterns = [
    path('inicio-sesion/', views.inicio_sesion, name='inicio_sesion'),
]