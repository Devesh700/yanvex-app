import { protectedProps } from "../types.js";
import { brandName } from "../args.js";
export const App = `
import { Navigate, Route, Routes, Link } from 'react-router';
import { AuthProvider, useAuth } from './auth/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Header from './components/layout/Header';

function ProtectedRoute${protectedProps} {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header />      

      <main>
        <Routes>
          <Route path="/" element={<HomePage brandName="${brandName}" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}
`