import React from "react";
import "./input.scss";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
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
      className={`input ${variant} ${className || ''}`.trim()}
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
