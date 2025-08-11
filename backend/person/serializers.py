from rest_framework import serializers
from .models import *


class PersonSerializer(serializers.ModelSerializer):
    # Make foto writable to accept uploads; DRF will handle File/Image from request.FILES
    foto = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Person
        fields = ['id', 'foto', 'primeiro_nome', 'ultimo_nome', 'alcool', 'data_adicionado']
        read_only_fields = ['data_adicionado']

    def to_representation(self, instance):
        """
        Ensure "foto" is returned as an absolute URL when possible, while keeping the field writable.
        """
        rep = super().to_representation(instance)
        foto = rep.get('foto')
        if foto:
            request = self.context.get('request')
            if request and not str(foto).startswith('http'):
                rep['foto'] = request.build_absolute_uri(foto)
        return rep

