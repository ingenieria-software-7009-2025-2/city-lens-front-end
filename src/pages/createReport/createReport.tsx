import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Input, Label } from "./../../components/ui";
import styles from "./createReport.module.scss";
import Nav from "../../components/Layout/Nav/nav";
import { ReportContext } from "../../context/ReportContext";
import { reverseGeocode } from "../../api/services/geocoding";

/**
 * Componente funcional para crear un reporte.
 * Utiliza un formulario para capturar datos como título, descripción, ubicación, dirección, etc.
 * También utiliza el contexto `ReportContext` para enviar los datos del reporte.
 */
export const CreateReport: React.FC = () => {
  // Contexto para manejar la creación de reportes
  const { createReport } = useContext(ReportContext); // Usar el contexto

  // Estados para manejar los valores del formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [direction, setDirection] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [error, setError] = useState<string | null>(null);

  /**
   * Maneja el envío del formulario.
   * Valida los datos, los envía al contexto y limpia el formulario.
   * @param e Evento de envío del formulario.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Datos del reporte a enviar
      const reportData = {
        title,
        description,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        direction,
        municipality,
        zipcode: postalCode,
      };

      // Llama a la función del contexto para crear el reporte
      await createReport(reportData); // Llama a la función del contexto
      alert("Reporte creado correctamente.");

      // Limpiar el formulario
      setTitle("");
      setDescription("");
      setLatitude("");
      setLongitude("");
      setDirection("");
      setPostalCode("");
      setMunicipality("");
    } catch (error) {
      setError("Error al crear el reporte.");
      console.error("Error:", error);
    }
  };

  /**
   * Obtiene la ubicación actual del usuario utilizando la API de geolocalización del navegador.
   * Actualiza los estados de latitud y longitud con los valores obtenidos.
   */
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          setLatitude(lat.toString());
          setLongitude(lon.toString());

          try {
            const location = await reverseGeocode(lat, lon);
            setMunicipality(location.city); // Actualiza el municipio
            setDirection(`${location.suburb}, ${location.city}`); // Dirección completa
            setPostalCode(location.postalCode || ""); // Código postal
          } catch (error) {
            console.error("Error al obtener la ubicación:", error);
            setError("No se pudo obtener la ubicación actual.");
          }
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error);
          setError("No se pudo obtener la ubicación actual.");
        }
      );
    } else {
      setError("La geolocalización no está soportada por este navegador.");
    }
  };

  // Efecto para obtener la ubicación actual al cargar el componente
  useEffect(() => {
    handleGetCurrentLocation();
  }, []);

  return (
    <div className={styles.container} id="container">
      <Nav></Nav>
      <div
        className={`${styles["form-container"]} ${styles["register-container"]}`}
      >
        <Form onSubmit={handleSubmit}>
          <h1>Crear Reporte</h1>
          <Label htmlFor="title">Título:</Label>
          <Input
            type="text"
            id="title"
            value={title}
            placeholder="Ej: Bache en la calle principal"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label htmlFor="description">Descripción:</Label>
          <Input
            type="text"
            id="description"
            value={description}
            placeholder="Ej: Un bache grande que dificulta el tránsito"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Label htmlFor="latitude">Latitud:</Label>
          <Input
            type="text"
            id="latitude"
            value={latitude}
            placeholder="Ej: 19.432608"
            onChange={(e) => setLatitude(e.target.value)}
          />
          <Label htmlFor="longitude">Longitud:</Label>
          <Input
            type="text"
            id="longitude"
            value={longitude}
            placeholder="Ej: -99.133209"
            onChange={(e) => setLongitude(e.target.value)}
          />
          <Label htmlFor="adress">Dirección:</Label>
          <Input
            type="text"
            id="adress"
            value={direction}
            placeholder="Ej: Calle Reforma #123, Ciudad de México"
            onChange={(e) => setDirection(e.target.value)}
          />
          <Label htmlFor="postalCode">Código Postal:</Label>
          <Input
            type="text"
            value={postalCode}
            placeholder="Ej: 01000"
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <Label htmlFor="municipality">Municipio:</Label>
          <Input
            type="text"
            id="municipality"
            value={municipality}
            placeholder="Ej: Cuauhtémoc"
            onChange={(e) => setMunicipality(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit">Crear Reporte</Button>
        </Form>
      </div>
    </div>
  );
};
