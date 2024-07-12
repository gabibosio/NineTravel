from django.db import models
from datetime import date

class Reserva(models.Model):
    fecha_ingreso = models.DateField(default=date.today)
    fecha_salida = models.DateField()
    cant_personas = models.IntegerField()

    def __str__(self) -> str:
        return self.cant_personas

    class Meta:
        db_table = 'Reserva'
