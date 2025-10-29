'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const params = useSearchParams();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });
    if (res.ok) {
      const next = params.get('next') || '/';
      router.replace(next);
    } else {
      const data = await res.json();
      setError(data?.error || 'erro_login');
    }
  };

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 border p-6 rounded-xl">
        <h1 className="text-xl font-semibold">Entrar</h1>
        <input
          className="w-full border rounded-md p-2"
          placeholder="email permitido"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full border rounded-md p-2"
          placeholder="código de acesso"
          value={code}
          onChange={e => setCode(e.target.value)}
          required
        />
        {error && <p className="text-red-600 text-sm">Erro: {error}</p>}
        <button className="w-full rounded-md border p-2 hover:bg-gray-50">Entrar</button>
      </form>
    </main>
  );
}