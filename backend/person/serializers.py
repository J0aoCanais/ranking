from rest_framework import serializers
from .models import *

class PersonCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['primeiro_nome', 'ultimo_nome', 'alcool', 'foto']

class PersonDetailSerializer(serializers.ModelSerializer):
    foto = serializers.SerializerMethodField()

    class Meta:
        model = Person
        fields = ['id', 'foto', 'primeiro_nome', 'ultimo_nome', 'alcool', 'data_adicionado']

    def get_foto(self, obj):
        request = self.context.get('request')
        if obj.foto and request:
            return request.build_absolute_uri(obj.foto.url)
        return None
