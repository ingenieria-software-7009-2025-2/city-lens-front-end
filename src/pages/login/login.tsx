import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Input, Label } from "./../../components/ui";
import styles from "./login.module.scss";
import { login, register } from "../../api";
import { useNavigate } from "react-router-dom"; // Para redirigir al usuario
import { AuthContext } from "../../context/AuthContext";

export const Login: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para redirección
  const { login: authLogin } = useContext(AuthContext);

  // Limpia los campos al montar el componente
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  // Redirige al menú si el token aún existe
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/menu");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validar que los campos no estén vacíos
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      if (isRegister) {
        // Lógica de registro
        await register({ firstName: name, lastName, email, password });
        alert("Registro exitoso. Por favor, inicia sesión.");
        setIsRegister(false); // Cambiar al formulario de login después del registro
      } else {
        // Lógica de login
        const response = await login(email, password);
        authLogin(response.token); // Guarda el token en el contexto
        alert("Inicio de sesión exitoso.");
        navigate("/menu"); // Redirige al menú
      }
    } catch (error) {
      setError("Error en el proceso. Por favor, inténtalo de nuevo."); // Mostrar mensaje de error
      console.error("Error:", error);
    }
  };

  return (
    <div
      className={`${styles.container} ${isRegister ? styles["right-panel-active"] : ""}`}
      id="container"
    >
      {/* Formulario de Registro */}
      {isRegister && (
        <div
          className={`${styles["form-container"]} ${styles["register-container"]}`}
        >
          <Form onSubmit={handleSubmit}>
            <h1>¡Registrate!</h1>
            <Label htmlFor="name">Nombre(s):</Label>
            <Input
              type="text"
              placeholder="Escribe tu(s) nombre(s)"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <Label htmlFor="lastName">Apellidos:</Label>
            <Input
              type="text"
              placeholder="Escribe tus apellidos"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              placeholder="Escribe tu correo:"
              id="registerEmail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              placeholder="Ingresa tu contraseña"
              id="registerPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Mostrar error si existe */}
            {error && <p className={styles.error}>{error}</p>}
            <Button type="submit">Registrarse</Button>
          </Form>
        </div>
      )}

      {/* Formulario de login */}
      {!isRegister && (
        <div
          className={`${styles["form-container"]} ${styles["login-container"]}`}
        >
          <Form onSubmit={handleSubmit}>
            <h1>¡Bienvenido de Vuelta!</h1>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              placeholder="Escribe tu correo:"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label htmlFor="password">Contraseña:</Label>
            <Input
              type="password"
              placeholder="Ingresa tu contraseña:"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Mostrar error si existe */}
            {error && <p className={styles.error}>{error}</p>}
            <Button type="submit">Iniciar Sesión</Button>
          </Form>
        </div>
      )}

      {/* Panel de Overlay */}
      <div className={styles["overlay-container"]}>
        <div className={styles["overlay"]}>
          <div
            className={`${styles["overlay-panel"]} ${isRegister ? styles["overlay-left"] : styles["overlay-right"]}`}
          >
            {isRegister ? (
              <>
                <h1 className={styles.title}>¿Ya tienes una cuenta?</h1>
                {/* Probablemente hay una mejor manera de resaltar este texto */}
                <p>
                  {" "}
                  <strong> Haz click abajo para iniciar sesión </strong>
                </p>
                <Button
                  variant="secondary"
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
                <p>
                  <strong>Haz click abajo para unirte a City Lens</strong>
                </p>
                <Button
                  variant="secondary"
                  onClick={() => setIsRegister(true)}
                  id="register"
                >
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
