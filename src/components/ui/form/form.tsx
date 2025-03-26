// components/ui/Form/Form.tsx
import React from "react";
import styles from "./form.module.scss";

/**
 * Formulario básico
 * @param onSubmit Función que se ejecuta al enviar el formulario.
 * @param children Contenido del formulario (inputs, labels, buttons, etc.).
 * @param className Clase opcional para personalizar estilos desde App.tsx.
 */
interface FormProps {
  onSubmit: (e: React.FormEvent) => void; // Función que se ejecuta al enviar el formulario
  children: React.ReactNode; // Contenido del formulario (inputs, labels, buttons, etc.)
  className?: string; // Clase opcional para personalizar estilos desde App.tsx
}

const Form: React.FC<FormProps> = ({ onSubmit, children, className }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`${styles.form} ${className || ""}`.trim()}
    >
      {children}
    </form>
  );
};

export default Form;
export { Form };
