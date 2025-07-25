from django.urls import path
from .views import *

urlpatterns = [
    path('create/', create_person, name='create_person'),
    path('ranking/', get_persons_by_alcohol, name='get_persons_by_alcohol'),
    path('latest/', get_latest_person, name='get_latest_person'),
]
