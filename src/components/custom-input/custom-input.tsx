import React, { useState } from "react"
import { InputWrapper, StyledInput, IconContainer } from "./custom-input.styles"

interface InputProps {
  placeholder?: string
  icon?: any
  type?: string
  toggleIcon?: any
}

const CustomInput: React.FC<InputProps> = ({
  placeholder,
  icon: Icon,
  type = "text",
  toggleIcon: ToggleIcon,
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
        type={showPassword ? "text" : type}
        placeholder={placeholder}
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

export default CustomInput
