import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./reportes.module.scss";
import { Nav } from "../../components/Layout/Nav/nav";
import {
  getLatestReports,
  getOldestReports,
  getOpenReports,
  getRecentlyResolved,
} from "../../services/../api/services/report";
import { ReportOutputBody } from "../../api/models/report";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import icono from "../../assets/images/city-lens.ico";
import { ReportContext } from "../../context/ReportContext";

/**
 * Componente funcional para mostrar una lista de reportes.
 * Permite al usuario ver, editar y eliminar reportes.
 * Utiliza el contexto `ReportContext` para manejar la eliminación de reportes.
 */
export const Reportes: React.FC = () => {
  // Estado para almacenar la lista de reportes
  const [reports, setReports] = useState<ReportOutputBody[]>([]);

  // Contexto para manejar la eliminación de reportes
  const { deleteReport } = useContext(ReportContext);

  // Hook para redirigir al usuario a otra página
  const navigate = useNavigate();

  /**
   * Redirige al usuario a la página de edición de un reporte específico.
   * @param id ID del reporte a editar.
   */
  const handleEdit = (id: string) => {
    navigate(`/editar/${id}`);
  };

  /**
   * Efecto para cargar la lista de reportes al montar el componente.
   * Llama a la función `getLatestReports` para obtener los reportes más recientes.
   */
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getLatestReports();
        setReports(data); // Actualiza el estado con los reportes obtenidos
      } catch (err) {
        console.error("Error al cargar reportes:", err);
      }
    };

    fetchReports();
  }, []);

  /**
   * Maneja la eliminación de un reporte.
   * Llama a la función `deleteReport` del contexto y actualiza la lista de reportes.
   * @param id ID del reporte a eliminar.
   */
  const handleDelete = async (id: string) => {
    try {
      await deleteReport({ id }); // Elimina el reporte con el ID proporcionado
      console.log(`Reporte con ID ${id} eliminado.`);

      // Actualiza la lista de reportes después de la eliminación
      setReports(reports.filter((report) => report.id !== id));
    } catch (err) {
      console.error("Error eliminando el reporte:", err);
    }
  };

  const fetchLatest = async () => {
    try {
      const data = await getLatestReports(); // Llama a la función del servicio
      setReports(data); // Actualiza el estado con los reportes más recientes
    } catch (err) {
      console.error("Error al obtener los reportes más recientes:", err);
    }
  };

  const fetchOldest = async () => {
    try {
      const data = await getOldestReports(); // Asegúrate de tener esta función en tu servicio
      setReports(data);
    } catch (err) {
      console.error("Error al obtener los reportes más antiguos:", err);
    }
  };

  const fetchOpen = async () => {
    try {
      const data = await getOpenReports(); // Asegúrate de tener esta función en tu servicio
      setReports(data);
    } catch (err) {
      console.error("Error al obtener los reportes abiertos:", err);
    }
  };

  const fetchClosed = async () => {
    try {
      const data = await getRecentlyResolved(); // Asegúrate de tener esta función en tu servicio
      setReports(data);
    } catch (err) {
      console.error("Error al obtener los reportes cerrados:", err);
    }
  };

  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.reportContainer}>
        <h1>Lista de Reportes</h1>
        <div className={styles.filterButtons}>
          <button onClick={fetchLatest}>Más recientes</button>
          <button onClick={fetchOldest}>Más antiguos</button>
          <button onClick={fetchOpen}>Abiertos</button>
          <button onClick={fetchClosed}>Cerrados</button>
        </div>

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
                <td>
                  {" "}
                  <span
                    className={`${styles.status} ${report.status === "open" ? styles.active : styles.closed}`}
                  >
                    {report.status === "open" ? "Activo" : "Cerrado"}
                  </span>
                </td>
                <td>{`${report.location.latitude}, ${report.location.longitude}`}</td>
                <td>{new Date(report.creationDate).toLocaleString()}</td>
                <td>
                  {" "}
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    onClick={() => handleEdit(report.id)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    onClick={() => handleDelete(report.id)}
                    style={{ cursor: "pointer" }}
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
