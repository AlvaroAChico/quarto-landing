import React, { FC } from "react"
import { ButtonLoader, ContainerButton } from "./custom-button.styles"

interface IOwnProps {
  IconLeft?: any
  IconRight?: any
  type?: "button" | "reset" | "submit"
  style?: "PRIMARY" | "SECONDARY"
  isLoading?: boolean
  customStyles?: any
  text: string
  onClick: () => void
}

const CustomButton: FC<IOwnProps> = ({
  IconLeft,
  IconRight,
  type = "button",
  style = "PRIMARY",
  isLoading = false,
  customStyles = "",
  text,
  onClick,
}) => {
  const handleClick = React.useCallback(() => {
    if (!isLoading) {
      onClick()
    }
  }, [isLoading])

  const getHoverColor = (hex: string): string => {
    hex = hex.replace("#", "")

    const r = parseInt(hex.substring(0, 2), 16) - 50
    const g = parseInt(hex.substring(2, 4), 16) - 50
    const b = parseInt(hex.substring(4, 6), 16) - 50

    return `rgba(${r}, ${g}, ${b}, 1)`
  }

  return (
    <ContainerButton
      onClick={handleClick}
      $isLoading={isLoading}
      $style={style}
      $customStyle={customStyles}
      type={type}
    >
      {!!IconLeft && !isLoading && <IconLeft />}
      {isLoading ? <ButtonLoader /> : <>{text}</>}

      {!!IconRight && !isLoading && <IconRight />}
    </ContainerButton>
  )
}

export default CustomButton
