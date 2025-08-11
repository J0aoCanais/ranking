from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        'message': 'Backend API funcionando!',
        'endpoints': {
            'admin': '/admin/',
            'persons': '/api/persons/',
        }
    })

urlpatterns = [
    path('', api_root, name='api_root'),  # Página inicial
    path('admin/', admin.site.urls),
    path('api/', include('person.urls')),  # API endpoints
    path('person/', include('person.urls')),  # Manter compatibilidade
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
