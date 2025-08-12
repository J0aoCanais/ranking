import React, { useState } from 'react';
import { request } from '../../api';

const AdminExportPage: React.FC = () => {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const onExportDelete = async () => {
    setBusy(true); setMsg('');
    try {
  const res = await request('POST', '/api/persons/export-delete/', {}, false);
      if (res.success) {
        const n = res.data.exported || 0;
        const link = res.data.url;
        setMsg(`Exportadas e removidas: ${n}${link ? ` | Ficheiro: ${link}` : ''}`);
      } else {
        const err = res.error;
        const errText = typeof err === 'string' ? err : (err?.error || err?.detail || JSON.stringify(err));
        setMsg(`Erro: ${errText}`);
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
