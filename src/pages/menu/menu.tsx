import React, { useEffect, useState } from "react";
import styles from "./menu.module.scss";
import { Nav } from "../../components/Layout/Nav/nav";
import { getUserInfo as fetchUserInfo } from "../../api/services/auth";
import { getLatestReports, getOpenReports } from "../../api/services/report";
import { ReportOutputBody } from "../../api/models/report";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/**
 * Componente funcional que representa el menú principal de la aplicación.
 * Muestra un saludo personalizado al usuario y un diseño de cuadrícula con diferentes secciones.
 * Obtiene la información del usuario desde un servicio de autenticación.
 */
export const Menu: React.FC = () => {
  // Estado para almacenar el nombre del usuario
  const [userName, setUserName] = useState("");
  // Estado para almacenar los reportes más recientes
  const [latestReports, setLatestReports] = useState<ReportOutputBody[]>([]);
  // Estado para almacenar los reportes abiertos
  const [openReports, setOpenReports] = useState<ReportOutputBody[]>([]);

  /**
   * Efecto que se ejecuta al montar el componente.
   * Llama a la función `fetchUserInfo` para obtener la información del usuario
   * y actualiza el estado con el nombre del usuario.
   */
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        console.log("Llamando a fetchUserInfo directamente...");
        const userInfo = await fetchUserInfo();
        console.log("UserInfo recibido:", userInfo);
        setUserName(userInfo.firstName || "");
      } catch (error) {
        console.error("Error al obtener el nombre del usuario:", error);
      }
    };

    fetchUserName();
  }, []);

  /**
   * Efecto que se ejecuta al montar el componente.
   * Llama a la función `getLatestReports` para obtener los reportes más recientes
   * y actualiza el estado con los reportes obtenidos.
   */
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reports = await getLatestReports();
        setLatestReports(reports); // Actualiza el estado con los reportes más recientes
      } catch (error) {
        console.error("Error al obtener los reportes más recientes:", error);
      }
    };

    fetchReports();
  }, []);

  /**
   * Efecto que se ejecuta al montar el componente.
   * Llama a la función `getOpenReports` para obtener los reportes abiertos
   * y actualiza el estado con los reportes obtenidos.
   */
  useEffect(() => {
    const fetchOpenReports = async () => {
      try {
        const reports = await getOpenReports();
        setOpenReports(reports); // Actualiza el estado con los reportes abiertos
      } catch (error) {
        console.error("Error al obtener los reportes abiertos:", error);
      }
    };

    fetchOpenReports();
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <Nav />

      {/* Grid Content */}
      <div className={styles.gridContainer}>
        <div className={styles.div1}>Hola {userName}</div>

        {/* Mostrar los reportes más recientes en los divs */}
        <div className={styles.div2}>
          {latestReports[0] ? (
            <>
              <h3>{latestReports[0].title}</h3>
              <p>{latestReports[0].description}</p>

              <span
                className={
                  latestReports[0].status === "open"
                    ? styles.active
                    : styles.closed
                }
              >
                {latestReports[0].status === "open" ? "Activo" : "Cerrado"}
              </span>
            </>
          ) : (
            <p>No hay reportes recientes.</p>
          )}
        </div>

        <div className={styles.div3}>
          {latestReports[1] ? (
            <>
              <h3>{latestReports[1].title}</h3>
              <p>{latestReports[1].description}</p>

              <span
                className={
                  latestReports[1].status === "open"
                    ? styles.active
                    : styles.closed
                }
              >
                {latestReports[1].status === "open" ? "Activo" : "Cerrado"}
              </span>
            </>
          ) : (
            <p>No hay reportes recientes.</p>
          )}
        </div>

        <div className={styles.div4}>
          {latestReports[2] ? (
            <>
              <h3>{latestReports[2].title}</h3>
              <p>{latestReports[2].description}</p>

              <span
                className={
                  latestReports[2].status === "open"
                    ? styles.active
                    : styles.closed
                }
              >
                {latestReports[2].status === "open" ? "Activo" : "Cerrado"}
              </span>
            </>
          ) : (
            <p>No hay reportes recientes.</p>
          )}
        </div>

        <div className={styles.div5}>
          {latestReports[3] ? (
            <>
              <h3>{latestReports[3].title}</h3>
              <p>{latestReports[3].description}</p>

              <span
                className={
                  latestReports[3].status === "open"
                    ? styles.active
                    : styles.closed
                }
              >
                {latestReports[3].status === "open" ? "Activo" : "Cerrado"}
              </span>
            </>
          ) : (
            <p>No hay reportes recientes.</p>
          )}
        </div>

        {/* Mostrar reportes abiertos en div6 */}
        <div className={styles.div6}>
          <h3>Reportes Abiertos</h3>
          {openReports.length > 0 ? (
            openReports.slice(0, 3).map((report, index) => (
              <div key={index} className={styles.reportItem}>
                <h4>{report.title}</h4>
                <p
                  className={
                    report.status === "open" ? styles.active : styles.closed
                  }
                >
                  {report.status === "open" ? "Activo" : "Cerrado"}
                </p>
              </div>
            ))
          ) : (
            <p>No hay reportes abiertos.</p>
          )}
        </div>

        <div className={styles.div14}>
          <MapContainer
            center={[19.4326, -99.1332]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%", borderRadius: "20px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[19.4326, -99.1332]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};
