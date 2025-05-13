import React, { useEffect, useState } from "react";
import styles from "./map.module.scss";
import { Nav } from "../../components/Layout/Nav/nav";
import { ReportOutputBody } from "../../api/models/report";
import { getUserInfo as fetchUserInfo } from "../../api/services/auth";
import { getLatestReports } from "../../api/services/report";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";

/** Componente para detectar y marcar la ubicación actual */
function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Tu ubicación actual</Popup>
    </Marker>
  );
}

export const Mapa: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [reports, setReports] = useState<ReportOutputBody[]>([]);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userInfo = await fetchUserInfo();
        setUserName(userInfo.firstName || "");
      } catch (error) {
        console.error("Error al obtener el nombre del usuario:", error);
      }
    };
    fetchUserName();
  }, []);

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

  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.mapWrapper}>
        <MapContainer
          center={[19.4326, -99.1332]} // Ciudad de México como punto inicial
          zoom={13}
          scrollWheelZoom={false}
          style={{
            height: "100%",
            width: "99%",
            borderRadius: "30px",
            marginLeft: "auto",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marcador de la ubicación actual */}
          <LocationMarker />
          {/* Marcadores de los reportes */}
          {reports.map((report) => (
            <React.Fragment key={report.id}>
              <p>{report.id}</p>
              <Marker
                position={[report.location.latitude, report.location.longitude]}
              >
                <Popup>
                  <strong>{report.title}</strong>
                  <br />
                  {report.description}
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
