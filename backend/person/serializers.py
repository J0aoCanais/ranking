from rest_framework import serializers
from .models import *


class PersonSerializer(serializers.ModelSerializer):
    # Make 'foto' writable so file uploads are accepted; we'll add the URL on output manually
    foto = serializers.ImageField(required=False, allow_null=True, write_only=True)

    class Meta:
        model = Person
        fields = ['id', 'foto', 'primeiro_nome', 'ultimo_nome', 'alcool', 'data_adicionado']
        read_only_fields = ['data_adicionado']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # 'foto' is write_only; expose URL under the same key for backward compatibility
        if instance and getattr(instance, 'foto', None):
            request = self.context.get('request')
            url = instance.foto.url
            data['foto'] = request.build_absolute_uri(url) if request else url
        else:
            data['foto'] = None
        return data

