import api from "../config/axios"; // Importar la instancia de Axios configurada
import { LoginResponse, RegisterData, UserUpdateData } from "../models/auth"; // Importar las interfaces desde models

/**
 * Inicia sesión con las credenciales proporcionadas y almacena el token de autenticación en el localStorage.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<LoginResponse>} - Promesa que resuelve con la respuesta del inicio de sesión.
 * @throws {Error} - Lanza un error si ocurre un problema durante la solicitud.
 */
export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  // Limpiar el localStorage antes de iniciar sesión
  localStorage.clear();

  const response = await api.post("/v1/users/login", { email, password });
  const { token } = response.data;

  localStorage.setItem("token", token);
  console.log("Token enviado en el interceptor:", token); // Depuración

  return response.data;
};

/**
 * Registra un nuevo usuario con los datos proporcionados.
 * @param {RegisterData} data - Datos necesarios para registrar al usuario.
 * @returns {Promise<void>} - Promesa que se resuelve cuando el registro es exitoso.
 * @throws {Error} - Lanza un error si ocurre un problema durante la solicitud.
 */
export const register = async (data: RegisterData): Promise<void> => {
  await api.post("/v1/users/register", {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    password: data.password,
  });
};

/**
 * Cierra la sesión del usuario eliminando el token de autenticación del localStorage.
 * @returns {Promise<void>} - Promesa que se resuelve cuando la sesión se cierra correctamente.
 * @throws {Error} - Lanza un error si no se encuentra un token o si ocurre un problema durante la solicitud.
 */
export const logout = async (): Promise<void> => {
  const token = localStorage.getItem("token"); // Obtén el token del localStorage
  if (!token) {
    throw new Error("No se encontró un token de autenticación.");
  }

  try {
    await api.post(
      "/v1/users/logout",
      {},
      {
        headers: {
          Authorization: token,
        },
      },
    );

    // Elimina el token del localStorage después de cerrar sesión
    localStorage.removeItem("token");
    console.log("Sesión cerrada correctamente.");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error; // Lanza el error para que pueda manejarse en el componente que llama a esta función
  }
};

/**
 * Obtiene la información del usuario autenticado.
 * @returns {Promise<LoginResponse["user"]>} - Promesa que resuelve con los datos del usuario.
 * @throws {Error} - Lanza un error si no se encuentra un token o si ocurre un problema durante la solicitud.
 */
export const getUserInfo = async (): Promise<LoginResponse["user"]> => {
  const token = localStorage.getItem("token"); // Obtén el token del localStorage
  console.log("TOken get user:" + token);
  if (!token) {
    throw new Error("No se encontró un token de autenticación.");
  }

  try {
    const response = await api.get("/v1/users/me");

    console.log("Datos del usuario obtenidos:", response.data);
    return response.data; // Devuelve los datos del usuario
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    throw error;
  }
};

/**
 * Actualiza la información del usuario autenticado con los cambios proporcionados.
 * @param {UserUpdateData} userChanges - Datos que se desean actualizar del usuario.
 * @returns {Promise<LoginResponse["user"]>} - Promesa que resuelve con los datos actualizados del usuario.
 * @throws {Error} - Lanza un error si no se encuentra un token o si ocurre un problema durante la solicitud.
 */
export const updateUserInfo = async (
  userChanges: UserUpdateData,
): Promise<LoginResponse["user"]> => {
  const token = localStorage.getItem("token"); // Obtén el token del localStorage
  if (!token) {
    throw new Error("No se encontró un token de autenticación.");
  }
  const payload = {
    first_name: userChanges.firstName, // <-- Transformamos la clave
    last_name: userChanges.lastName, // <-- Transformamos la clave
    email: userChanges.email,
  };
  try {
    const response = await api.put("/v1/users/me", payload, {
      headers: {
        Authorization: token, // Envía el token directamente
      },
    });

    console.log("Datos del usuario actualizados:", response.data);
    return response.data; // Devuelve los datos actualizados del usuario
  } catch (error) {
    console.error("Error al actualizar los datos del usuario:", error);
    throw error;
  }
};
