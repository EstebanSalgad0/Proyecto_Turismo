#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os # Importa el módulo os para interactuar con el sistema operativo.
import sys # Importa el módulo sys para acceder a argumentos y funciones del sistema.


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings') # Establece la variable de entorno DJANGO_SETTINGS_MODULE con la configuración del proyecto Django.
    try: # Intenta importar la función execute_from_command_line de Django.
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        # Si no se puede importar Django, lanza un error con un mensaje informativo.
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv) # Ejecuta comandos de gestión de Django utilizando los argumentos de línea de comando.

# Si este archivo se ejecuta como un script, llama a la función main.
if __name__ == '__main__':
    main()
