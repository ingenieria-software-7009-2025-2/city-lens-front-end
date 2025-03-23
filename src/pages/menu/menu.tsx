import React from 'react';
import styles from './menu.module.scss';
import {Button} from './../../components/ui';

export const Menu: React.FC = () => {
    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.logo}>SeeClickFix</div>
                <div className={styles.buttons}>
                    <Button className={styles.button}>Resident Sign Up</Button>
                    <Button className={styles.button}>Administrator Sign Up</Button>
                </div>
            </div>

            {/* Content */}
            <div className={styles.content}>
                {/* Left Section */}
                <div className={styles.left}>
                    <div className={styles.textBox}>
                        <h2>Create an Account</h2>
                        <p>
                            SeeClickFix 311CRM by CivicPlus is a 311 solution that empowers residents to report issues,
                            identify repair needs, share feedback, and ask questions of their local government leaders.
                            For local governments, it powers efficient and transparent workflows, fostering accountability
                            and trust.
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
                        src="../../assets/images/city2.jpg"
                        alt="Placeholder"
                        className={styles.image}
                    />
                </div>
            </div>
        </div>
    );
};
