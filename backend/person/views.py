from django.db import transaction
from django.db.models import F
from django.http import HttpResponse, Http404
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError as DRFValidationError
from rest_framework.response import Response
from rest_framework import status
import os
import mimetypes

from .models import *
from .serializers import *
from .utils import *


@api_view(['POST'])
def create_person(request):
    """
    Cria uma nova pessoa
    """
    serializer = PersonSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        person = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_persons_by_alcohol(request):
    """
    Obtém todas as pessoas ordenadas por nível de álcool (decrescente para ranking)
    """
    persons = Person.objects.all().order_by('-alcool')
    serializer = PersonSerializer(persons, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_latest_person(request):
    """
    Retorna a última pessoa adicionada
    """
    try:
        latest_person = Person.objects.latest('data_adicionado')
        serializer = PersonSerializer(latest_person, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Person.DoesNotExist:
        return Response(
            {"message": "Nenhuma pessoa encontrada"}, 
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET'])
def serve_person_image(request, person_id):
    """
    Serve a imagem de uma pessoa específica
    """
    try:
        person = Person.objects.get(id=person_id)
        if not person.foto:
            raise Http404("Imagem não encontrada")
        
        # Caminho completo para a imagem
        image_path = person.foto.path
        
        if not os.path.exists(image_path):
            raise Http404("Arquivo de imagem não encontrado")
        
        # Detectar tipo MIME
        mime_type, _ = mimetypes.guess_type(image_path)
        if not mime_type:
            mime_type = 'application/octet-stream'
        
        # Ler e retornar a imagem
        with open(image_path, 'rb') as f:
            response = HttpResponse(f.read(), content_type=mime_type)
            response['Cache-Control'] = 'public, max-age=3600'  # Cache por 1 hora
            return response
            
    except Person.DoesNotExist:
        raise Http404("Pessoa não encontrada")
    except Exception as e:
        return Response(
            {"error": f"Erro ao servir imagem: {str(e)}"}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def test_images(request):
    """
    Endpoint para testar as URLs das imagens
    """
    persons = Person.objects.filter(foto__isnull=False)
    result = []
    
    for person in persons:
        serializer = PersonSerializer(person, context={'request': request})
        result.append({
            'id': person.id,
            'nome': f"{person.primeiro_nome} {person.ultimo_nome}",
            'foto_url': serializer.get_foto(person),
            'foto_path': person.foto.name if person.foto else None,
            'foto_exists': person.foto and os.path.exists(person.foto.path) if person.foto else False
        })
    
    return Response({
        'total_persons_with_photos': len(result),
        'persons': result,
        'media_url': settings.MEDIA_URL,
        'media_root': settings.MEDIA_ROOT
    })

