// src/components/ui/Button/Button.tsx
import React from "react"
import { LoaderStyles, StyledButton } from "./button.styles"

interface ButtonProps {
  onClick: () => void
  type?: "button" | "submit" | "reset"
  className?: string
  text: string
  isLoading?: boolean
  IconLeft?: any
  IconRight?: any
  customStyles?: any
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  type = "button",
  className,
  text,
  isLoading = false,
  IconLeft,
  IconRight,
  customStyles,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!isLoading) {
      onClick()
    }
  }

  return (
    <StyledButton
      onClick={handleClick}
      type={type}
      className={className}
      customStyles={customStyles}
      disabled={disabled}
    >
      {!!IconLeft && <IconLeft />}
      {isLoading ? <LoaderStyles /> : <>{text}</>}
      {!!IconRight && <IconRight />}
    </StyledButton>
  )
}

export default Button
