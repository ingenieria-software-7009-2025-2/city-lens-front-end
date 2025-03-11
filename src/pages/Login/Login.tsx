import React, { useState } from 'react';
import { Form } from '../../components/UI/Form/Form';
import { Button } from '../../components/UI/Button/Button';
import { Input } from '../../components/UI/Input/Input';
import { Label } from '../../components/UI/Label/Label';
import styles from './Login.module.scss';

export const Login: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isRegister ? 'Register form submitted' : 'Login form submitted');
  };

  return (
    <div className={`${styles.container} ${isRegister ? styles['right-panel-active'] : ''}`} id="container">
      {/* Formulario de Register */}
      {isRegister && (
        <div className={`${styles['form-container']} ${styles['register-container']}`}>
          <Form onSubmit={handleSubmit}>
            <h1>Register here</h1>
            <Label htmlFor="name">Name:</Label>
            <Input type="text" placeholder="Enter your name" id="name" />
            <Label htmlFor="email">Email:</Label>
            <Input type="email" placeholder="Enter your email" id="registerEmail" />
            <Label htmlFor="password">Password:</Label>
            <Input type="password" placeholder="Enter your password" id="registerPassword" />
            <Button type="submit">Register</Button>
          </Form>
        </div>
      )}

      {/* Formulario de Login */}
      {!isRegister && (
        <div className={`${styles['form-container']} ${styles['login-container']}`}>
          <Form onSubmit={handleSubmit}>
            <h1>Login here</h1>
            <Label htmlFor="email">Email:</Label>
            <Input type="email" placeholder="Enter your email" id="email" />
            <Label htmlFor="password">Password:</Label>
            <Input type="password" placeholder="Enter your password" id="password" />
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
                <Button onClick={() => setIsRegister(false)} id="login">Login</Button>
              </>
            ) : (
              <>
                <h1 className={styles.title}>Start Now!</h1>
                <p>Register now to join our community</p>
                <Button className={styles.ghost} onClick={() => setIsRegister(true)} id="register">Register</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
