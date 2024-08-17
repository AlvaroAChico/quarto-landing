import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { mockUsersPermissions } from "../../config/mocks/users"
import {
  ContainerActions,
  ContainerBody,
  ContainerHead,
  ContainerHeaderBar,
  ContainerTable,
  ItemUserContainer,
  ListPermissionsContainer,
  UsersContainer,
} from "./users.styles"
// Icons
import { Security } from "@styled-icons/material/Security"
import { Edit } from "@styled-icons/fluentui-system-filled/Edit"
import { Trash } from "@styled-icons/ionicons-solid/Trash"
import axios from "axios"
import Cookies from "js-cookie"
import { DataUserResponse, UserResponse } from "../../core/models/user-model"
import { toast } from "sonner"
import HeaderSection from "../../components/header-section/header-section"
import { pathRoutes } from "../../config/routes/path"
import Modal from "../../components/modal/modal"

const Users: React.FC = () => {
  const [listUsers, setListUsers] = React.useState<UserResponse[]>([])
  const navigate = useNavigate()

  const handleEditUser = (userId: string) => () => navigate(`/users/${userId}`)

  const handleChangeUserPermissions = (userId: string) => () =>
    navigate(`/users/${userId}/permisos`)

  const handleDeleteUser = (userId: string) => () =>
    console.log("Delete user -> ", userId)

  const handleClick = React.useCallback(() => {
    navigate(pathRoutes.USERS.CREATE)
  }, [])

  React.useEffect(() => {
    // Para extraer y usar la cookie
    const storedUserData = Cookies.get("userData")
    console.log("Data Cookie -> ", storedUserData)

    if (storedUserData) {
      const parsedUserData: DataUserResponse = JSON.parse(
        storedUserData,
      ) as DataUserResponse

      axios
        .get("http://localhost:3000/users", {
          headers: {
            Authorization: `Bearer ${parsedUserData.access_token}`, // Reemplaza yourAuthToken con el token real
          },
        })
        .then(response => {
          // Manejo de la respuesta exitosa
          const listData: UserResponse[] = response.data as UserResponse[]
          setListUsers(listData)
          // Aquí puedes realizar otras acciones dependiendo de tus necesidades
        })
        .catch(err => {
          // Manejo de errores
          // setError(err) // Descomentar si estás usando para manejar el estado de un error
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
