import requests
from django.conf import settings

def verify_captcha(captcha_response):
    payload = {
        'secret': settings.RECAPTCHA_SECRET_KEY,  # Tu clave secreta de reCAPTCHA
        'response': captcha_response
    }
    response = requests.post('https://www.google.com/recaptcha/api/siteverify', data=payload)
    result = response.json()
    return result.get('success', False)