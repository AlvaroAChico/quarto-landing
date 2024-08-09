import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { mockUsersPermissions } from "../../config/mocks/users"
import {
  ContainerHeaderBar,
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
import CustomButton from "../../components/custom-button/custom-button"

const Users: React.FC = () => {
  const [listUsers, setListUsers] = React.useState<UserResponse[]>([])
  const navigate = useNavigate()

  const handleEditUser = (userId: string) => () =>
    navigate(`/usuarios/${userId}`)

  const handleChangeUserPermissions = (userId: string) => () =>
    navigate(`/usuarios/${userId}/permisos`)

  const handleDeleteUser = (userId: string) => () =>
    console.log("Delete user -> ", userId)

  const handleClick = React.useCallback(() => {
    navigate("/users/create")
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
      <ContainerHeaderBar>
        <div>Users</div>
        <div>
          <CustomButton text="Create" onClick={handleClick} />
        </div>
      </ContainerHeaderBar>
      <UsersContainer>
        {(listUsers || []).map(user => (
          <ItemUserContainer>
            <div>
              {user.firstName} {user.lastName}
            </div>
            {/* <div>{user.email}</div> */}
            <ListPermissionsContainer>
              {/* <div onClick={handleChangeUserPermissions(`${user.id}`)}>
                <Security />
              </div> */}
              <div onClick={handleEditUser(`${user.id}`)}>
                <Edit />
              </div>
              <div onClick={handleDeleteUser(`${user.id}`)}>
                <Trash />
              </div>
            </ListPermissionsContainer>
          </ItemUserContainer>
        ))}
      </UsersContainer>
    </div>
  )
}

export default Users
