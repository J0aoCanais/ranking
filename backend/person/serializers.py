from rest_framework import serializers
from .models import *


class PersonSerializer(serializers.ModelSerializer):
    foto = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Person
        fields = ['id', 'foto', 'primeiro_nome', 'ultimo_nome', 'alcool', 'data_adicionado']
        read_only_fields = ['data_adicionado']

    def to_representation(self, instance):
        """
        Return foto as absolute URL in responses while keeping it writable for uploads
        """
        rep = super().to_representation(instance)
        if rep.get('foto'):
            request = self.context.get('request')
            if request and not str(rep['foto']).startswith('http'):
                rep['foto'] = request.build_absolute_uri(rep['foto'])
        return rep

