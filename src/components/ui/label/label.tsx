import React from "react";
import "./label.scss";

/**
 * Label Básico
 * @param variant Variante del label. "primary" por default.
 * @param children Contenido del label.
 * @param htmlFor ID del elemento input asociado al label.
 * @param className Clase CSS opcional para estilizar.
 */
interface LabelProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  htmlFor?: string;
  className?: string; // Clase opcional para personalización
}

const Label: React.FC<LabelProps> = ({
  variant = "primary",
  children,
  htmlFor,
  className,
}) => {
  return (
    <label
      className={`label ${variant} ${className || ""}`.trim()}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default Label;
export { Label };
