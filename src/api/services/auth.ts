import api from '../config/axios'; // Importar la instancia de Axios configurada
import { LoginResponse, RegisterData ,UserUpdateData} from '../models/auth'; // Importar las interfaces desde models

//todo LOGIN
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post('/v1/users/login', { email, password });
  const { token } = response.data;

  localStorage.setItem('token', token);
  console.log('Token enviado en el interceptor:', token); // Depuración

  return response.data;
};

//todo REGISTER
export const register = async (data: RegisterData): Promise<void> => {
  await api.post('/v1/users/register', {
    first_name: data.firstName, 
    last_name: data.lastName,   
    email: data.email,
    password: data.password,
  });
};

// todo LOGOUT
export const logout = async (): Promise<void> => {
  const token = localStorage.getItem('token'); // Obtén el token del localStorage
  if (!token) {
    throw new Error('No se encontró un token de autenticación.');
  }

  try {
    await api.post('/v1/users/logout', {}, {
      headers: {
        Authorization: token,
      },
    });

    // Elimina el token del localStorage después de cerrar sesión
    // localStorage.removeItem('token');
    console.log('Sesión cerrada correctamente.');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error; // Lanza el error para que pueda manejarse en el componente que llama a esta función
  }
};

//todo GET USER
export const getUserInfo = async (): Promise<LoginResponse['user']> => {
  const token = localStorage.getItem('token'); // Obtén el token del localStorage
  if (!token) {
    throw new Error('No se encontró un token de autenticación.');
  }

  try {
    const response = await api.get('/v1/users/me', {
      headers: {
        Authorization: token, // Envía el token directamente
      },
    });

    console.log('Datos del usuario obtenidos:', response.data);
    return response.data; // Devuelve los datos del usuario
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    throw error;
  }
};

//todo UPDATE USER
export const updateUserInfo = async (userChanges: UserUpdateData): Promise<LoginResponse['user']> => {
  const token = localStorage.getItem('token'); // Obtén el token del localStorage
  if (!token) {
    throw new Error('No se encontró un token de autenticación.');
  }
  const payload = {
    first_name: userChanges.firstName, // <-- Transformamos la clave
    last_name: userChanges.lastName,   // <-- Transformamos la clave
    email: userChanges.email,
  };
  try {
    const response = await api.put('/v1/users/me', payload, {
      headers: {
        Authorization: token, // Envía el token directamente
      },
    });

    console.log('Datos del usuario actualizados:', response.data);
    return response.data; // Devuelve los datos actualizados del usuario
  } catch (error) {
    console.error('Error al actualizar los datos del usuario:', error);
    throw error;
  }
};