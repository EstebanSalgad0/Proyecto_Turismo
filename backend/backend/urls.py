"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from accounts.views import (
    CustomAuthToken,
    RegisterView,
    SolicitudOferenteView,
    ManejarSolicitudOferenteView,
    ListarSolicitudesView,
    CrearServicioView,
    ListarServiciosView,
    ManejarServiciosView,  
    ListarServiciosAceptadosView,
)

urlpatterns = [
    # Ruta para acceder al panel de administración de Django.
    path('admin/', admin.site.urls),
    
    # Ruta para el login, utilizando la vista CustomAuthToken (autenticación por token).
    path('api/login/', CustomAuthToken.as_view(), name='login'),

    # Ruta para el registro de nuevos usuarios, utilizando la vista RegisterView.
    path('api/register/', RegisterView.as_view(), name='register'),

    # Ruta para que un usuario solicite ser oferente, utilizando la vista SolicitudOferenteView.
    path('api/solicitar_oferente/', SolicitudOferenteView.as_view(), name='solicitar_oferente'),

    # Ruta para que un administrador maneje una solicitud de oferente (aceptar o rechazar) con un ID específico.
    path('api/manejar_solicitud/<int:solicitud_id>/', ManejarSolicitudOferenteView.as_view(), name='manejar_solicitud'),

    # Ruta para que el administrador vea todas las solicitudes enviadas, utilizando la vista ListarSolicitudesView.
    path('api/solicitudes/', ListarSolicitudesView.as_view(), name='listar_solicitudes'),

    # Ruta para que un usuario cree un nuevo servicio, utilizando la vista CrearServicioView.
    path('api/crear_servicio/', CrearServicioView.as_view(), name='crear_servicio'),

    # Ruta para listar todos los servicios disponibles (GET) utilizando la vista ListarServiciosView.
    path('api/servicios/', ListarServiciosView.as_view(), name='listar_servicios'),

    # Ruta para que un usuario autenticado liste los servicios pendientes, utilizando la vista ManejarServiciosView (GET).
    path('api/manejar_servicios/', ManejarServiciosView.as_view(), name='listar_servicios_pendientes'),

    # Ruta para que un usuario maneje un servicio específico (aceptar o rechazar) según el ID del servicio.
    path('api/manejar_servicios/<int:servicio_id>/', ManejarServiciosView.as_view(), name='manejar_servicios'),

    # Ruta para listar los servicios que han sido aceptados, utilizando la vista ListarServiciosAceptadosView.
    path('api/listar_servicios_aceptados/', ListarServiciosAceptadosView.as_view(), name='listar_servicios_aceptados'),
]
