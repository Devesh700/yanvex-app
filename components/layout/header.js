import { brandName } from '../../args.js';
export const Header =  `
    import { Link } from 'react-router';
    import { useAuth } from '../../auth/AuthContext';
    
    export default function Header() {
    const { user, logout } = useAuth();
    
    return (
    <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold tracking-tight">${brandName}</Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
            {user ? (
              <button onClick={logout} className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800">Logout</button>
            ) : (
              <Link to="/login" className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Login</Link>
            )}
          </div>
        </nav>
      </header>
      )
  };`