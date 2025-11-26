# Visita Colbún – Portal de Turismo

Aplicación web fullstack para promocionar el turismo en Colbún. El frontend en React/Vite presenta destinos, panoramas y servicios locales; el backend en Django REST expone APIs para autenticación, catastro de oferentes y gestión de contenidos.

<img width="1920" height="1080" alt="Captura desde 2025-10-03 12-51-56" src="https://github.com/user-attachments/assets/09d9d31b-14d5-48ce-9d56-5b944fe70519" />


## Características principales
- Catálogo de destinos y panoramas con rutas temáticas y mapas interactivos (Leaflet + OpenStreetMap).
- Autenticación con reCAPTCHA y roles (`admin` / `oferente`) usando Django REST Framework + tokens.
- Registro y validación de oferentes por tipo (artesanos, bienes y servicios, cabañas) con formularios guiados y activación por correo.
- Catastro de servicios con carga de imágenes, aprobación administrativa y reenvío de solicitudes.
- Soporte multilenguaje con i18next y contenido estático optimizado con Vite.

<img width="1920" height="1080" alt="Captura desde 2025-10-03 14-21-36" src="https://github.com/user-attachments/assets/23918a47-f859-486e-917f-7ab1412965d3" />

## Arquitectura y stack
- **Frontend:** React 18, Vite, React Router, Axios, i18next, Leaflet/leaflet-routing-machine, react-google-recaptcha, Bootstrap/Bootstrap Icons/Boxicons.
- **Backend:** Django 5.1, Django REST Framework (token auth), django-cors-headers, python-dotenv, Pillow para `ImageField`, requests para reCAPTCHA.
- **Base de datos:** MySQL/MariaDB (configurada en `backend/backend/settings.py`).
- **Configuración de API:** la URL base del backend se define en `src/config.js` (`API_BASE_URL`).

## Requisitos previos
- Node.js 18+ y npm.
- Python 3.11+.
- MySQL/MariaDB operativo y credenciales de conexión.

## Configuración del backend (Django)
1. Crear y activar un entorno virtual:
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # En Windows: .venv\\Scripts\\activate
   ```
2. Instalar dependencias:
   ```bash
   pip install -r ../requirements.txt
   ```
3. Configurar variables de entorno en un archivo `.env` en `backend/`:
   ```
   SECRET_KEY=tu_clave_secreta
   DEBUG=True
   DB_NAME=nombre_base
   DB_USER=usuario
   DB_PASSWORD=contraseña
   DB_HOST=127.0.0.1
   DB_PORT=3306
   RECAPTCHA_SECRET_KEY=clave_recaptcha
   EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
   EMAIL_HOST=smtp.postmarkapp.com
   EMAIL_PORT=587
   EMAIL_USE_TLS=True
   EMAIL_HOST_USER=usuario_postmark
   EMAIL_HOST_PASSWORD=clave_postmark
   DEFAULT_FROM_EMAIL=no-reply@visitacolbun.cl
   ```
4. Aplicar migraciones y crear un superusuario:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```
5. Iniciar el servidor de desarrollo:
   ```bash
   python manage.py runserver
   ```

## Configuración del frontend (React)
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Actualizar `src/config.js` si el backend corre en otra URL/puerto.
3. Levantar el frontend:
   ```bash
   npm run dev
   ```

## Estructura relevante
- `src/`: páginas y componentes del portal público y de oferentes.
- `backend/`: proyecto Django con apps `accounts`, `services` y `maps_location`.
- `media/`: almacenamiento de imágenes de servicios.
- `public/`: assets estáticos del frontend.

## Notas de despliegue
- Configura `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS` y certificados TLS según el dominio.
- Ejecuta `python manage.py collectstatic` en entornos productivos y sirve `media/` con tu servidor web.


