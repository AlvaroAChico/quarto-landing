import React, { useState } from "react"
import { InputWrapper, StyledInput, IconContainer } from "./textarea.styles"

interface InputProps {
  id?: string
  icon?: any
  type?: string
  placeholder?: string
  customStyles?: string
  rows?: number
  register?: any
  [key: string]: any
}

const Textarea: React.FC<InputProps> = ({
  id = "",
  placeholder = "",
  icon: Icon,
  type = "text",
  customStyles = "",
  rows = 5,
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
        rows={rows}
        {...register}
        {...props}
      />
    </InputWrapper>
  )
}

export default Textarea
