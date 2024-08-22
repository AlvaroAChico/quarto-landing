import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { mockUsersPermissions } from "../../config/mocks/users"
import {
  ContainerActions,
  ContainerBody,
  ContainerHead,
  ContainerTable,
} from "./users.styles"
// Icons
import { Edit } from "@styled-icons/fluentui-system-filled/Edit"
import { Trash } from "@styled-icons/ionicons-solid/Trash"
import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "sonner"
import HeaderSection from "../../components/header-section/header-section"
import { pathRoutes } from "../../config/routes/path"
import { COOKIES_APP } from "../../constants/app"
import { UserDTO } from "../../core/models/interfaces/user-model"

const Users: React.FC = () => {
  const [listUsers, setListUsers] = React.useState<UserDTO[]>([])
  const navigate = useNavigate()

  const handleEditUser = (userId: string) => () => navigate(`/users/${userId}`)

  const handleDeleteUser = (userId: string) => () =>
    console.log("Delete user -> ", userId)

  const handleClick = React.useCallback(() => {
    navigate(pathRoutes.USERS.CREATE)
  }, [])

  React.useEffect(() => {
    const storedToken = Cookies.get(COOKIES_APP.TOKEN_APP)

    if (storedToken) {
      axios
        .get("http://localhost:3000/users", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(response => {
          const listData: UserDTO[] = response.data as UserDTO[]
          setListUsers(listData)
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
        title="Users"
        subtitle="List of users"
        nameButton="Create"
        onPrimaryClick={handleClick}
      />
      <ContainerTable>
        <ContainerHead>
          <tr>
            <td>Nº</td>
            <td>Name</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </ContainerHead>
        <ContainerBody>
          {/* <UsersContainer> */}
          {(listUsers || []).map((user, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>Active</td>
              <ContainerActions>
                <div onClick={handleEditUser(`${user.id}`)}>
                  <Edit />
                </div>
                <div onClick={handleDeleteUser(`${user.id}`)}>
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

export default Users
