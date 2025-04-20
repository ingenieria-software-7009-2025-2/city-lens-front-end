import React from 'react';
import styles from './reportes.module.scss';
import { Nav } from '../../components/Layout/Nav/nav';
interface Report {
  id: string; // UUID del reporte
  title: string; // Título del reporte
  description: string; // Descripción del incidente
  status: string; // Estado del reporte
  locationId: string; // UUID de la ubicación asociada
  creationDate: string; // Fecha de creación del reporte
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Reporte 1',
    description: 'Descripción del incidente 1',
    status: 'Abierto',
    locationId: '123',
    creationDate: '2025-04-19T10:00:00',
  },
  {
    id: '2',
    title: 'Reporte 2',
    description: 'Descripción del incidente 2',
    status: 'Cerrado',
    locationId: '456',
    creationDate: '2025-04-18T15:30:00',
  },
];

export const Reportes: React.FC = () => {
  return (
    <div className={styles.container}>
      <Nav></Nav>
      <div className={styles.reportContainer}>

      <h1>Lista de Reportes</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>ID de Ubicación</th>
            <th>Fecha de Creación</th>
          </tr>
        </thead>
        <tbody>
          {mockReports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.title}</td>
              <td>{report.description}</td>
              <td>{report.status}</td>
              <td>{report.locationId}</td>
              <td>{new Date(report.creationDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
          </div>
    </div>
  );
};
