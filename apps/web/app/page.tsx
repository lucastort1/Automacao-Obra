'use client';

import { useEffect, useState } from 'react';

type Budget = { id: string; name: string; total: number; created_at: string };

export default function Home() {
  const [data, setData] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL}/budgets`;
    fetch(url).then(r => r.json()).then(d => { setData(d.items || []); setLoading(false); });
  }, []);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">OrçaIA — Dashboard</h1>

      {/* Cards (mock) */}
      <section className="grid md:grid-cols-3 gap-4">
        <div className="border rounded-xl p-4">
          <h2 className="font-medium">Orçamentos no mês</h2>
          <p className="text-3xl">{data.length}</p>
        </div>
        <div className="border rounded-xl p-4">
          <h2 className="font-medium">Ticket médio (R$)</h2>
          <p className="text-3xl">
            {data.length ? Math.round(data.reduce((s, b) => s + b.total, 0) / data.length).toLocaleString('pt-BR') : 0}
          </p>
        </div>
        <div className="border rounded-xl p-4">
          <h2 className="font-medium">Último orçamento</h2>
          <p>{data[0]?.name || '-'}</p>
        </div>
      </section>

      {/* Histórico */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Histórico de Orçamentos</h2>
        {loading ? <p>Carregando...</p> : (
          <table className="w-full text-sm border rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-2">Nome</th>
                <th className="text-left p-2">Data</th>
                <th className="text-right p-2">Total (R$)</th>
              </tr>
            </thead>
            <tbody>
              {data.map(b => (
                <tr key={b.id} className="border-t">
                  <td className="p-2">{b.name}</td>
                  <td className="p-2">{new Date(b.created_at).toLocaleDateString('pt-BR')}</td>
                  <td className="p-2 text-right">{b.total.toLocaleString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}