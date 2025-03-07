import React from "react";
import ".././assets/styles/button.scss"

interface ButtonProps {
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  children,
  onClick,
}) => {
  return (
    <button className={`button ${variant}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
export { Button }; 