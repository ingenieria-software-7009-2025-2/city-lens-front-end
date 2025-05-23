import React, { useEffect, useState } from "react";
import styles from "./menu.module.scss";
import cityMap from "../../assets/images/city_map.png";
import { Nav } from "../../components/Layout/Nav/nav";
import { getUserInfo as fetchUserInfo } from "../../api/services/auth"; // Importar la función directamente

/**
 * Componente funcional que representa el menú principal de la aplicación.
 * Muestra un saludo personalizado al usuario y un diseño de cuadrícula con diferentes secciones.
 * Obtiene la información del usuario desde un servicio de autenticación.
 */
export const Menu: React.FC = () => {
  // Estado para almacenar el nombre del usuario
  const [userName, setUserName] = useState("");

  /**
   * Efecto que se ejecuta al montar el componente.
   * Llama a la función `fetchUserInfo` para obtener la información del usuario
   * y actualiza el estado con el nombre del usuario.
   */
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        console.log("Llamando a fetchUserInfo directamente...");
        const userInfo = await fetchUserInfo();
        console.log("UserInfo recibido:", userInfo);
        setUserName(userInfo.firstName || "");
      } catch (error) {
        console.error("Error al obtener el nombre del usuario:", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <Nav />

      {/* Grid Content */}
      <div className={styles.gridContainer}>
        <div className={styles.div1}>Hola {userName}</div>
        <div className={styles.div2}>Div 2</div>
        <div className={styles.div3}>Div 3</div>
        <div className={styles.div4}>Div 4</div>
        <div className={styles.div5}>Div 5</div>
        <div className={styles.div6}>Div 6 </div>
        <div className={styles.div14}>
          <img src={cityMap} alt="City Map" />
        </div>
        <div className={styles.div15}>15</div>
      </div>
    </div>
  );
};
