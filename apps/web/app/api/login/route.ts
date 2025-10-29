import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, code } = await req.json();

  const allowed = (process.env.ALLOWED_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!email || !allowed.includes(String(email).toLowerCase())) {
    return NextResponse.json({ ok: false, error: 'email_não_autorizado' }, { status: 401 });
  }

  if (code !== process.env.ACCESS_CODE) {
    return NextResponse.json({ ok: false, error: 'código_incorreto' }, { status: 401 });
  }

  // Cria a resposta e adiciona o cookie httpOnly nela
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: 'session',
    value: String(email),
    httpOnly: true,
    sameSite: 'lax',
    secure: false,           // em produção: true (HTTPS)
    path: '/',
    maxAge: 60 * 60 * 8,     // 8 horas
  });

  return res;
}