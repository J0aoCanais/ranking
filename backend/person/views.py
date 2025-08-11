from django.db import transaction
from django.db.models import F
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError as DRFValidationError
from rest_framework.response import Response
from rest_framework import status
from django.http import FileResponse, Http404
import mimetypes
import os

from .models import *
from .serializers import *
from .utils import *


@api_view(['POST'])
def create_person(request):
    """
    Cria uma nova pessoa
    """
    create_serializer = PersonCreateSerializer(data=request.data)
    if create_serializer.is_valid():
        person = create_serializer.save()
        read_serializer = PersonSerializer(person, context={'request': request})
        return Response(read_serializer.data, status=status.HTTP_201_CREATED)
    return Response(create_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
def get_person_photo(request, pk: int):
    """
    Devolve o ficheiro da foto da pessoa diretamente (stream),
    evitando depender do mapeamento /media no servidor.
    """
    try:
        person = Person.objects.get(pk=pk)
    except Person.DoesNotExist:
        return Response({"detail": "Pessoa não encontrada"}, status=status.HTTP_404_NOT_FOUND)

    if not person.foto:
        return Response({"detail": "Foto não disponível"}, status=status.HTTP_404_NOT_FOUND)

    file_path = person.foto.path
    if not os.path.exists(file_path):
        return Response({"detail": "Ficheiro não encontrado"}, status=status.HTTP_404_NOT_FOUND)

    mime_type, _ = mimetypes.guess_type(file_path)
    # FileResponse necessita de um ficheiro aberto em modo binário
    file_handle = open(file_path, 'rb')
    response = FileResponse(file_handle, content_type=mime_type or 'application/octet-stream')
    # Opcional: cabeçalhos de cache para melhorar performance
    response["Cache-Control"] = "public, max-age=3600"
    return response

