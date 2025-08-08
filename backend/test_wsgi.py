# Teste simples para verificar se o Django está a funcionar
# Coloca este código temporariamente no WSGI file para teste

import os
import sys

def application(environ, start_response):
    status = '200 OK'
    headers = [('Content-type', 'text/plain')]
    start_response(status, headers)
    return [b"Hello from PythonAnywhere! Django is working."]
