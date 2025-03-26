import React, { createContext, useState, useEffect } from 'react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      setToken(token);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setToken(null);
  };

  const handleLogout = () => {
    logout(); // Llama a la función logout del contexto
    navigate("/login"); // Redirige al login
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};