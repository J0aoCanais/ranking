from rest_framework import serializers
from .models import *


class PersonSerializer(serializers.ModelSerializer):
    foto = serializers.SerializerMethodField()

    class Meta:
        model = Person
        fields = ['id', 'foto', 'primeiro_nome', 'ultimo_nome', 'alcool', 'data_adicionado']
        read_only_fields = ['data_adicionado']

    def get_foto(self, obj):
        if obj.foto:
            # Preferimos expor um endpoint dedicado que faz stream da imagem
            # para evitar problemas de configuração de /media em produção.
            request = self.context.get('request')
            photo_path = f"/api/persons/{obj.pk}/photo/"
            if request:
                return request.build_absolute_uri(photo_path)
            return photo_path
        return None


class PersonCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['foto', 'primeiro_nome', 'ultimo_nome', 'alcool']

