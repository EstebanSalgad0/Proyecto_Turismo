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
from django.contrib import admin  # Importa el módulo admin de Django, que permite gestionar el panel de administración de la aplicación.
from django.urls import path  # Importa la función path para definir rutas URL en la aplicación.
# Importa varias vistas desde el módulo accounts.views, que manejan diferentes funcionalidades de la aplicación.
from accounts.views import CustomAuthToken  # Vista para la autenticación personalizada mediante token.
from accounts.views import RegisterView  # Vista para el registro de nuevos usuarios.
from accounts.views import SolicitudOferenteView  # Vista para gestionar las solicitudes de los oferentes.
from accounts.views import ManejarSolicitudOferenteView  # Vista para manejar la aceptación o rechazo de solicitudes de oferentes.
from accounts.views import ListarSolicitudesView  # Vista para listar las solicitudes de oferentes.
from accounts.views import CrearServicioView  # Vista para crear nuevos servicios por parte de los oferentes.
from accounts.views import ListarServiciosView  # Vista para listar todos los servicios disponibles.
from accounts.views import ManejarServiciosView  # Vista para manejar acciones sobre los servicios (editar, eliminar, etc.).
from accounts.views import ListarServiciosAceptadosView  # Vista para listar servicios que han sido aceptados.
from accounts.views import MisServiciosView  # Vista para que los usuarios vean sus propios servicios.
from accounts.views import ActivateAccountView  # Vista para activar cuentas de usuario mediante un enlace de verificación.
from accounts.views import RegisterView, ActivateView
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),  # Ruta para acceder al panel de administración de Django.
    path('api/login/', CustomAuthToken.as_view(), name='login'),  # Ruta para el inicio de sesión utilizando el token de autenticación personalizada.
    path('api/register/', RegisterView.as_view(), name='register'),  # Ruta para el registro de nuevos usuarios.
    path('activate/<uidb64>/<token>/', ActivateView.as_view(), name='activate'),
    path('activation_success/', TemplateView.as_view(template_name='accounts/activation_success.html'), name='activation_success'),
    path('activate/<uidb64>/<token>/', ActivateAccountView.as_view(), name='activate'),  # Ruta para activar la cuenta de un usuario utilizando un token y un ID codificado.
    path('api/solicitar_oferente/', SolicitudOferenteView.as_view(), name='solicitar_oferente'),  # Ruta para que los usuarios soliciten convertirse en oferentes.
    path('api/manejar_solicitud/<int:solicitud_id>/', ManejarSolicitudOferenteView.as_view(), name='manejar_solicitud'),  # Ruta para manejar la aceptación o rechazo de una solicitud de oferente.
    path('api/solicitudes/', ListarSolicitudesView.as_view(), name='listar_solicitudes'),  # Ruta para listar todas las solicitudes de oferentes.
    path('api/crear_servicio/', CrearServicioView.as_view(), name='crear_servicio'),  # Ruta para crear un nuevo servicio.
    path('api/servicios/', ListarServiciosView.as_view(), name='listar_servicios'),  # Ruta para listar todos los servicios disponibles.
    path('api/manejar_servicios/', ManejarServiciosView.as_view(), name='listar_servicios_pendientes'),  # Ruta para manejar servicios pendientes.
    path('api/manejar_servicios/<int:servicio_id>/', ManejarServiciosView.as_view(), name='manejar_servicios'),  # Ruta para gestionar un servicio específico.
    path('api/listar_servicios_aceptados/', ListarServiciosAceptadosView.as_view(), name='listar_servicios_aceptados'),  # Ruta para listar los servicios que han sido aceptados.
    path('api/mis_servicios/', MisServiciosView.as_view(), name='mis_servicios'),  # Ruta para que los usuarios vean sus propios servicios.
    path('api/mis_servicios/<int:servicio_id>/', MisServiciosView.as_view(), name='gestionar_servicio'),  # Ruta para gestionar un servicio específico del usuario.
    path('api/reenviar_servicio/<int:servicio_id>/', MisServiciosView.as_view(), name='reenviar_servicio'),  # Ruta para reenviar un servicio específico.
]

