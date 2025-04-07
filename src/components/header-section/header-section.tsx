import React from "react"
import { ContainerHeader } from "./header-section.styles"
import { useAppSelector } from "../../app/hooks"
import { getActionTitleApp } from "../../core/store/app-store/appSlice"

interface IOwnProps {
  title?: string
}

const HeaderSection: React.FC<IOwnProps> = ({ title = "" }) => {
  // const title = useAppSelector(getActionTitleApp)

  return (
    <ContainerHeader>
      <div>
        <h2>{title}</h2>
      </div>
    </ContainerHeader>
  )
}

export default HeaderSection
