import axios from "axios";

/**
 * Crea una instancia de Axios con una configuración predefinida.
 * La URL base está configurada a 'http://localhost:8080' y el tipo de contenido está configurado a 'application/json'.
 */
const api = axios.create({
  baseURL: "http://localhost:8080", // URL base del backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

// Interceptor para agregar el token a las solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
