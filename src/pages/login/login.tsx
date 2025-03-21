import React, {useState} from 'react';
import {Form} from '../../components/ui/form/form';
import {Button} from '../../components/ui/button/button';
import {Input} from '../../components/ui/input/input';
import {Label} from '../../components/ui/label/label';
import styles from './login.module.scss';

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
                        <h1>Ingresa tu Información</h1>
                        <Label htmlFor="name">Tu Nombre:</Label>
                        <Input type="text" placeholder="Ingresa tu nombre aqui:" id="name"/>
                        <Label htmlFor="email">Tu Email:</Label>
                        <Input type="email" placeholder="Ingresa tu correo aqui:" id="registerEmail"/>
                        <Label htmlFor="password">Contraseña:</Label>
                        {/* Aquí debería existir algo para marcar si una contraseña no es segura.  */}
                        <Input type="password" placeholder="Ingresa una contraseña segura" id="registerPassword"/>
                        <Button type="submit">Registrarse</Button>
                    </Form>
                </div>
            )}

            {/* Formulario de Login */}
            {!isRegister && (
                <div className={`${styles['form-container']} ${styles['login-container']}`}>
                    <Form onSubmit={handleSubmit}>
                        <h1>Inicia Sesión</h1>
                        <Label htmlFor="email">Correo:</Label>
                        <Input type="email" placeholder="Ingresa tu correo" id="email"/>
                        <Label htmlFor="password">Contraseña:</Label>
                        <Input type="password" placeholder="Ingresa tu contraseña" id="password"/>
                        <Button type="submit">Iniciar Sesión</Button>
                    </Form>
                </div>
            )}

            {/* Panel de Overlay */}
            <div className={styles['overlay-container']}>
                <div className={styles['overlay']}>
                    <div
                        className={`${styles['overlay-panel']} ${isRegister ? styles['overlay-left'] : styles['overlay-right']}`}>
                        {isRegister ? (
                            <>
                                <h1 className={styles.title}>Crea una Cuenta</h1>
                                <p>¿Ya tienes una cuenta? Haz click abajo para iniciar sesión.</p>
                                <Button className={styles.ghost} onClick={() => setIsRegister(false)} id="login">Inicia
                                    Sesión</Button>
                            </>
                        ) : (
                            <>
                                <h1 className={styles.title}>City Lens</h1>
                                <p>¿Aun no tienes una cuenta? Haz click abajo para registrarte.</p>
                                <Button className={styles.ghost} onClick={() => setIsRegister(true)} id="register">Registrate
                                    Aquí</Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
