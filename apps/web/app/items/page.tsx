'use client';
import { useEffect, useState } from 'react';

type Item = { id: string; name: string; price: number; unit: string };

export default function Items() {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL}/items`;
    fetch(url).then(r => r.json()).then(d => setItems(d.items || []));
  }, []);

  const update = async (id: string, price: number) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL}/items/${id}`;
    await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ price }) });
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Itens e Preços</h1>
      <table className="w-full text-sm border rounded-xl overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-2">Item</th>
            <th className="text-right p-2">Preço</th>
            <th className="text-left p-2">Unid.</th>
          </tr>
        </thead>
        <tbody>
          {items.map(it => (
            <tr key={it.id} className="border-t">
              <td className="p-2">{it.name}</td>
              <td className="p-2 text-right">
                <input
                  className="border rounded-md p-1 text-right w-32"
                  defaultValue={it.price}
                  onBlur={e => {
                    const val = Number(e.target.value);
                    if (!Number.isNaN(val)) update(it.id, val);
                  }}
                />
              </td>
              <td className="p-2">{it.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}