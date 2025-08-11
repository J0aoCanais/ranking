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
            request = self.context.get('request')
            if request:
                # Para PythonAnywhere, garantir que a URL é absoluta e pública
                base_url = request.build_absolute_uri('/').rstrip('/')
                # Se estamos no PythonAnywhere, usar o domínio público
                if 'pythonanywhere.com' in base_url:
                    return f"{base_url}{obj.foto.url}"
                else:
                    return request.build_absolute_uri(obj.foto.url)
            return obj.foto.url
        return None

