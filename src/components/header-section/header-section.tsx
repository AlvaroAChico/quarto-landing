import React from "react"
import { ContainerHeader } from "./header-section.styles"
import { FilterPermissionsDTO } from "../../core/models/interfaces/user-model"
import Button from "../button/button"
import { COOKIES_APP } from "../../constants/app"
import Cookies from "js-cookie"
import useDataUser from "../../utils/use-data-user"
import { Plus } from "styled-icons/boxicons-regular"

interface IOwnProps {
  title: string
  subtitle?: string
  nameButton?: string
  havePermissionCreate?: boolean
  onPrimaryClick?: () => void
}

const HeaderSection: React.FC<IOwnProps> = ({
  title,
  subtitle = "",
  nameButton = "",
  havePermissionCreate = false,
  onPrimaryClick = () => console.log,
}) => {
  return (
    <ContainerHeader>
      <div>
        {/* <h2>{title}</h2> */}
        <p>{subtitle}</p>
      </div>
      <div>
        {havePermissionCreate && (
          <Button text={nameButton} onClick={onPrimaryClick} IconLeft={Plus} />
        )}
      </div>
    </ContainerHeader>
  )
}

export default HeaderSection
