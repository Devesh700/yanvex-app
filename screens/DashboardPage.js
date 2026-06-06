export const DashboardPage = `
import { useAuth } from '../auth/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Protected Route</p>
        <h1 className="mt-2 text-4xl font-bold">Dashboard</h1>
        <p className="mt-4 text-slate-600">You are logged in as {user?.email}.</p>
      </div>
    </section>
  );
}
`