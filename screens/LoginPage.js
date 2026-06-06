import {isTs} from "../args.js"
const loginEvent = isTs ? '(event: React.FormEvent<HTMLFormElement>)' : '(event)';

export const LoginPage = `import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = ${loginEvent} => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');

    try {
      login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-md place-items-center px-6 py-16">
      <form onSubmit={handleSubmit} className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="mt-2 text-sm text-slate-600">Use any email and password for demo login.</p>

        <label className="mt-6 block text-sm font-medium text-slate-700">Email</label>
        <input name="email" type="email" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500" placeholder="you@example.com" />

        <label className="mt-4 block text-sm font-medium text-slate-700">Password</label>
        <input name="password" type="password" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500" placeholder="••••••••" />

        {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <button className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700">
          Sign in
        </button>
      </form>
    </section>
  );
}`