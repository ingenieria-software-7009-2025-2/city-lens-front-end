import React, { createContext, useState, ReactNode } from 'react';
import { createReport as createReportService, updateReport as updateReportService, deleteReport as deleteReportService } from '../api/services/report';
import { ReportCreateData, ReportUpdateData, ReportDeleteData } from '../api/models/report';

export const ReportContext = createContext<{
  createReport: (data: ReportCreateData) => Promise<void>;
  updateReport: (data: ReportUpdateData) => Promise<void>;
  deleteReport: (data: ReportDeleteData) => Promise<void>;
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
});

interface ReportProviderProps {
  children: ReactNode;
}

export const ReportProvider: React.FC<ReportProviderProps> = ({ children }) => {
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
    } catch (error) {
      console.error('Error al actualizar el reporte:', error);
      throw error;
    }
  };

  const deleteReport = async (data: ReportDeleteData) => {
    try {
      await deleteReportService(data);
      console.log('Reporte eliminado:', data);
    } catch (error) {
      console.error('Error al eliminar el reporte:', error);
      throw error;
    }
  };

  return (
    <ReportContext.Provider value={{ createReport, updateReport, deleteReport }}>
      {children}
    </ReportContext.Provider>
  );
};