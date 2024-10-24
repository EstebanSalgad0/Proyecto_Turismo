"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os # Importa el módulo os para interactuar con el sistema operativo.

from django.core.wsgi import get_wsgi_application # Importa la función get_wsgi_application de Django, que se usa para crear la aplicación WSGI.

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings') # Establece la variable de entorno DJANGO_SETTINGS_MODULE con la configuración del proyecto Django.

application = get_wsgi_application() # Crea la aplicación WSGI que se utilizará para servir el proyecto Django.
