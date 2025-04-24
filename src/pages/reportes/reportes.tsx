import React, { useEffect, useState } from 'react';
import styles from './reportes.module.scss';
import { Nav } from '../../components/Layout/Nav/nav';
import { getLatestReports } from '../../services/../api/services/report';
import { ReportOutputBody } from '../../api/models/report';

export const Reportes: React.FC = () => {
  const [reports, setReports] = useState<ReportOutputBody[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getLatestReports();
        setReports(data);
      } catch (err) {
        console.error('Error al cargar reportes:', err);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.reportContainer}>
        <h1>Lista de Reportes</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Ubicación</th>
              <th>Creado</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report,index) => (
              <tr key={report.id}>
                <td>{index+1}</td>
                <td>
                  {/* {report.imageId ? (
                    <img
                      src={`http://localhost:8080/v1/image/${report.imageId}`}
                      alt="Reporte"
                      width={50}
                      height={50}
                      style={{ objectFit: 'cover', borderRadius: '6px' }}
                    />
                  ) : (
                    'Sin imagen'
                  )} */}
                  
                </td>
                <td>{report.title}</td>
                <td>{report.description}</td>
                <td>{report.status}</td>
                <td>{`${report.location.latitude}, ${report.location.longitude}`}</td>
                <td>{new Date(report.creationDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
