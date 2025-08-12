import React, { useState } from 'react';
import { request } from '../../api';

const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/13dq5As2tYjVhWL-Nsa7sSk4NfMfVcTsykoJD8p4DJbg/edit?usp=sharing';
const SHEET_NAME = 'Folha1';

const AdminExportPage: React.FC = () => {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const onExportDelete = async () => {
    setBusy(true); setMsg('');
    try {
      const body = { spreadsheet: SPREADSHEET_URL, sheet_name: SHEET_NAME };
      const res = await request('POST', '/person/export-delete/', body, false);
      if (res.success) {
        setMsg(`Exportadas e removidas: ${res.data.exported || 0}`);
      } else {
        setMsg(`Erro: ${res.error || 'desconhecido'}`);
      }
    } catch (e: any) {
      setMsg(`Erro: ${e?.message || e}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <button onClick={onExportDelete} disabled={busy} style={{ padding: '8px 16px' }}>
        {busy ? 'A processar…' : 'Eliminar'}
      </button>
      {msg && <div style={{ marginTop: 12 }}>{msg}</div>}
    </div>
  );
};

export default AdminExportPage;
