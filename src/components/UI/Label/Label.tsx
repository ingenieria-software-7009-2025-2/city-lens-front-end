import React from "react";
import "./label.scss";

interface LabelProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  htmlFor?: string;
}

const Label: React.FC<LabelProps> = ({
  variant = "primary",
  children,
  htmlFor,
}) => {
  return (
    <label className={`label ${variant}`} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
export { Label };