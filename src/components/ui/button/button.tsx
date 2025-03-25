import React from "react";
import "./button.scss";

/**
 * Botón básico
 * @param type Tipo de botón. "button" por defecto.
 * @param variant Variante. "primary" por defecto.
 * @param children Contenido del botón.
 * @param onClick Función a realizar al hacer clic en el botón.
 * @param className Clase CSS adicional para el botón.
 * @param id Id opcional del botón.
 */
interface ButtonProps {
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  id?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  children,
  onClick,
  className = "",
  ...props // Por defecto vacío para evitar "undefined"
}) => {
  return (
    <button
      className={`button ${variant} ${className}`.trim()}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
export { Button };
