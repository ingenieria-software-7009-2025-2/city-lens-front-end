import React from "react";
import "./input.scss";

/**
 * Input básico
 * @param type Tipo de input. "text" por defecto.
 * @param placeholder Texto de marcador de posición.
 * @param value Valor del input.
 * @param onChange Función que se ejecuta al cambiar el valor del input.
 * @param variant Variante. "primary" por defecto.
 * @param className Clase opcional para personalización.
 * @param props Propiedades adicionales del input (id, name, etc.).
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "primary" | "secondary";
  className?: string; // Clase opcional para personalización
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  variant = "primary",
  className,
  ...props
}) => {
  return (
    <input
      className={`input ${variant} ${className || ""}`.trim()}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props} // <-- Esto permite usar `id`, `name`, etc. directamente
    />
  );
};

export default Input;
export { Input };
