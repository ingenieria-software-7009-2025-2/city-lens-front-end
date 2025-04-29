import React, { createContext, useState, useEffect } from "react";
import { ReactNode } from "react";
import {
  login as loginService,
  logout as logoutService,
  register as registerService,
  getUserInfo as fetchUserInfo,
  updateUserInfo as updateUserService,
} from "../api/services/auth"; // Importa las funciones del servicio
import {
  RegisterData,
  UserUpdateData,
  LoginResponse,
} from "../api/models/auth"; // Importa las interfaces

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  getUserInfo: () => Promise<LoginResponse["user"]>;
  updateUserInfo: (
    userChanges: UserUpdateData,
  ) => Promise<LoginResponse["user"]>;
}>({
  isAuthenticated: false,
  token: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  getUserInfo: async () => {
    throw new Error("getUserInfo no está implementado.");
  },
  updateUserInfo: async () => {
    throw new Error("updateUserInfo no está implementado.");
  },
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setToken(token);
    }
  }, []);

  const register = async (data: RegisterData) => {
    try {
      await registerService(data); // Llama a la función register del servicio
      console.log("Registro exitoso:", data);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    const response = await loginService(email, password);
    localStorage.setItem("token", response.token);
    setIsAuthenticated(true);
    setToken(response.token);
  };

  const logout = async () => {
    try {
      await logoutService(); // Llama a la función logout del servicio
      setIsAuthenticated(false);
      setToken(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const getUserInfo = async (): Promise<LoginResponse["user"]> => {
    try {
      const userInfo = await fetchUserInfo(); // Llama a la función getUserInfo del servicio
      console.log("Información del usuario obtenida:", userInfo);
      return userInfo;
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
      throw error;
    }
  };

  const updateUserInfo = async (
    userChanges: UserUpdateData,
  ): Promise<LoginResponse["user"]> => {
    try {
      const updatedUser = await updateUserService(userChanges); // Llama a la función updateUserInfo del servicio
      console.log("Información del usuario actualizada:", updatedUser);
      console.log("Enviando datos:", userChanges);

      return updatedUser;
    } catch (error) {
      console.error("Error al actualizar la información del usuario:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        login,
        logout,
        register,
        getUserInfo,
        updateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
