import React, { useContext, useState } from 'react';
import {Button, Form, Input, Label} from './../../components/ui';
import styles from './edit.module.scss';
import { login, register } from '../../api';
import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario
import { AuthContext } from '../../context/AuthContext';
export const Edit: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para redirección
  const { login: authLogin } = useContext(AuthContext);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpiar errores anteriores

    try {
      if (isRegister) {
        // Lógica de registro
        await register({ firstName: name, lastName, email, password });
        alert('Registro exitoso. Por favor, inicia sesión.');
        setIsRegister(false); // Cambiar al formulario de login después del registro
      } else {
        // Lógica de login
        const response = await login(email, password);
        authLogin(response.token);
        localStorage.setItem('token', response.token); 
        alert('login exitoso');
        navigate('/menu')
      }
    } catch (error) {
      setError('Error en el proceso. Por favor, inténtalo de nuevo.'); // Mostrar mensaje de error
      console.error('Error:', error);
    }
  };

  return (
      <div className={`${styles.container} ${isRegister ? styles['right-panel-active'] : ''}`} id="container">
		<h1>Editar informacion</h1>
	    {/* Formulario de Register */}
         
          <div className={`${styles['form-container']} ${styles['register-container']}`}>
            <Form onSubmit={handleSubmit}>
              <h1>Register here</h1>
              <Label htmlFor="name">Name:</Label>
              <Input type="text" placeholder="Enter your name" id="name" onChange={(e) => setName(e.target.value)} />
              <Label htmlFor="lastName">Last Name:</Label>
              <Input
                type="text"
                placeholder="Enter your last name"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Label htmlFor="email">Email:</Label>
              <Input type="email" placeholder="Enter your email" id="registerEmail" onChange={(e) => setEmail(e.target.value)} />
              <Label htmlFor="password">Password:</Label>
              <Input type="password" placeholder="Enter your password" id="registerPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
              {/* Mostrar error si existe */}
              {error && <p className={styles.error}>{error}</p>}
              <Button type="submit">Register</Button>
            </Form>
          </div>

    </div>
	 );
	};
