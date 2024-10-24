from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin  # Importa clases necesarias para la creación de un usuario personalizado: AbstractBaseUser para la base de usuarios, BaseUserManager para gestionar la creación de usuarios, y PermissionsMixin para manejar los permisos.
from django.db import models  # Importa el módulo models para definir modelos en Django.
from django.conf import settings  # Importa la configuración de Django, incluidas configuraciones de autenticación.
from django.utils import timezone  # Importa timezone para manejar fechas y horas con zona horaria.

class CustomUserManager(BaseUserManager):  # Define una clase CustomUserManager que hereda de BaseUserManager para manejar la creación de usuarios personalizados.
    
    def create_user(self, email, password=None, **extra_fields):  # Método para crear un usuario normal con email y contraseña.
        if not email:  # Verifica si se ha proporcionado un email.
            raise ValueError('El email debe ser proporcionado')  # Lanza una excepción si no se proporciona el email.
        email = self.normalize_email(email)  # Normaliza el email (por ejemplo, convierte a minúsculas).
        user = self.model(email=email, **extra_fields)  # Crea una instancia del modelo de usuario con el email y los campos adicionales.
        user.set_password(password)  # Establece la contraseña utilizando el método de cifrado adecuado.
        user.save(using=self._db)  # Guarda el usuario en la base de datos utilizando la conexión de base de datos actual.
        return user  # Devuelve el usuario creado.
    
    def create_superuser(self, email, password=None, **extra_fields):  # Método para crear un superusuario.
        extra_fields.setdefault('is_staff', True)  # Asegura que el campo 'is_staff' sea True para superusuarios.
        extra_fields.setdefault('is_superuser', True)  # Asegura que el campo 'is_superuser' sea True.
        extra_fields.setdefault('role', 'admin')  # Establece el rol del superusuario a 'admin' por defecto.
        
        return self.create_user(email, password, **extra_fields)  # Llama al método create_user para crear el superusuario con los campos adicionales.

class CustomUser(AbstractBaseUser, PermissionsMixin):  # Define un modelo CustomUser que hereda de AbstractBaseUser para la base del usuario y de PermissionsMixin para gestionar permisos.
    email = models.EmailField(unique=True)  # Campo de email, único para cada usuario.
    first_name = models.CharField(max_length=30, blank=True)  # Campo opcional para el primer nombre del usuario.
    last_name = models.CharField(max_length=30, blank=True)  # Campo opcional para el apellido del usuario.
    is_active = models.BooleanField(default=False)  # Indica si la cuenta está activa; por defecto False.
    is_staff = models.BooleanField(default=False)  # Indica si el usuario es parte del personal administrativo.

    ROLE_CHOICES = (  # Definición de los roles posibles para el usuario.
        ('turista', 'Turista'),  # Opción de rol 'turista'.
        ('admin', 'Administrador'),  # Opción de rol 'admin'.
        ('oferente', 'Oferente'),  # Opción de rol 'oferente'.
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='turista')  # Campo que almacena el rol del usuario, por defecto 'turista'.

    objects = CustomUserManager()  # Asigna el CustomUserManager como el administrador de usuarios.

    USERNAME_FIELD = 'email'  # Define el campo que se usará para identificar al usuario en el login (email en lugar de username).
    REQUIRED_FIELDS = []  # No requiere campos adicionales para el registro.

    def __str__(self):  # Define la representación en string del usuario.
        return self.email  # Muestra el email como la representación del usuario.

# Modelo para las solicitudes de los usuarios para convertirse en oferentes
class SolicitudOferente(models.Model):  # Define un modelo para gestionar las solicitudes de los usuarios que desean convertirse en oferentes.
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Relaciona cada solicitud con un usuario.
    servicio = models.CharField(max_length=255)  # Almacena el nombre del servicio propuesto por el oferente.
    estado = models.CharField(max_length=50, default='pendiente')  # Almacena el estado de la solicitud, por defecto 'pendiente'.
    created_at = models.DateTimeField(auto_now_add=True)  # Almacena la fecha de creación de la solicitud, se establece automáticamente al crear la instancia.

    def __str__(self):  # Define la representación en string de la solicitud.
        return f"{self.user.email} - {self.servicio} - {self.estado}"  # Muestra el email del usuario, el servicio y el estado de la solicitud.

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
    created_at = models.DateTimeField(auto_now_add=True)  # Almacena la fecha de creación del servicio, se establece automáticamente al crear el servicio.

    def __str__(self):  # Define la representación en string del servicio.
        return self.nombre  # Muestra el nombre del servicio.
