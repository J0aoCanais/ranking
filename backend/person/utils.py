import os
import json
from typing import Optional
from google.oauth2 import service_account
from googleapiclient.discovery import build
from .models import Person

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']


def _get_sheets_service():
	sa_json = os.environ.get('GCP_SERVICE_ACCOUNT_JSON')
	if sa_json:
		info = json.loads(sa_json)
		creds = service_account.Credentials.from_service_account_info(info, scopes=SCOPES)
	else:
		sa_file = os.environ.get('GCP_SERVICE_ACCOUNT_FILE', 'service_account.json')
		creds = service_account.Credentials.from_service_account_file(sa_file, scopes=SCOPES)
	return build('sheets', 'v4', credentials=creds)


def _extract_spreadsheet_id(spreadsheet_or_url: str) -> str:
	if '/d/' in spreadsheet_or_url:
		# URL form, extract between /d/ and next /
		part = spreadsheet_or_url.split('/d/')[1]
		return part.split('/')[0]
	return spreadsheet_or_url


def export_person_names_to_sheet_and_delete(spreadsheet_or_url: str, sheet_name: str = 'Sheet1') -> int:
	"""Append all person names to Google Sheet (two columns: primeiro_nome, ultimo_nome)
	and then delete them from DB. Returns the count exported/deleted.
	"""
	persons = list(Person.objects.all().order_by('id'))
	if not persons:
		return 0

	spreadsheet_id = _extract_spreadsheet_id(spreadsheet_or_url)
	values = [[p.primeiro_nome, p.ultimo_nome] for p in persons]

	service = _get_sheets_service()
	body = {'values': values}
	service.spreadsheets().values().append(
		spreadsheetId=spreadsheet_id,
		range=f"{sheet_name}!A:B",
		valueInputOption='RAW',
		insertDataOption='INSERT_ROWS',
		body=body
	).execute()

	# Delete exported persons
	Person.objects.filter(id__in=[p.id for p in persons]).delete()
	return len(persons)
