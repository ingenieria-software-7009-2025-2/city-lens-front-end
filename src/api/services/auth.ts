import api from '../config/axios'; // Importar la instancia de Axios configurada

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post('/v1/users/login', { email, password });
  return response.data;
};

export const register = async (data: RegisterData): Promise<void> => {
  await api.post('/v1/users/register', data);
};