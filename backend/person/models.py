from django.db import models
import datetime


class Person(models.Model):
    foto = models.ImageField(upload_to='person_photos/', blank=True, null=True)
    primeiro_nome = models.CharField(max_length=100)
    ultimo_nome = models.CharField(max_length=100)
    alcool = models.FloatField(default=0.0)
    data_adicionado = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.primeiro_nome} {self.ultimo_nome}"
