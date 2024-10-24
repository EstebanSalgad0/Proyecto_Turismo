import requests  # Importa el módulo requests, que permite hacer solicitudes HTTP en Python.
from django.conf import settings  # Importa el módulo settings de Django, que permite acceder a las configuraciones del proyecto.

def verify_captcha(captcha_response):  # Define una función que verifica la respuesta de reCAPTCHA enviada desde el frontend.
    payload = {  
        'secret': settings.RECAPTCHA_SECRET_KEY,  # El campo 'secret' se llena con la clave secreta de reCAPTCHA, obtenida desde las configuraciones del proyecto.
        'response': captcha_response  # El campo 'response' contiene la respuesta del captcha, enviada por el usuario.
    }
    response = requests.post('https://www.google.com/recaptcha/api/siteverify', data=payload)  # Realiza una solicitud POST a la API de verificación de reCAPTCHA de Google, enviando el payload.
    result = response.json()  # Convierte la respuesta de la solicitud en formato JSON.
    return result.get('success', False)  # Devuelve True si la verificación del captcha fue exitosa, o False si no lo fue.