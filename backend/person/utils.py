import os
from typing import List, Tuple

from django.conf import settings

try:
	from openpyxl import load_workbook, Workbook
except Exception:  # openpyxl may not be installed yet during import graph
	load_workbook = None
	Workbook = None


EXCEL_RELATIVE_PATH = os.path.join('media', 'exports', 'pessoas.xlsx')


def _get_excel_path() -> str:
	base_dir = getattr(settings, 'BASE_DIR', os.getcwd())
	# Prefer project BASE_DIR path if pessoas.xlsx lives inside project tree
	path = os.path.join(base_dir, EXCEL_RELATIVE_PATH)
	# Fallback to absolute MEDIA_ROOT if configured for server deploy
	if not os.path.exists(os.path.dirname(path)):
		media_root = getattr(settings, 'MEDIA_ROOT', None)
		if media_root:
			path = os.path.join(media_root, 'exports', 'pessoas.xlsx')
	os.makedirs(os.path.dirname(path), exist_ok=True)
	return path


def read_names_from_excel() -> List[Tuple[str, float]]:
	"""
	Returns a list of (name, number) from pessoas.xlsx.
	Expected columns: A = Name, B = Number
	Missing file => returns empty list.
	"""
	path = _get_excel_path()
	if load_workbook is None or not os.path.exists(path):
		return []
	try:
		wb = load_workbook(path)
		ws = wb.active
		results: List[Tuple[str, float]] = []
		for row in ws.iter_rows(min_row=2, values_only=True):
			if not row:
				continue
			name = (row[0] or '').strip() if isinstance(row[0], str) else (str(row[0]) if row[0] is not None else '')
			num = row[1] if len(row) > 1 and isinstance(row[1], (int, float)) else 0
			if name:
				results.append((name, float(num)))
		return results
	except Exception:
		return []


def write_names_to_excel(data: List[Tuple[str, float]]) -> str:
	"""
	Overwrites pessoas.xlsx with header and provided rows.
	Returns the file path.
	"""
	path = _get_excel_path()
	if Workbook is None:
		raise RuntimeError('openpyxl is not installed')
	wb = Workbook()
	ws = wb.active
	ws.title = 'Pessoas'
	ws.append(['Nome', 'Numero'])
	for name, number in data:
		ws.append([name, number])
	wb.save(path)
	return path


def clear_excel() -> str:
	"""
	Clears the pessoas.xlsx file (keeps headers) or creates a fresh one.
	Returns the file path.
	"""
	return write_names_to_excel([])
