import React from "react"
import { ContainerHeader } from "./header-section.styles"
import { FilterPermissionsDTO } from "../../core/models/interfaces/user-model"
import Button from "../button/button"
import { COOKIES_APP } from "../../constants/app"
import Cookies from "js-cookie"
import useDataUser from "../../utils/use-data-user"

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
  const [dataPermissions, setDataPermissions] =
    React.useState<FilterPermissionsDTO>()
  const { handleGetPermissions } = useDataUser()

  const getCookiesDataPermission = React.useCallback(() => {
    const data = handleGetPermissions()
    if (!!data) {
      setDataPermissions(data)
    }
  }, [handleGetPermissions])

  React.useEffect(() => {
    getCookiesDataPermission()
  }, [])

  return (
    <ContainerHeader>
      <div>
        {/* <h2>{title}</h2> */}
        <p>{subtitle}</p>
      </div>
      <div>
        {!!nameButton &&
          (
            dataPermissions || ({ user: [] } as unknown as FilterPermissionsDTO)
          ).user.includes("create") && (
            <Button text={nameButton} onClick={onPrimaryClick} />
          )}
      </div>
    </ContainerHeader>
  )
}

export default HeaderSection
