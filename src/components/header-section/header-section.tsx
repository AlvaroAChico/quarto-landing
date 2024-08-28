import React from "react"
import { ContainerHeader } from "./header-section.styles"
import Button from "../button/button"

interface IOwnProps {
  title: string
  subtitle?: string
  nameButton?: string
  onPrimaryClick?: () => void
}

const HeaderSection: React.FC<IOwnProps> = ({
  title,
  subtitle = "",
  nameButton = "",
  onPrimaryClick = () => console.log,
}) => {
  return (
    <ContainerHeader>
      <div>
        {/* <h2>{title}</h2> */}
        <p>{subtitle}</p>
      </div>
      <div>
        {!!nameButton && <Button text={nameButton} onClick={onPrimaryClick} />}
      </div>
    </ContainerHeader>
  )
}

export default HeaderSection
