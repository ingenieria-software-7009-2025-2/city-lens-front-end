// components/ui/Form/Form.tsx
import React from 'react';
import styles from './Form.module.scss';


interface FormProps {
  onSubmit: (e: React.FormEvent) => void; // Función que se ejecuta al enviar el formulario
  children: React.ReactNode; // Contenido del formulario (inputs, labels, buttons, etc.)
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {children}
    </form>
  );
};


export default Form;
export { Form }; 