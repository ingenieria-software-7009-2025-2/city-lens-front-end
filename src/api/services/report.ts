import api from '../config/axios'; // Importar la instancia de Axios configurada
import { ReportCreateData, ReportUpdateData, ReportDeleteData,ReportOutputBody } from '../models/report'; // Importar las interfaces necesarias

/**
 * Crear un reporte
 * @param data Datos necesarios para crear un reporte
 * @returns Respuesta del servidor
 */
export const createReport = async (data: ReportCreateData): Promise<any> => {
  try {
    const response = await api.post('/v1/report/create', {
      title: data.title, 
      description: data.description,
      latitude: data.latitude, 
      longitude: data.longitude, 
      direction: data.direction, 
      zipcode: data.zipcode, 
      municipality: data.municipality, 
      imageURL: "https://example.com/image.jpg", 
    });
    console.log('Reporte creado:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error al crear el reporte:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Actualizar un reporte
 * @param data Datos necesarios para actualizar un reporte
 * @returns Respuesta del servidor
 */
export const updateReport = async (data: ReportUpdateData): Promise<any> => {
  try {
    const response = await api.put('/v1/report/update', data); // Cambié POST a PUT, ya que es más adecuado para actualizaciones
    console.log('Reporte actualizado:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error al actualizar el reporte:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un reporte
 * @param data Datos necesarios para eliminar un reporte
 * @returns Respuesta del servidor
 */
export const deleteReport = async (data: ReportDeleteData): Promise<any> => {
  try {
    const response = await api.delete('/v1/report/delete', { data }); // Usar DELETE con el payload en `data`
    console.log('Reporte eliminado:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error al eliminar el reporte:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Endpoint de prueba
 * @returns Respuesta del servidor como string
 */
export const testReportEndpoint = async (): Promise<string> => {
  try {
    const response = await api.get('/test');
    console.log('Respuesta del endpoint de prueba:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error al acceder al endpoint de prueba:', error.response?.data || error.message);
    throw error;
  }
};

export const getLatestReports = async (): Promise<ReportOutputBody[]> => {
  try {
    const response = await api.get('/v1/list/latest');
    console.log('Reportes obtenidos:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener reportes:', error.response?.data || error.message);
    throw error;
  }
};
