from django.db import models

# models.py
from django.db import models

class LugarTuristico(models.Model):
    nombre = models.CharField(max_length=100)
    latitud = models.DecimalField(max_digits=20, decimal_places=15)
    longitud = models.DecimalField(max_digits=20, decimal_places=15)

    def __str__(self):
        return self.nombre
