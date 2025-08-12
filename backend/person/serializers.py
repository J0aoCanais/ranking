from rest_framework import serializers
from .models import *


class PersonSerializer(serializers.ModelSerializer):
    # Use ImageField so uploads are accepted on create/update
    foto = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Person
        fields = ['id', 'foto', 'primeiro_nome', 'ultimo_nome', 'alcool', 'data_adicionado']
        read_only_fields = ['data_adicionado']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Convert foto to absolute URL when present
        if instance and getattr(instance, 'foto', None):
            request = self.context.get('request')
            url = instance.foto.url
            data['foto'] = request.build_absolute_uri(url) if request else url
        else:
            data['foto'] = None
        return data

