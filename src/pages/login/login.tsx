import React, { useState } from 'react';
import { Form } from '../../components/UI/Form/Form';
import { Button } from '../../components/UI/Button/Button';
import { Input } from '../../components/UI/Input/Input';
import { Label } from '../../components/UI/Label/Label';
import styles from './Login.module.scss';
import { login, register } from '../../api';
import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario

export const Login: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para redirección

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
        localStorage.setItem('token', response.token); // Guardar el token en localStorage
        alert('Inicio de Sesión Exitoso');
        navigate('/menu')
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
                <h1>Registrate Aquí</h1>
                <Label htmlFor="name">Nombre(s):</Label>
                <Input type="text" placeholder="Escribe tu(s) nombre(s)" id="name" onChange={(e) => setName(e.target.value)} />
                <Label htmlFor="lastName">Apellidos:</Label>
                <Input
                    type="text"
                    placeholder="Escribe tus apellidos"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <Label htmlFor="email">Email:</Label>
                <Input type="email" placeholder="Escribe el email para tu cuenta" id="registerEmail" onChange={(e) => setEmail(e.target.value)} />
                <Label htmlFor="password">Contraseña:</Label>
                <Input type="password" placeholder="Escribe la contraseña para tu cuenta" id="registerPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                {/* Mostrar error si existe */}
                {error && <p className={styles.error}>{error}</p>}
                <Button type="submit">Registrarse</Button>
              </Form>
            </div>
        )}

        {/* Formulario de Login */}
        {!isRegister && (
            <div className={`${styles['form-container']} ${styles['login-container']}`}>
              <Form onSubmit={handleSubmit}>
                <h1>¡Bienvenido!</h1>
                <Label htmlFor="email">Correo:</Label>
                <Input type="email" placeholder="Escribe tu correo" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Label htmlFor="password">Contraseña:</Label>
                <Input type="password" placeholder="Escribe tu contraseña" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {/* Mostrar error si existe */}
                {error && <p className={styles.error}>{error}</p>}
                <Button type="submit">Iniciar Sesión</Button>
              </Form>
            </div>
        )}

        {/* Panel de Overlay */}
        <div className={styles['overlay-container']}>
          <div className={styles['overlay']}>
            <div className={`${styles['overlay-panel']} ${isRegister ? styles['overlay-left'] : styles['overlay-right']}`}>
              {isRegister ? (
                  <>
                    <h1 className={styles.title}>¿Ya tienes una cuenta?</h1>
                    <p>Haz click aquí para iniciar sesión</p>
                    <Button
                        className={styles.ghost}
                        onClick={() => {
                          setIsRegister(false); // Cambiar al formulario de login
                        }}
                        id="login"
                    >
                      Iniciar Sesión
                    </Button>
                  </>
              ) : (
                  <>
                    <h1 className={styles.title}>¿Aun no tienes una cuenta?</h1>
                    <p>Haz click aquí para registrarte</p>
                    <Button className={styles.ghost} onClick={() => setIsRegister(true)} id="register">
                      Registrarse
                    </Button>
                  </>
              )}
            </div>
          </div>
        </div>
      </div>

  );
};