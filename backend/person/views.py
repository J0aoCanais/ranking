from django.db import transaction
from django.db.models import F
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError as DRFValidationError
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

from .models import *
from .serializers import *
from .utils import *


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def create_person(request):
    """
    Cria uma nova pessoa
    """
    # Ensure both data and files are passed to serializer
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

