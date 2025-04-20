import React, { useContext, useEffect, useState } from 'react';
import styles from './menu.module.scss';

import { Nav } from '../../components/Layout/Nav/nav';
import { AuthContext } from '../../context/AuthContext';

export const Menu: React.FC = () => {
    const { getUserInfo } = useContext(AuthContext);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const userInfo = await getUserInfo();
                setUserName(userInfo.firstName || '');
            } catch (error) {
                console.error('Error al obtener el nombre del usuario:', error);
            }
        };

        fetchUserName();
    }, [getUserInfo]);

    return (
        <div className={styles.container}>
            {/* Header */}
            <Nav></Nav>

            {/* Grid Content */}
            <div className={styles.gridContainer}>
                <div className={styles.div1}>Hola {userName}</div>
                <div className={styles.div2}>Div 2</div>
                <div className={styles.div3}>Div 3</div>
                <div className={styles.div4}>DIv 4</div>
                <div className={styles.div5}>Div 5</div>
                <div className={styles.div6}>div 6</div>
                <div className={styles.div14}>Div 7</div>
                <div className={styles.div15}>Div 8</div>
                <div className={styles.div16}>Div 9</div>
            </div>
        </div>
    );
};

