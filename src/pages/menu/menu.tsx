import React from "react";
import styles from "./menu.module.scss";
import { Nav } from "../../components/Layout/Nav/nav";
import img from "../../assets/images/city_map.png";

export const Menu: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <Nav></Nav>
      {/* Content */}
      <div className={styles.content}>
        {/* Left Section */}
        <div className={styles.left}>
          <div className={styles.textBox}>
            <h2>City Lens</h2>
            <p>
              City Lens es una plataforma integral de gestión de incidentes
              urbanos que permite a los residentes reportar problemas como
              baches, alumbrado público defectuoso, calles en mal estado y más.
              A través de City Lens, los ciudadanos pueden identificar
              necesidades de reparación, compartir comentarios y comunicarse
              directamente con las autoridades locales.
            </p>
          </div>
          <div className={styles.footerText}>
            <p>
              Este es un proyecto de Aperture Science.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.right}>
          <img src={img} alt="Placeholder" className={styles.image} />
        </div>
      </div>
    </div>
  );
};
