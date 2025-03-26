import React from 'react';
import styles from './menu.module.scss';
import {Button} from './../../components/ui';
import { Nav } from '../../components/Layout/Nav/nav';
import img from "../../assets/images/city_map.png"
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
                        CityLens es una plataforma integral de gestión de incidentes urbanos que permite a los residentes reportar problemas como baches, alumbrado público defectuoso, calles en mal estado y más. A través de CityLens, los ciudadanos pueden identificar necesidades de reparación, compartir comentarios y comunicarse directamente con las autoridades locales. 
                        </p>
                    </div>
                    <div className={styles.footerText}>
                        <p>
                            The result is collaborative experiences between governments and residents that co-create clean,
                            safe, and happy communities.
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className={styles.right}>
                    <img
                        src={img}
                        alt="Placeholder"
                        className={styles.image}
                    />
                </div>
            </div>
        </div>


    );
};