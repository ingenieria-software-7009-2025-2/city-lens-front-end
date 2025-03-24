import api from "../config/axios"; // Importar la instancia de Axios configurada

/**
 * Representa la respuesta de una solicitud de inicio de sesión.
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
 * Representa los datos necesarios para registrar un nuevo usuario.
 */
interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * Realiza una solicitud de inicio de sesión.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<LoginResponse>} - La respuesta de la solicitud de inicio de sesión.
 */
export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await api.post("/v1/users/login", { email, password });
  return response.data;
};

/**
 * Registra un nuevo usuario.
 * @param {RegisterData} data - Los datos del nuevo usuario.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando el registro es exitoso.
 */
export const register = async (data: RegisterData): Promise<void> => {
  await api.post("/v1/users/register", data);
};
