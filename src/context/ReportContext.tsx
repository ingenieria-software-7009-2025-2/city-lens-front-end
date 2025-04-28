import React, { createContext, ReactNode, useContext, useState } from 'react';
import { createReport as createReportService, updateReport as updateReportService, deleteReport as deleteReportService, getLatestReports } from '../api/services/report'; 
import { ReportCreateData, ReportUpdateData,  ReportOutputBody } from '../api/models/report';

export const ReportContext = createContext<{
  createReport: (data: ReportCreateData) => Promise<void>;
  updateReport: (data: ReportUpdateData) => Promise<void>;
  deleteReport: (data: ReportUpdateData) => Promise<void>;
  reports: ReportOutputBody[];
  fetchReports: () => Promise<void>;
}>({
  createReport: async () => {
    throw new Error('createReport no está implementado.');
  },
  updateReport: async () => {
    throw new Error('updateReport no está implementado.');
  },
  deleteReport: async () => {
    throw new Error('deleteReport no está implementado.');
  },
  reports: [],
  fetchReports: async () => {
    throw new Error('fetchReports no está implementado.');
  },
});

interface ReportProviderProps {
  children: ReactNode;
}

export const ReportProvider: React.FC<ReportProviderProps> = ({ children }) => {
  const [reports, setReports] = useState<ReportOutputBody[]>([]);

  const createReport = async (data: ReportCreateData) => {
    try {
      await createReportService(data);
      console.log('Reporte creado:', data);
    } catch (error) {
      console.error('Error al crear el reporte:', error);
      throw error;
    }
  };

  const updateReport = async (data: ReportUpdateData) => {
    try {
      await updateReportService(data);
      console.log('Reporte actualizado:', data);
      await fetchReports(); 
    } catch (error) {
      console.error('Error al actualizar el reporte:', error);
      throw error;
    }
  };

  const deleteReport = async (data: {id:string}) => {
    try {
      await deleteReportService(data);
      console.log('Reporte eliminado:', data);
    } catch (error) {
      console.error('Error al eliminar el reporte:', error);
      throw error;
    }
  };

  const fetchReports = async () => {
    try {
      const data = await getLatestReports();
      setReports(data);
    } catch (error) {
      console.error('Error al cargar los reportes:', error);
    }
  };

  return (
    <ReportContext.Provider value={{ createReport, updateReport, deleteReport, reports, fetchReports }}>
      {children}
    </ReportContext.Provider>
  );
};

// Hook personalizado para crear un reporte
export const useCreateReport = () => {
  const { createReport } = useContext(ReportContext);
  return createReport;
};

// Hook personalizado para actualizar un reporte
export const useUpdateReport = () => {
  const { updateReport } = useContext(ReportContext);
  return updateReport;
};

// Hook personalizado para eliminar un reporte
export const useDeleteReport = () => {
  const { deleteReport } = useContext(ReportContext);
  return deleteReport;
};

// Hook para obtener los reportes
export const useReports = () => {
  const { reports, fetchReports } = useContext(ReportContext);
  return { reports, fetchReports };
};