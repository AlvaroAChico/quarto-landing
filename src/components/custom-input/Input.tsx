import React, { useState } from 'react';
import { InputWrapper, StyledInput, IconContainer } from './Input.styles';

interface InputProps {
    placeholder?:string;
    icon?:any;
    type?:string;
    toggleIcon?: any;
};

const Input: React.FC<InputProps> = ({placeholder, icon:Icon, type='text', toggleIcon: ToggleIcon}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);
    
    return (
        <InputWrapper>
            {Icon && (
                <IconContainer>
                    <Icon size="20" />
                </IconContainer>
            )}
            <StyledInput type={showPassword ? 'text' : type} placeholder={placeholder} />
            {type === 'password' && ToggleIcon && (
                <IconContainer onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <ToggleIcon.Hide size="20" /> : <ToggleIcon.Show size="20" />}
                </IconContainer>
            )}    
        </InputWrapper>
    );
};

export default Input;

// // src/components/dashboard-layout/common/input.tsx
// import React from 'react';
// import { StyledInput, InputContainer } from './Input.styles';

// interface InputProps {
//     type: string;
//     id: string;
//     placeholder?: string;
//     value?: string;
//     IconComponent?: React.ElementType; // Cambio aquí para evitar conflictos
//     onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const Input: React.FC<InputProps> = ({ type, id, placeholder, value, IconComponent, onChange }) => {
//     return (
//         <InputContainer>
//             {IconComponent && <IconComponent />} // Uso condicional del ícono
//             <StyledInput
//                 type={type}
//                 id={id}
//                 placeholder={placeholder}
//                 value={value}
//                 onChange={onChange}
//             />
//         </InputContainer>
//     );
// };

// export default Input;
