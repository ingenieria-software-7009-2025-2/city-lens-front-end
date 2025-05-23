import React, { useContext, useState, useEffect } from "react";
import { Button, Form, Input, Label } from "./../../components/ui";
import styles from "./edit.module.scss";
import { useNavigate } from "react-router-dom"; // Para redirigir al usuario
import { AuthContext } from "../../context/AuthContext";

/**
 * Componente funcional para editar la información del usuario.
 * Permite al usuario actualizar su nombre, apellido y correo electrónico.
 * Utiliza el contexto `AuthContext` para obtener y actualizar los datos del usuario.
 */
export const Edit: React.FC = () => {
  // Estados para manejar los valores del formulario
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { getUserInfo, updateUserInfo } = useContext(AuthContext);

  /**
   * Efecto para cargar los datos del usuario al montar el componente.
   * Llama a la función `getUserInfo` del contexto para obtener los datos del usuario.
   * Redirige al login en caso de error.
   */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserInfo(); // Llama a la función getUserInfo del AuthContext
        setName(userData.firstName || "");
        setLastName(userData.lastName || "");
        setEmail(userData.email || "");
      } catch (error) {
        setError("Error al cargar los datos del usuario.");
        console.error("Error:", error);
        navigate("/"); // Redirige al login si ocurre un error
      }
    };

    fetchUserData();
  }, [getUserInfo, navigate]);

  /**
   * Maneja el envío del formulario.
   * Valida los datos y llama a la función `updateUserInfo` del contexto para actualizar la información del usuario.
   * Redirige al menú principal después de la actualización.
   * @param e Evento de envío del formulario.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Actualizar la información del usuario
      await updateUserInfo({
        firstName: name,
        lastName: lastName,
        email: email,
      });

      alert("Información actualizada correctamente.");
      navigate("/menu"); // Redirigir después de la actualización
    } catch (error) {
      setError("Error al actualizar la información del usuario.");
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container} id="container">
      <div
        className={`${styles["form-container"]} ${styles["register-container"]}`}
      >
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
