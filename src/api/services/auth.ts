import api from "../config/axios"; // Importar la instancia de Axios configurada

/**
 * Interfaz que define la estructura de la respuesta del endpoint de login
 */
interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

/**
 * Interfaz que define la estructura de los datos necesarios para el registro
 */
interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * Interfaz que define la estructura de los datos necesarios para actualizar la información del usuario
 */
interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  email?: string;
}

// Iniciar sesión
export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await api.post("/v1/users/login", { email, password });
  return response.data;
};

// Registro de un nuevo usuario
export const register = async (data: RegisterData): Promise<void> => {
  await api.post("/v1/users/register", data);
};

//Obtener información del usuario autenticado
export const getUserInfo = async (token: string): Promise<UpdateUserData> => {
  const response = await api.get("/v1/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Actualizar información del usuario autenticado
export const updateUserInfo = async (
  token: string,
  data: UpdateUserData,
): Promise<UpdateUserData> => {
  const response = await api.put("/v1/users/me", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
