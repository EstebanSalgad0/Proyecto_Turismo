"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os  # Importa el módulo os para interactuar con el sistema operativo.

from django.core.asgi import get_asgi_application  # Importa la función para obtener la aplicación ASGI de Django.

# Establece la variable de entorno 'DJANGO_SETTINGS_MODULE' a 'backend.settings', 
# que indica a Django qué archivo de configuración utilizar.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Llama a la función 'get_asgi_application()' para obtener la aplicación ASGI 
# de Django y la asigna a la variable 'application', que es la que se usará para 
# manejar las solicitudes ASGI.
application = get_asgi_application()
