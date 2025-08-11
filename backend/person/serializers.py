from rest_framework import serializers
from .models import *


class PersonSerializer(serializers.ModelSerializer):
    foto = serializers.ImageField(required=False)

    class Meta:
        model = Person
        fields = ['id', 'foto', 'primeiro_nome', 'ultimo_nome', 'alcool', 'data_adicionado']
        read_only_fields = ['data_adicionado']

    def to_representation(self, instance):
        """
        Personaliza a representação da foto para retornar a URL completa
        """
        data = super().to_representation(instance)
        if instance.foto:
            request = self.context.get('request')
            if request:
                data['foto'] = request.build_absolute_uri(instance.foto.url)
            else:
                data['foto'] = instance.foto.url
        else:
            data['foto'] = None
        return data

