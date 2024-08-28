import React from "react"
import { useNavigate } from "react-router-dom"
import HeaderSection from "../../components/header-section/header-section"
import { pathRoutes } from "../../config/routes/path"
import axios from "axios"
import Cookies from "js-cookie"
import { COOKIES_APP } from "../../constants/app"
import { DataRoleResponse } from "../../core/models/interfaces/roles-model"
import { toast } from "sonner"
import {
  ClasicStylesTD,
  ContainerActions,
  ContainerBody,
  ContainerDropdown,
  ContainerHead,
  ContainerTable,
} from "../../config/theme/global-styles"
import { Ellipsis } from "@styled-icons/fa-solid/Ellipsis"

const Roles: React.FC = () => {
  const [listRoles, setListRoles] = React.useState<DataRoleResponse[]>([])
  const [dropdownVisible, setDropdownVisible] = React.useState<string | null>(
    null,
  )
  const navigate = useNavigate()

  const toggleDropdown = (projectId: string) => {
    setDropdownVisible(prev => (prev === projectId ? null : projectId))
    setTimeout(() => {
      const dropOv = document.getElementById(`dropdown_ov${projectId}`)
      if (!!dropOv) {
        dropOv.focus()
      }
    }, 100)
  }

  const handleCleanDropdown = () => toggleDropdown("")

  const handleEditRole = (userId: string) => () => navigate(`/role/${userId}`)

  const handleDeleteRole = (userId: string) => () =>
    console.log("Delete user -> ", userId)

  const handleClick = React.useCallback(() => {
    navigate(pathRoutes.ROLES.CREATE)
  }, [])

  React.useEffect(() => {
    const storedToken = Cookies.get(COOKIES_APP.TOKEN_APP)

    if (storedToken) {
      axios
        .get("http://localhost:3000/roles", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(response => {
          const listData: DataRoleResponse[] =
            response.data as DataRoleResponse[]
          setListRoles(listData)
        })
        .catch(err => {
          toast.error("Failed to fetch data")
          console.log(
            "Error Axios GET -> ",
            err.response ? err.response.data : err,
          )
        })
    }
  }, [])

  return (
    <div>
      <HeaderSection
        title="Roles"
        subtitle="List of roles"
        nameButton="Create"
        onPrimaryClick={handleClick}
      />
      <ContainerTable>
        <table>
          <ContainerHead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td></td>
            </tr>
          </ContainerHead>
          <ContainerBody>
            {(listRoles || []).map(role => (
              <tr>
                <ClasicStylesTD>
                  <div>
                    <span>{role.name}</span>
                  </div>
                </ClasicStylesTD>
                <ClasicStylesTD>
                  <div>
                    <span>{role.isActive}</span>
                  </div>
                </ClasicStylesTD>
                <ContainerActions>
                  <div>
                    <div onClick={() => toggleDropdown(`${role.id}`)}>
                      <Ellipsis />
                    </div>
                    {dropdownVisible === `${role.id}` && (
                      <ContainerDropdown
                        id={`dropdown_ov${role.id}`}
                        tabIndex={0}
                        onBlur={handleCleanDropdown}
                      >
                        <span onClick={handleEditRole(`${role.id}`)}>
                          Editar
                        </span>
                        <span onClick={handleDeleteRole(`${role.id}`)}>
                          Eliminar
                        </span>
                      </ContainerDropdown>
                    )}
                  </div>
                </ContainerActions>
              </tr>
            ))}
          </ContainerBody>
        </table>
      </ContainerTable>
    </div>
  )
}

export default Roles
