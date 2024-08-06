// src/components/ui/Button/Button.tsx
import React from 'react';
import { StyledButton } from './custom-button.styles';

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
}

const CustomButton: React.FC<ButtonProps> = ({ children, onClick, type = 'button', className}) => {
    return (
        <StyledButton onClick={onClick} type={type} className={className}>
            {children}
        </StyledButton>
    );
};

export default CustomButton;
