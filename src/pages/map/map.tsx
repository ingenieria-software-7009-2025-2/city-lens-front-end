import React, { useEffect, useState } from "react";
import styles from "./map.module.scss";
import { Nav } from "../../components/Layout/Nav/nav";
import { getUserInfo as fetchUserInfo } from "../../api/services/auth";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { LatLng } from "leaflet"; // 👈 Importación necesaria
import "leaflet/dist/leaflet.css";

/** Componente para detectar y marcar la ubicación actual */
function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null); // 👈 Tipado correcto

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
      <Popup>You are here</Popup>
    </Marker>
  );
}

export const Mapa: React.FC = () => {
  const [userName, setUserName] = useState("");

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

  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.mapWrapper}>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%", borderRadius: "30px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
};
