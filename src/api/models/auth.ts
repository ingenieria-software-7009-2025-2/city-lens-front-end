/**
 * Representa la respuesta de una solicitud de inicio de sesión.
 */
export interface LoginResponse {
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
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
