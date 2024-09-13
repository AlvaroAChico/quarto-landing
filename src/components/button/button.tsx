// src/components/ui/Button/Button.tsx
import React from "react"
import { LoaderStyles, StyledButton } from "./button.styles"

interface ButtonProps {
  //   children?: React.ReactNode
  onClick: () => void
  type?: "button" | "submit" | "reset"
  className?: string
  text: string
  isLoading?: boolean
  IconLeft?: any
  IconRight?: any
  customStyles?: any
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
}) => {
  const handleClick = React.useCallback(() => {
    if (!isLoading) {
      onClick()
    }
  }, [isLoading])

  return (
    <StyledButton
      onClick={handleClick}
      type={type}
      className={className}
      customStyles={customStyles}
    >
      {!!IconLeft && <IconLeft />}
      {isLoading ? <LoaderStyles /> : <>{text}</>}
      {!!IconRight && <IconRight />}
    </StyledButton>
  )
}

export default Button
