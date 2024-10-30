import requests
from django.conf import settings

def verify_captcha(captcha_response):
    payload = {
        'secret': settings.RECAPTCHA_SECRET_KEY,
        'response': captcha_response
    }
    response = requests.post('https://www.google.com/recaptcha/api/siteverify', data=payload)
    result = response.json()
    
    # Verificar que la respuesta sea exitosa y el puntaje sea superior a 0.5
    return result.get('success', False) and result.get('score', 0) > 0.5