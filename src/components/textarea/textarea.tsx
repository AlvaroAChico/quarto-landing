import React, { useState } from "react"
import { InputWrapper, StyledInput, IconContainer } from "./textarea.styles"

interface InputProps {
  id?: string
  icon?: any
  type?: string
  placeholder?: string
  customStyles?: string
  props?: any
  rows?: number
}

const Textarea: React.FC<InputProps> = ({
  id = "",
  placeholder = "",
  icon: Icon,
  type = "text",
  customStyles = "",
  props,
  rows = 5,
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
        rows={rows}
        {...props}
      />
    </InputWrapper>
  )
}

export default Textarea
