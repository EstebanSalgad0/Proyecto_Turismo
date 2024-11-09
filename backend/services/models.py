from django.db import models
from django.conf import settings  # Importa la configuración de Django, incluidas configuraciones de autenticación.

# Create your models here.
# Modelo para los servicios proporcionados por los oferentes
class Servicio(models.Model):  # Define un modelo para almacenar los servicios que proporcionan los oferentes.
    nombre = models.CharField(max_length=255)  # Nombre del servicio proporcionado.
    correo = models.EmailField()  # Correo electrónico del oferente.
    redes_sociales = models.CharField(max_length=255)  # Almacena las redes sociales relacionadas con el servicio.
    descripcion = models.TextField()  # Descripción del servicio proporcionado.
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Relaciona el servicio con un usuario oferente.
    estado = models.CharField(max_length=20, default='pendiente')  # Almacena el estado del servicio, por defecto 'pendiente'.
    administrador = models.ForeignKey(  # Relaciona el servicio con un administrador que puede gestionar su aprobación o estado.
        settings.AUTH_USER_MODEL, related_name='admin_servicios', null=True, blank=True, on_delete=models.SET_NULL
    )
    fecha_accion = models.DateTimeField(null=True, blank=True)  # Campo opcional para registrar la fecha de una acción administrativa (aprobación, rechazo).
    imagen = models.ImageField(upload_to='imagenes_servicios/', null=True, blank=True)  # Campo para almacenar la imagen del servicio.
    telefono = models.CharField(max_length=15, null=True, blank=True)  # Campo para el número de teléfono del oferente.
    precio = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Campo para el precio del servicio.
    created_at = models.DateTimeField(auto_now_add=True)  # Almacena la fecha de creación del servicio, se establece automáticamente al crear el servicio.

    def __str__(self):  # Define la representación en string del servicio.
        return self.nombre  # Muestra el nombre del servicio.