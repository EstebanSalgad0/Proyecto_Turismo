from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, User
from django.db import models
from django.conf import settings
from django.utils import timezone


# Manager personalizado para gestionar la creación de usuarios y superusuarios
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        # Método para crear un usuario regular.
        if not email:
            raise ValueError('El email debe ser proporcionado')
        email = self.normalize_email(email)  # Normaliza el email (dominio en minúsculas).
        user = self.model(email=email, **extra_fields)  # Crea una instancia del usuario con los campos extra.
        user.set_password(password)  # Establece la contraseña encriptada.
        user.save(using=self._db)  # Guarda el usuario en la base de datos.
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        # Método para crear un superusuario (admin).
        extra_fields.setdefault('is_staff', True)  # Asegura que el superusuario tiene permisos de staff.
        extra_fields.setdefault('is_superuser', True)  # Asegura que el superusuario tiene permisos de superusuario.
        extra_fields.setdefault('role', 'admin')  # Define el rol predeterminado como 'admin'.
        return self.create_user(email, password, **extra_fields)  # Crea el superusuario utilizando create_user.

# Modelo personalizado de usuario
class CustomUser(AbstractBaseUser, PermissionsMixin):
    # Extiende AbstractBaseUser para manejar autenticación personalizada y PermissionsMixin para gestionar permisos.
    email = models.EmailField(unique=True)  # Email único que actúa como nombre de usuario.
    first_name = models.CharField(max_length=30, blank=True)  # Campo opcional para el primer nombre.
    last_name = models.CharField(max_length=30, blank=True)  # Campo opcional para el apellido.
    is_active = models.BooleanField(default=True)  # Indica si el usuario está activo.
    is_staff = models.BooleanField(default=False)  # Indica si el usuario tiene permisos de staff (acceso al admin).

    # Campo de rol con opciones y valor predeterminado 'turista'.
    ROLE_CHOICES = (
        ('turista', 'Turista'),
        ('admin', 'Administrador'),
        ('oferente', 'Oferente'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='turista')

    objects = CustomUserManager()  # Asigna el manager personalizado.

    USERNAME_FIELD = 'email'  # Establece el campo 'email' como el campo de identificación del usuario.
    REQUIRED_FIELDS = []  # No se requieren otros campos además del email.

    def __str__(self):
        return self.email  # Retorna el email como la representación de texto del usuario.

# Modelo para las solicitudes de los usuarios para convertirse en oferentes
class SolicitudOferente(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    servicio = models.CharField(max_length=255)
    estado = models.CharField(max_length=50, default='pendiente')
    created_at = models.DateTimeField(auto_now_add=True)  # Campo de fecha de creación

    def __str__(self):
        return f"{self.user.email} - {self.servicio} - {self.estado}"

# Modelo para los servicios proporcionados por los oferentes

class Servicio(models.Model):
    nombre = models.CharField(max_length=255)
    correo = models.EmailField()
    redes_sociales = models.CharField(max_length=255)
    descripcion = models.TextField()
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    estado = models.CharField(max_length=20, default='pendiente') 
    administrador = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='admin_servicios', null=True, blank=True, on_delete=models.SET_NULL)

    fecha_accion = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre