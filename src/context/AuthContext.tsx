import React, { createContext, useState, useEffect } from 'react';
import { ReactNode } from 'react';
import { login as loginService, logout as logoutService, register as registerService } from '../api/services/auth'; // Importa las funciones del servicio
import { RegisterData } from '../api/models/auth'; // Importa la interfaz RegisterData

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
}>({
  isAuthenticated: false,
  token: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
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

  const register = async (data: RegisterData) => {
    try {
      await registerService(data); // Llama a la función register del servicio
      console.log('Registro exitoso:', data);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  };

  
  const login = async (email: string, password: string) => {
    const response = await loginService(email, password);
    localStorage.setItem('token', response.token);
    setIsAuthenticated(true);
    setToken(response.token);
  };

  const logout = async () => {
    try {
      await logoutService(); // Llama a la función logout del servicio
      setIsAuthenticated(false);
      setToken(null);
          } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};