import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Input, Label } from "./../../components/ui";
import styles from "./createReport.module.scss";
import Nav from "../../components/Layout/Nav/nav";
import { ReportContext } from "../../context/ReportContext";

export const CreateReport: React.FC = () => {
  const { createReport } = useContext(ReportContext); // Usar el contexto
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [direction, setdirection] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const reportData = {
        title,
        description,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        direction,
        municipality,
        zipcode: postalCode,
      };

      await createReport(reportData); // Llama a la función del contexto
      alert("Reporte creado correctamente.");

      // Limpiar el formulario
      setTitle("");
      setDescription("");
      setLatitude("");
      setLongitude("");
      setdirection("");
      setPostalCode("");
      setMunicipality("");
    } catch (error) {
      setError("Error al crear el reporte.");
      console.error("Error:", error);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error);
          setError("No se pudo obtener la ubicación actual.");
        },
      );
    } else {
      setError("La geolocalización no está soportada por este navegador.");
    }
  };

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
            onChange={(e) => setdirection(e.target.value)}
          />
          <Label htmlFor="postalCode">Código Postal:</Label>
          <Input
            type="text"
            id="postalCode"
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
