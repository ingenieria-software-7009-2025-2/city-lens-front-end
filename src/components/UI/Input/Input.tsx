import React from "react";
import ".././assets/styles/input.scss";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: "primary" | "secondary";
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  variant = "primary",
}) => {
  return (
    <input
      className={`input ${variant}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
export { Input };
