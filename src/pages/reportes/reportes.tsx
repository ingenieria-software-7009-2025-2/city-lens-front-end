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
import { ReportContext, useSearchReports } from "../../context/ReportContext";

export const Reportes: React.FC = () => {
  const [reports, setReports] = useState<ReportOutputBody[]>([]);
  const [zipcode, setZipcode] = useState(""); // Estado para el código postal
  const [ascending, setAscending] = useState(false); // Estado para el orden de búsqueda
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  const { deleteReport } = useContext(ReportContext);
  const searchReports = useSearchReports(); // Usar el hook para buscar reportes
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/editar/${id}`);
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getLatestReports();
        setReports(data);
      } catch (err) {
        console.error("Error al cargar reportes:", err);
      }
    };

    fetchReports();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteReport({ id });
      console.log(`Reporte con ID ${id} eliminado.`);
      setReports(reports.filter((report) => report.id !== id));
    } catch (err) {
      console.error("Error eliminando el reporte:", err);
    }
  };

  const fetchLatest = async () => {
    try {
      const data = await getLatestReports();
      setReports(data);
    } catch (err) {
      console.error("Error al obtener los reportes más recientes:", err);
    }
  };

  const fetchOldest = async () => {
    try {
      const data = await getOldestReports();
      setReports(data);
    } catch (err) {
      console.error("Error al obtener los reportes más antiguos:", err);
    }
  };

  const fetchOpen = async () => {
    try {
      const data = await getOpenReports();
      setReports(data);
    } catch (err) {
      console.error("Error al obtener los reportes abiertos:", err);
    }
  };

  const fetchClosed = async () => {
    try {
      const data = await getRecentlyResolved();
      setReports(data);
    } catch (err) {
      console.error("Error al obtener los reportes cerrados:", err);
    }
  };

  // Manejar la búsqueda de reportes
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!zipcode.trim()) {
      setError("El código postal no puede estar vacío.");
      return;
    }

    try {
      const data = await searchReports({ zipcode, ascending });
      setReports(data); // Actualiza la lista de reportes con los resultados de la búsqueda
    } catch (err) {
      console.error("Error al buscar reportes:", err);
      setError("No se pudieron obtener los reportes. Inténtalo de nuevo.");
    }
  };

  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.reportContainer}>
        <h1>Lista de Reportes</h1>
        <div className={styles.filters}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Código Postal"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                checked={ascending}
                onChange={(e) => setAscending(e.target.checked)}
              />
              Orden Ascendente
            </label>
            <button type="submit">Buscar</button>
          </form>
          <div className={styles.filterButtons}>
            <button onClick={fetchLatest}>Más recientes</button>
            <button onClick={fetchOldest}>Más antiguos</button>
            <button onClick={fetchOpen}>Abiertos</button>
            <button onClick={fetchClosed}>Cerrados</button>
          </div>
        </div>

        {error && <p className={styles.error}>{error}</p>}

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
                  <span
                    className={`${styles.status} ${
                      report.status === "open" ? styles.active : styles.closed
                    }`}
                  >
                    {report.status === "open" ? "Activo" : "Cerrado"}
                  </span>
                </td>
                <td>{`${report.location.latitude}, ${report.location.longitude}`}</td>
                <td>
                  {new Intl.DateTimeFormat("es-MX", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(report.creationDate))}
                </td>
                <td>
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
