/**
 * Interfaz que representa los datos necesarios para crear un reporte.
 */
export interface ReportCreateData {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  direction: string;
  municipality: string;
  zipcode: string;
  imageURL?: string;
}

/**
 * Interfaz que representa los datos necesarios para actualizar un reporte.
 */
export interface ReportUpdateData {
  id: string;
  title?: string;
  description?: string;
  status?: string;
  resolutionDate?: string; // Fecha en formato ISO
}

/**
 * Interfaz que representa los datos necesarios para buscar reportes.
 */
export interface ReportSearchData {
  zipcode: string;
  ascending?: boolean; // Orden ascendente o descendente (opcional)
}

/**
 * Interfaz que representa los datos necesarios para actualizar un reporte.
 */
export interface ReportOutputBody {
  id: string;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  resolutionDate?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  imageId?: string;
}
