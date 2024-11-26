from django.db import migrations

def cargar_lugares(apps, schema_editor):
    LugarTuristico = apps.get_model('maps_location', 'LugarTuristico')
    
    # Lista de lugares turísticos con nombre, latitud y longitud
    lugares = [
        # Lugares Turisticos
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
        # Seccion Que Hacer
        # Cultura - Petroglifos
        ('petroglifos', -36.14957206740431, -70.98500749990991),
        ('tren_chico', -36.79116316291482, -71.75163677336054),
        ('molino_tilos', -35.68189294808651, -71.40380915629572),
        ('molino_tilos', -35.68189294808651, -71.40380915629572),
        # Cultura - Iglesia de Panimavida
        ('iglesia_panimavida', -35.76150408335246, -71.4179938404889),
        ('las_tacitas', -35.460060231381775, -71.02592328186094),
        ('embotelladora', -35.79583151456348, -71.43082662040298),
        ('estacion_tren', -35.70240103039638, -71.40802349132328),
        # Cultura - Termas de Panimavida
        ('termas_panimavida', -35.76276858560625, -71.41791643536547),
        ('poza_mona', -35.841582479513754, -70.97258741956884),
        ('termas_quinamavida', -35.795699798591784, -71.42662462621279),
        # Senderismo - Volcan San Pedro y San Pablo
        ('volcan_san_pedro_pablo', -35.99519234518809, -70.84982130144117),
        ('mirador_vizcachas', -35.810394733149835, -71.3405237620378),
        # Parques - Parque Nacional Guaiquivilo
        ('parque_guaiquivilo', -35.97323921577147, -70.9787112047348),
        ('cavernas_bellotos', -35.85774309223748, -71.10464327559973),
        ('cavernas_bellotos', -35.85774309223748, -71.10464327559973),
        # Rutas - Termas
        ('termas_rutas', -35.762040660543, -71.42053891503397),
        ('embalse_machicura', -35.71744415772257, -71.39206257983065),
    ]
    
    # Agregar los lugares a la base de datos
    for nombre, latitud, longitud in lugares:
        LugarTuristico.objects.create(nombre=nombre, latitud=latitud, longitud=longitud)

class Migration(migrations.Migration):

    dependencies = [
        ('maps_location', '0003_update_places'),  # Reemplaza '0001_initial' por el nombre de tu migración inicial
    ]

    operations = [
        migrations.RunPython(cargar_lugares),
    ]