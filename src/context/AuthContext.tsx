import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Role = 'admin' | 'company' | 'customer' | null;

interface AuthContextType {
  user: string | null;
  role: Role;
  login: (username: string, role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<Role>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role') as Role;
    if (savedUser && savedRole) {
        login(savedUser, savedRole);
      }
  }, []);

  const login = (username: string, role: Role) => {
    setUser(username);
    setRole(role);
    localStorage.setItem('user', username);
    localStorage.setItem('role', role ?? '');

  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth 必須包在 AuthProvider 裡使用');
  return ctx;
};
