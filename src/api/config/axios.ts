import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // URL base del backend
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

// Interceptor para agregar el token a las solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Obtén el token del localStorage
  if (token) {
    config.headers.Authorization = token; // Agrega el prefijo "Bearer"
  }
  console.log(config);
  return config;
});

export default api;
