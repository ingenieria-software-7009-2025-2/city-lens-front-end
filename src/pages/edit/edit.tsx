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
    }, [token]);
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
		<h1>Editar informacion</h1>
              <Label htmlFor="name">Name:</Label>
              <Input type="text" placeholder={name} id="name" onChange={(e) => setName(e.target.value)} />
              <Label htmlFor="lastName">Last Name:</Label>
              <Input
                type="text"
                placeholder={lastName}
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Label htmlFor="email">Email:</Label>
              <Input type="email" placeholder={email} id="registerEmail" onChange={(e) => setEmail(e.target.value)} />
              {/* Mostrar error si existe */}
              {error && <p className={styles.error}>{error}</p>}
              <Button type="submit">Actualizar</Button>
            </Form>
          </div>

    </div>
	 );
	};
