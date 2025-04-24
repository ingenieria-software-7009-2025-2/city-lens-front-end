
// Interfaz para crear un reporte
export interface ReportCreateData {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  municipality: string;
  zipcode: string;
}

// Interfaz para actualizar un reporte
export interface ReportUpdateData {
  id: string;
  title?: string;
  description?: string;
  status?: string;
  resolutionDate?: string; // Fecha en formato ISO
}

// Interfaz para eliminar un reporte
export interface ReportDeleteData {
	id: string;
  }
  