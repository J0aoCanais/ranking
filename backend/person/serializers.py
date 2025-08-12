from rest_framework import serializers
from .models import *

class PersonCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['primeiro_nome', 'ultimo_nome', 'alcool', 'foto']

class PersonSerializer(serializers.ModelSerializer):
    foto_url = serializers.SerializerMethodField()

    class Meta:
        model = Person
        fields = ['id', 'foto', 'foto_url', 'primeiro_nome', 'ultimo_nome', 'alcool', 'data_adicionado']
        read_only_fields = ['data_adicionado']

    def get_foto_url(self, obj):
        if obj.foto:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.foto.url)
        return None