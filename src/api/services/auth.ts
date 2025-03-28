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
interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  email?: string;
}


export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post('/v1/users/login', { email, password });
  const { token } = response.data;

  localStorage.setItem('token', token);
  console.log('Token enviado en el interceptor:', token); // Depuración

  return response.data;
};

export const register = async (data: RegisterData): Promise<void> => {
  await api.post('/v1/users/register', {
    first_name: data.firstName, 
    last_name: data.lastName,   
    email: data.email,
    password: data.password,
  });
};

// Nueva función: Obtener información del usuario autenticado
export const getUserInfo = async (token: string): Promise<UpdateUserData> => {
  const response = await api.get('/v1/users/me', {
    headers: {
      Authorization: `Bearer ${token}`, // Agrega el prefijo "Bearer"
    },
  });
  return response.data;  
};

// Nueva función: Actualizar información del usuario autenticado
export const updateUserInfo = async (token: string, data: UpdateUserData): Promise<UpdateUserData> => {
  const response = await api.put('/v1/users/me', data, {
    headers: {
      Authorization: `Bearer ${token}`, // Agrega el prefijo "Bearer"
    },
  });
  return response.data;
};

// Nueva función: Cerrar sesión del usuario autenticado
export const logout = async (): Promise<void> => {
  const token = localStorage.getItem('token'); // Obtén el token del localStorage
console.log("HOla auth");
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