from django.urls import path
from .views import *

urlpatterns = [
    path('persons/', get_persons_by_alcohol, name='get_persons_by_alcohol'),  # Lista todas as pessoas
    path('persons/create/', create_person, name='create_person'),
    path('persons/ranking/', get_persons_by_alcohol, name='ranking'),
    path('persons/latest/', get_latest_person, name='get_latest_person'),
    # Excel endpoints
    path('excel/names/', excel_names, name='excel_names'),
    path('excel/db-to-excel-clear-db/', db_to_excel_and_clear_db, name='db_to_excel_and_clear_db'),
    path('excel/clear/', clear_excel_file, name='clear_excel_file'),
    
    # Manter URLs antigas para compatibilidade
    path('create/', create_person, name='create_person_old'),
    path('ranking/', get_persons_by_alcohol, name='get_persons_by_alcohol_old'),
    path('latest/', get_latest_person, name='get_latest_person_old'),
]
