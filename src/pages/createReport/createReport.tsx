import React, { useState } from 'react';
import { Button, Form, Input, Label } from './../../components/ui';
import styles from './createReport.module.scss';

export const CreateReport: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Aquí se enviaría la información del reporte al backend
      const reportData = {
        title,
        description,
        latitude,
        longitude,
        address,
        postalCode,
        municipality,
      };

      console.log('Reporte creado:', reportData);
      alert('Reporte creado correctamente.');

      // Limpiar el formulario
      setTitle('');
      setDescription('');
      setLatitude('');
      setLongitude('');
      setAddress('');
      setPostalCode('');
      setMunicipality('');
    } catch (error) {
      setError('Error al crear el reporte.');
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container} id="container">
      <div className={`${styles['form-container']} ${styles['register-container']}`}>
        <Form onSubmit={handleSubmit}>
          <h1>Crear Reporte</h1>
          <Label htmlFor="title">Título:</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label htmlFor="description">Descripción:</Label>
          <Input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Label htmlFor="latitude">Latitud:</Label>
          <Input
            type="text"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <Label htmlFor="longitude">Longitud:</Label>
          <Input
            type="text"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <Label htmlFor="address">Dirección:</Label>
          <Input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Label htmlFor="postalCode">Código Postal:</Label>
          <Input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <Label htmlFor="municipality">Municipio:</Label>
          <Input
            type="text"
            id="municipality"
            value={municipality}
            onChange={(e) => setMunicipality(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit">Crear Reporte</Button>
        </Form>
      </div>
    </div>
  );
};