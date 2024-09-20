import React, { useState } from "react"
import { InputWrapper, StyledInput, IconContainer } from "./input.styles"

interface InputProps {
  id?: string
  icon?: any
  type?: string
  toggleIcon?: any
  placeholder?: string
  customStyles?: string
  register?: any
  [key: string]: any
}

const Input: React.FC<InputProps> = ({
  id = "",
  placeholder = "",
  icon: Icon,
  type = "text",
  toggleIcon: ToggleIcon,
  customStyles = "",
  register,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <InputWrapper>
      {Icon && (
        <IconContainer>
          <Icon size="20" />
        </IconContainer>
      )}
      <StyledInput
        id={id}
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        {...register}
        {...props}
      />
      {type === "password" && ToggleIcon && (
        <IconContainer onClick={handleTogglePasswordVisibility}>
          {showPassword ? (
            <ToggleIcon.Hide size="20" />
          ) : (
            <ToggleIcon.Show size="20" />
          )}
        </IconContainer>
      )}
    </InputWrapper>
  )
}

export default Input
