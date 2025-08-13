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
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={onExportDelete} disabled={busy} style={{ padding: '8px 16px' }}>
        {busy ? 'A processar…' : 'Eliminar'}
        </button>
        <button
          disabled={busy}
          style={{ padding: '8px 16px' }}
          onClick={async () => {
            setBusy(true); setMsg('');
            try {
              const res = await request('POST', '/api/persons/excel/clear/', {}, false);
              if (res.success) {
                setMsg(`Excel limpo. Ficheiro: ${res.data.url}`);
              } else {
                const err = res.error; const errText = typeof err === 'string' ? err : (err?.error || err?.detail || JSON.stringify(err));
                setMsg(`Erro: ${errText}`);
              }
            } catch (e: any) {
              setMsg(`Erro: ${e?.message || e}`);
            } finally { setBusy(false); }
          }}
        >Limpar Excel</button>
        <button
          disabled={busy}
          style={{ padding: '8px 16px' }}
          onClick={async () => {
            setBusy(true); setMsg('');
            try {
              const res = await request('GET', '/api/persons/excel/info/', null, false);
              if (res.success) {
                const url = res.data.url; const rows = res.data.rows; const exists = res.data.exists;
                setMsg(`${exists ? 'Existe' : 'Não existe'} | Linhas: ${rows}${url ? ` | Ficheiro: ${url}` : ''}`);
              } else {
                const err = res.error; const errText = typeof err === 'string' ? err : (err?.error || err?.detail || JSON.stringify(err));
                setMsg(`Erro: ${errText}`);
              }
            } catch (e: any) {
              setMsg(`Erro: ${e?.message || e}`);
            } finally { setBusy(false); }
          }}
        >Mostrar Excel</button>
      </div>
      {msg && <div style={{ marginTop: 12 }}>{msg}</div>}
    </div>
  );
};

export default AdminExportPage;
