"""
WSGI config for PythonAnywhere deployment.
"""

import os
import sys

# Adiciona o diretório do projeto ao Python path
path = '/home/japcanais2/ranking/backend'
if path not in sys.path:
    sys.path.append(path)

# Define as configurações do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
