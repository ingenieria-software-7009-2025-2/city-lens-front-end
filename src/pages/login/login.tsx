import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Input, Label } from './../../components/ui';
import styles from './login.module.scss';
import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario
import { AuthContext } from '../../context/AuthContext';

export const Login: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para redirección
  const { login: authLogin, register: authRegister } = useContext(AuthContext);

  // Limpia los campos al montar el componente
  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  // Redirige al menú si el token aún existe
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/menu');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validar que los campos no estén vacíos
    if (isRegister) {
      if (!name || !lastName || !email || !password) {
        setError('Por favor, completa todos los campos.');
        return;
      }
    } else {
      if (!email || !password) {
        setError('Por favor, completa todos los campos.');
        return;
      }
    }

    try {
      if (isRegister) {
        // Lógica de registro
        await authRegister({ firstName: name, lastName, email, password });
        alert('Registro exitoso. Por favor, inicia sesión.');
        setIsRegister(false); // Cambiar al formulario de login después del registro
      } else {
        // Lógica de login
        await authLogin(email, password);
        alert('Inicio de sesión exitoso.');
        navigate('/menu'); // Redirige al menú
      }
    } catch (error) {
      setError('Error en el proceso. Por favor, inténtalo de nuevo.'); // Mostrar mensaje de error
      console.error('Error:', error);
    }
  };

  return (
    <div className={`${styles.container} ${isRegister ? styles['right-panel-active'] : ''}`} id="container">
      {/* Formulario de Register */}
      {isRegister && (
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
      )}

      {/* Formulario de login */}
      {!isRegister && (
        <div className={`${styles['form-container']} ${styles['login-container']}`}>
          <Form onSubmit={handleSubmit}>
            <h1>Login here</h1>
            <Label htmlFor="email">Email:</Label>
            <Input type="email" placeholder="Enter your email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Label htmlFor="password">Password:</Label>
            <Input type="password" placeholder="Enter your password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {/* Mostrar error si existe */}
            {error && <p className={styles.error}>{error}</p>}
            <Button type="submit">Login</Button>
          </Form>
        </div>
      )}

      {/* Panel de Overlay */}
      <div className={styles['overlay-container']}>
        <div className={styles['overlay']}>
          <div className={`${styles['overlay-panel']} ${isRegister ? styles['overlay-left'] : styles['overlay-right']}`}>
            {isRegister ? (
              <>
                <h1 className={styles.title}>Start Now!</h1>
                <p>Register now to join our community</p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsRegister(false); // Cambiar al formulario de login
                  }}
                  id="login"
                >
                  Login
                </Button>
              </>
            ) : (
              <>
                <h1 className={styles.title}>Start Now!</h1>
                <p>Register now to join our community</p>
                <Button variant="secondary" onClick={() => setIsRegister(true)} id="register">
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
