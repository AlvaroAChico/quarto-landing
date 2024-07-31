// src/components/ui/Button/Button.tsx
import React from 'react';
import { StyledButton } from './Button.styles';

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', className}) => {
    return (
        <StyledButton onClick={onClick} type={type} className={className}>
            {children}
        </StyledButton>
    );
};

export default Button;
