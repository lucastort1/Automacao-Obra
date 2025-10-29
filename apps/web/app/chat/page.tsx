'use client';
import { useState } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [log, setLog] = useState<string[]>([]);

  const send = async () => {
    const form = new FormData();
    form.append('text', text);
    if (file) form.append('file', file);
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL}/chat`;
    const res = await fetch(url, { method: 'POST', body: form });
    const data = await res.json();
    setLog(prev => [...prev, `Você: ${text}`, `IA: ${data.reply}`]);
    setText('');
    setFile(null);
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Chat com a IA</h1>
      <div className="flex gap-2">
        <input className="flex-1 border rounded-md p-2" placeholder="Descreva sua obra..." value={text} onChange={e => setText(e.target.value)} />
        <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
        <button className="border rounded-md px-4" onClick={send}>Enviar</button>
      </div>
      <div className="border rounded-xl p-4 space-y-2 bg-gray-50">
        {log.map((l, i) => <p key={i}>{l}</p>)}
      </div>
    </main>
  );
}