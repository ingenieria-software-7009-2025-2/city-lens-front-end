import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Input, Label } from './../../components/ui';
import styles from './editReport.module.scss';
import Nav from '../../components/Layout/Nav/nav';
import { ReportContext } from '../../context/ReportContext';
import { useNavigate, useParams } from 'react-router-dom';

export const EditReport: React.FC = () => {
  const { updateReport, reports, fetchReports } = useContext(ReportContext); // OJO: fetchReports sí se usa
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'open' | 'closed'>('open'); // Estado inicial 'open'
  const [resolutionDate, setResolutionDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const cargarReporte = async () => {
      if (reports.length === 0) {
        await fetchReports(); // 👈 cargar los reportes si no hay
      }
      const report = reports.find((r) => r.id === id);
      if (report) {
        setTitle(report.title || '');
        setDescription(report.description || '');
        setStatus(report.status === 'closed' ? 'closed' : 'open'); // Ajustado para 'open' y 'closed'
        setResolutionDate(report.resolutionDate || '');
        setError(null);
      } else {
        setError('Reporte no encontrado.');
      }
      setLoading(false);
    };

    cargarReporte();
  }, [reports, id, fetchReports]);

  const handleStatusToggle = () => {
    setStatus((prev) => (prev === 'open' ? 'closed' : 'open')); // Cambia entre 'open' y 'closed'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (!id) {
        setError('ID de reporte inválido.');
        return;
      }

      const updatedData = {
        id,
        title,
        description,
        status,
        resolutionDate,
      };

      await updateReport(updatedData);
      alert('Reporte actualizado correctamente.');
      navigate('/menu');
    } catch (error) {
      setError('Error al actualizar el reporte.');
    }
  };

  if (loading) {
    return (
      <div className={styles.container} id="container">
        <Nav />
        <p>Cargando reporte...</p>
      </div>
    );
  }

  return (
    <div className={styles.container} id="container">
      <Nav />
      <div className={`${styles['form-container']} ${styles['register-container']}`}>
        <Form onSubmit={handleSubmit}>
          <h1>Editar Reporte</h1>

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

          <Label>Estado:</Label>
          <button
            type="button"
            onClick={handleStatusToggle}
            className={status === 'open' ? styles.closed : styles.open} 
          >
            {status === 'open' ? 'Abierto' : 'Cerrado'} {/* Cambié el texto */}
          </button>

          <Label htmlFor="resolutionDate">Fecha de Resolución:</Label>
          <Input
            type="text"
            id="resolutionDate"
            value={resolutionDate}
            onChange={(e) => setResolutionDate(e.target.value)}
          />

          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit">Actualizar Reporte</Button>
        </Form>
      </div>
    </div>
  );
};
