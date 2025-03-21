import React from "react";
import "./label.scss";

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
        <label className={`label ${variant} ${className || ''}`.trim()} htmlFor={htmlFor}>
            {children}
        </label>
    );
};

export default Label;
export {Label};