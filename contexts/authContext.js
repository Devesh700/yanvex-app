import { typeUser, createContextGeneric, providerProps } from '../types.js';
import { isTs } from '../args.js';
export const authContext = `
import { createContext, useContext, useMemo, useState } from 'react';

${typeUser}const AuthContext = createContext${createContextGeneric}(null);

export function AuthProvider${providerProps} {
  const [user, setUser] = useState${isTs ? '<User | null>' : ''}(() => {
    const savedUser = localStorage.getItem('demo_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email${isTs ? ': string' : ''}, password${isTs ? ': string' : ''}) => {
    if (!email || !password) throw new Error('Email and password are required.');
    const nextUser = { email };
    localStorage.setItem('demo_user', JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem('demo_user');
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
`