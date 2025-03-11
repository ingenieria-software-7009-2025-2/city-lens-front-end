// components/ui/Form/Form.tsx
import React from 'react';
import styles from './Form.module.scss';

interface FormProps {
  onSubmit: (e: React.FormEvent) => void; // Función que se ejecuta al enviar el formulario
  children: React.ReactNode; // Contenido del formulario (inputs, labels, buttons, etc.)
  className?: string; // Clase opcional para personalizar estilos desde App.tsx
}

const Form: React.FC<FormProps> = ({ onSubmit, children, className }) => {
  return (
    <form onSubmit={onSubmit} className={`${styles.form} ${className || ''}`.trim()}>
      {children}
    </form>
  );
};

export default Form;
export { Form };
