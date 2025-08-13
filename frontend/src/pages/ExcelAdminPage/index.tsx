import React, { useEffect, useState } from 'react';
import { request } from '../../api';

interface ExcelRow {
  nome: string;
  numero: number;
}

const ExcelAdminPage: React.FC = () => {
  const [rows, setRows] = useState<ExcelRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  const load = async () => {
    setLoading(true);
    const res = await request('GET', '/excel/names/');
    if (res.success) {
      setRows(res.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDbToExcel = async () => {
    setLoading(true);
    const res = await request('POST', '/excel/db-to-excel-clear-db/');
    if (res.success) {
      setMessage('Excel atualizado com dados do ranking e base de dados limpa.');
      await load();
    } else {
      setMessage('Erro ao atualizar Excel.');
    }
    setLoading(false);
  };

  const handleClearExcel = async () => {
    setLoading(true);
    const res = await request('POST', '/excel/clear/');
    if (res.success) {
      setMessage('Excel limpo.');
      await load();
    } else {
      setMessage('Erro ao limpar Excel.');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <h1>Gestão de Excel</h1>
      <p>Mostrar nomes do Excel com números, e botões de ações.</p>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <button onClick={handleDbToExcel} disabled={loading}>
          Limpar Base de Dados e Escrever Nomes no Excel
        </button>
        <button onClick={handleClearExcel} disabled={loading}>
          Limpar Excel
        </button>
      </div>

      {message && <div style={{ marginBottom: 16 }}>{message}</div>}

      {loading ? (
        <div>A carregar...</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Nome</th>
              <th style={{ textAlign: 'right', borderBottom: '1px solid #ddd', padding: '8px' }}>Número</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={2} style={{ padding: '12px 8px', color: '#666' }}>Sem dados</td>
              </tr>
            ) : (
              rows.map((r, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>{r.nome}</td>
                  <td style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #f0f0f0' }}>{r.numero}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExcelAdminPage;
