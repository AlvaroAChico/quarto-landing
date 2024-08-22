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
  ContainerActions,
  ContainerBody,
  ContainerHead,
  ContainerTable,
} from "./roles.styles"
import { Edit } from "styled-icons/fluentui-system-filled"
import { Trash } from "styled-icons/bootstrap"
import StatusPoint from "../../components/status-point/status-point"

const Roles: React.FC = () => {
  const [listRoles, setListRoles] = React.useState<DataRoleResponse[]>([])
  const navigate = useNavigate()

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
        <ContainerHead>
          <tr>
            <td></td>
            <td>Name</td>
            <td>Actions</td>
          </tr>
        </ContainerHead>
        <ContainerBody>
          {/* <UsersContainer> */}
          {(listRoles || []).map((role, index) => (
            <tr>
              {/* <td>{index + 1}</td> */}
              <td>
                <StatusPoint isActive={role.isActive} />
              </td>
              <td>{role.name} </td>
              <ContainerActions>
                <div onClick={handleEditRole(`${role.id}`)}>
                  <Edit />
                </div>
                <div onClick={handleDeleteRole(`${role.id}`)}>
                  <Trash />
                </div>
              </ContainerActions>
            </tr>
          ))}
          {/* </UsersContainer> */}
        </ContainerBody>
      </ContainerTable>
    </div>
  )
}

export default Roles
