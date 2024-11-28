from django.apps import AppConfig # Importa la clase AppConfig desde django.apps, que se usa para configurar una app en Django.


class AccountsConfig(AppConfig): # Define la clase de configuración de la app 'accounts', que hereda de AppConfig.
    default_auto_field = 'django.db.models.BigAutoField' # Establece el tipo de campo predeterminado para claves primarias como BigAutoField (números enteros grandes).
    name = 'accounts' # Especifica el nombre de la app como 'accounts' para que Django lo identifique correctamente.
