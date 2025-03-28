import React, { createContext, useState, useEffect } from 'react';
import { ReactNode } from 'react';
import { logout as logoutService } from '../api/services/auth'; // Importa la función logout del servicio

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  token: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setToken(token);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setToken(token);
  };

  const logout = async () => {
    console.log('logout');
    try {
      await logoutService(); // Llama a la función logout del servicio
      setIsAuthenticated(false);
      setToken(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};