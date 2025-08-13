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
from .utils import read_names_from_excel, write_names_to_excel, clear_excel


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def create_person(request):
    print("FILES:", request.FILES)  
    serializer = PersonSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
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
def excel_names(request):
    """
    Lê nomes e números do Excel pessoas.xlsx e devolve uma lista.
    Estrutura: [{"nome": str, "numero": float}]
    """
    data = read_names_from_excel()
    payload = [{"nome": n, "numero": num} for n, num in data]
    return Response(payload, status=status.HTTP_200_OK)


@api_view(['POST'])
def db_to_excel_and_clear_db(request):
    """
    Limpa a base de dados e escreve os nomes no Excel.
    Assumimos que o Excel deverá conter o ranking atual (nome completo + alcool),
    e depois apagamos a tabela Person.
    """
    persons = Person.objects.all().order_by('-alcool')
    rows = []
    for p in persons:
        nome = f"{p.primeiro_nome} {p.ultimo_nome}".strip()
        rows.append((nome, float(p.alcool)))

    # Escreve no Excel
    write_names_to_excel(rows)

    # Limpa DB
    with transaction.atomic():
        Person.objects.all().delete()

    return Response({"message": "Excel atualizado e base de dados limpa."}, status=status.HTTP_200_OK)


@api_view(['POST'])
def clear_excel_file(request):
    """
    Limpa o Excel pessoas.xlsx (mantendo cabeçalho).
    """
    clear_excel()
    return Response({"message": "Excel limpo."}, status=status.HTTP_200_OK)

