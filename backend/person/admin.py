from django.contrib import admin
from .models import Person


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('primeiro_nome', 'ultimo_nome', 'alcool', 'data_adicionado')
    list_filter = ('data_adicionado',)
    search_fields = ('primeiro_nome', 'ultimo_nome')
    readonly_fields = ('data_adicionado',)
    
    fieldsets = (
        ('Informações Pessoais', {
            'fields': ('foto', 'primeiro_nome', 'ultimo_nome')
        }),
        ('Dados do Ranking', {
            'fields': ('alcool',)
        }),
        ('Metadados', {
            'fields': ('data_adicionado',),
            'classes': ('collapse',)
        }),
    )
