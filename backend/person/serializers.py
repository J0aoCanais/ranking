from rest_framework import serializers
from .models import *


class PersonSerializer(serializers.ModelSerializer):
    foto = serializers.SerializerMethodField()

    class Meta:
        model = Person
        fields = ['id', 'foto', 'primeiro_nome', 'ultimo_nome', 'alcool', 'data_adicionado']
        read_only_fields = ['data_adicionado']

    def get_foto(self, obj):
        """
        Retorna o URL relativo da foto, se existir.
        O frontend será responsável por construir o URL completo.
        """
        if obj.foto and hasattr(obj.foto, 'url'):
            return obj.foto.url
        return None

