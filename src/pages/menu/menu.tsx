import React, { useEffect, useState } from "react";
import styles from "./menu.module.scss";
import cityMap from "../../assets/images/city_map.png";
import { Nav } from "../../components/Layout/Nav/nav";
import { getUserInfo as fetchUserInfo } from "../../api/services/auth"; // Importar la función directamente

export const Menu: React.FC = () => {
  const [userName, setUserName] = useState("");

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
