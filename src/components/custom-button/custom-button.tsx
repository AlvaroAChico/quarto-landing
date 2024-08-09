// src/components/ui/Button/Button.tsx
import React from "react"
import { LoaderStyles, StyledButton } from "./custom-button.styles"

interface ButtonProps {
  //   children?: React.ReactNode
  onClick: () => void
  type?: "button" | "submit" | "reset"
  className?: string
  text: string
  isLoading?: boolean
}

const CustomButton: React.FC<ButtonProps> = ({
  onClick,
  type = "button",
  className,
  text,
  isLoading = false,
}) => {
  const handleClick = React.useCallback(() => {
    if (!isLoading) {
      onClick()
    }
  }, [isLoading])

  return (
    <StyledButton onClick={handleClick} type={type} className={className}>
      {isLoading ? <LoaderStyles /> : <>{text}</>}
    </StyledButton>
  )
}

export default CustomButton
