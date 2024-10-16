from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.conf import settings

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El email debe ser proporcionado')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')  # Establecer el rol a "admin"

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=False)  # Cambiado a False
    is_staff = models.BooleanField(default=False)
    
    ROLE_CHOICES = (
        ('turista', 'Turista'),
        ('admin', 'Administrador'),
        ('oferente', 'Oferente'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='turista')

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    
# Modelo para las solicitudes de los usuarios para convertirse en oferentes
class SolicitudOferente(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Relación con el usuario.
    servicio = models.CharField(max_length=255)  # Nombre del servicio solicitado por el usuario.
    estado = models.CharField(max_length=50, default='pendiente')  # Estado de la solicitud ('pendiente' por defecto).

    def __str__(self):
        return f"{self.user.email} - {self.servicio} - {self.estado}"  # Representación en texto de la solicitud.

# Modelo para los servicios proporcionados por los oferentes
class Servicio(models.Model):
    nombre = models.CharField(max_length=255)  # Nombre del servicio.
    correo = models.EmailField()  # Correo electrónico relacionado con el servicio.
    redes_sociales = models.CharField(max_length=255)  # Información sobre las redes sociales del servicio.
    descripcion = models.TextField()  # Descripción del servicio.
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Usuario que creó el servicio.
    estado = models.CharField(max_length=20, default='pendiente')  # Estado del servicio ('pendiente' por defecto).

    def __str__(self):
        return self.nombre  # Retorna el nombre del servicio como su representación textual.
