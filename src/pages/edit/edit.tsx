import React, { useContext, useState,useEffect } from 'react';
import {Button, Form, Input, Label} from './../../components/ui';
import styles from './edit.module.scss';
import { getUserInfo, updateUserInfo } from '../../api'; 

import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario
import { AuthContext } from '../../context/AuthContext';
export const Edit: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null); 
  const navigate = useNavigate(); 
  const { token } = useContext(AuthContext);
   useEffect(() => {
      const fetchUserData = async () => {
        try {
          if (!token) {
            setError('No se encontró un token de autenticación.');
            navigate('/'); // Redirige al login si no hay token
            return;
          }
  
          const userData = await getUserInfo(token); // Llama a la API para obtener los datos del usuario
          setName(userData.first_name || '');
          setLastName(userData.last_name || '');
          setEmail(userData.email || '');
        } catch (error) {
          setError('Error al cargar los datos del usuario.');
          console.error('Error:', error);
        }
      };
  
      fetchUserData();
    }, [token, navigate]);
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
  
      try {
        if (!token) {
          setError('No se encontró un token de autenticación.');
          return;
        }
  
        // Actualizar la información del usuario
        await updateUserInfo(token, { first_name: name, last_name: lastName, email });
        alert('Información actualizada correctamente.');
        navigate('/menu'); // Redirigir después de la actualización
      } catch (error) {
        setError('Error al actualizar la información del usuario.');
        console.error('Error:', error);
      }
    };


  return (
      <div className={`${styles.container} ${isRegister ? styles['right-panel-active'] : ''}`} id="container">
	    {/* Formulario de Register */}
         
          <div className={`${styles['form-container']} ${styles['register-container']}`}>
            <Form onSubmit={handleSubmit}>
              <h1>Editar información</h1>
              <Label htmlFor="name">Nombre:</Label>
              <Input
                type="text"
                id="name"
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
              <Label htmlFor="lastName">Apellido:</Label>
              <Input
                type="text"
                id="lastName"
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)}
              />
              <Label htmlFor="email">Correo electrónico:</Label>
              <Input
                type="email"
                id="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className={styles.error}>{error}</p>}
              <Button type="submit">Actualizar</Button>
            </Form>
          </div>

    </div>
	 );
	};
