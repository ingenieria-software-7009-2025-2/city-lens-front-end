import React, { useEffect, useContext, useState } from 'react';
import styles from './reportes.module.scss';
import { Nav } from '../../components/Layout/Nav/nav';
import { getLatestReports } from '../../services/../api/services/report';
import { ReportOutputBody } from '../../api/models/report';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import icono from '../../assets/images/city-lens.ico';
import { ReportContext } from '../../context/ReportContext'; 

export const Reportes: React.FC = () => {
  const [reports, setReports] = useState<ReportOutputBody[]>([]);
  const { deleteReport } = useContext(ReportContext);

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

  const handleDelete = async (id: string) => {
    try {
      await deleteReport({ id });  // Aquí pasas solo el id
      console.log(`Reporte con ID ${id} eliminado.`);
      
      // Actualizar la lista de reportes después de la eliminación
      setReports(reports.filter(report => report.id !== id));
    } catch (err) {
      console.error('Error eliminando el reporte:', err);
    }
  };

  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.reportContainer}>
        <h1>Lista de Reportes</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Ubicación</th>
              <th>Creado</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>
                  <img src={icono} alt="" width={30} />
                </td>
                <td>{report.title}</td>
                <td>{report.description}</td>
                <td>   <span className={`${styles.status} ${report.status === 'active' ? styles.active : styles.closed}`}>
                    {report.status === 'open' ? 'Activo' : 'Cerrado'}
                  </span></td>
                <td>{`${report.location.latitude}, ${report.location.longitude}`}</td>
                <td>{new Date(report.creationDate).toLocaleString()}</td>
                <td><FontAwesomeIcon icon={faPenToSquare} /></td>
                <td>
                  <FontAwesomeIcon 
                    icon={faCircleXmark} 
                    onClick={() => handleDelete(report.id)} 
                    style={{ cursor: 'pointer' }} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
