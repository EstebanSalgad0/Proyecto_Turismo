from django.contrib.auth.models import BaseUserManager # Importa la clase BaseUserManager, que se utiliza para personalizar la creación de usuarios y superusuarios.

class CustomUserManager(BaseUserManager): # Define una clase personalizada CustomUserManager que hereda de BaseUserManager para gestionar usuarios personalizados.
    def create_user(self, email, password=None, **extra_fields): # Método para crear un usuario normal, requiere un email y opcionalmente una contraseña.
        if not email: # Verifica si el email fue proporcionado, de lo contrario lanza un error.
            raise ValueError('El correo electrónico debe ser proporcionado') # Lanza una excepción si no se proporciona el email.
        email = self.normalize_email(email) # Normaliza el email (por ejemplo, convierte el dominio a minúsculas).
        user = self.model(email=email, **extra_fields) # Crea una nueva instancia del usuario con el email y cualquier campo extra.
        user.set_password(password) # Establece la contraseña para el usuario utilizando el método adecuado (cifrado).
        user.save(using=self._db) # Guarda el usuario en la base de datos, usando la conexión actual.
        return user # Devuelve el usuario creado.

    def create_superuser(self, email, password=None, **extra_fields): # Método para crear un superusuario.
        extra_fields.setdefault('is_staff', True) # Asegura que el campo 'is_staff' esté configurado en True para superusuarios.
        extra_fields.setdefault('is_superuser', True) # Asegura que el campo 'is_superuser' esté configurado en True para superusuarios.

        return self.create_user(email, password, **extra_fields) # Llama al método create_user para crear el superusuario con los campos adicionales.
