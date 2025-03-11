import React from "react";
import "./Button.scss";

interface ButtonProps {
    type?: "button" | "submit";
    children: React.ReactNode;
    onClick?: () => void;
    className?: string; // Nuevo prop para clases adicionales
    id?: string; // Agregamos id como opcional
  }
  


const Button: React.FC<ButtonProps> = ({
  type = "button",
  children,
  onClick,
  className = "",
  ...props // Por defecto vacío para evitar "undefined"
}) => {
  return (
    <button
      className={`button ${className}`.trim()}
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
