from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout


@csrf_exempt
def inicio_sesion(request):
    if request.method == 'POST':
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            email = body.get('email')
            password = body.get('password')

            print(f"Intentando autenticar con email: {email} y password: {password}")

            user = authenticate(request, username=email, password=password)

            if user is not None:
                login(request, user)
                return JsonResponse({'mensaje': 'Inicio de sesión exitoso'}, status=200)
            else:
                print("Autenticación fallida: Credenciales inválidas")
                return JsonResponse({'error': 'Credenciales inválidas'}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Solicitud no válida'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

# Nueva función para registrar usuarios
@csrf_exempt
def registrar_usuario(request):
    if request.method == 'POST':
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            email = body.get('email')
            password = body.get('password')

            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'El correo electrónico ya está registrado.'}, status=400)

            # Crear nuevo usuario
            user = User.objects.create_user(username=email, email=email, password=password)
            user.save()

            return JsonResponse({'mensaje': 'Usuario registrado exitosamente.'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Solicitud no válida.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Método no permitido.'}, status=405)


@login_required  # Asegura que el usuario esté autenticado
def obtener_rol_usuario(request):
    if request.method == 'GET':
        try:
            # Verifica si el usuario está autenticado
            user = request.user

            # Por defecto, asumimos que todos los usuarios que no son superusuarios son turistas
            if user.is_superuser:
                role = 'admin'
            else:
                role = 'turista'

            # Devolvemos el rol en formato JSON
            return JsonResponse({'role': role}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)
    
    
@csrf_exempt  # Desactiva temporalmente la verificación de CSRF para esta vista
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'mensaje': 'Sesión cerrada con éxito'})
    return JsonResponse({'error': 'Método no permitido'}, status=405)
