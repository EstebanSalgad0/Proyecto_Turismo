from django.db import migrations

def cargar_lugares(apps, schema_editor):
    LugarTuristico = apps.get_model('maps_location', 'LugarTuristico')
    
    # Lista de lugares turísticos con nombre, latitud y longitud
    lugares = [
        ('el_melado', -35.847518970858225, -71.05518511993768),
        ('balnearios_machicura', -35.71867651726831, -71.40563887810312),
        ('paso_pehuenche', -35.962202189349355, -70.40104674277745),
        ('colbun', -35.69961366892118, -71.41436286512136),
        ('colbun_alto', -35.74895842617176, -71.21248344923778),
        ('la_guardia', -35.688273967003234, -71.2883041112824),
        ('los_boldos', -35.7019922977697, -71.38889438836192),
        ('panimavida', -35.75893421092765, -71.41786762945192),
        ('rari', -35.76632627844839, -71.4144737902422),
        ('quinamavida', -35.782776693178334, -71.43330005954046),
        ('rabones', -35.83678601243537, -71.33329591609926),
        ('los_bellotos', -35.851712039472154, -71.10443691380418),
    ]
    
    # Agregar los lugares a la base de datos
    for nombre, latitud, longitud in lugares:
        LugarTuristico.objects.create(nombre=nombre, latitud=latitud, longitud=longitud)

class Migration(migrations.Migration):

    dependencies = [
        ('maps_location', '0002_auto_add_places'),  # Reemplaza '0001_initial' por el nombre de tu migración inicial
    ]

    operations = [
        migrations.RunPython(cargar_lugares),
    ]