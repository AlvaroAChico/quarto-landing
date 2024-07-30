import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { mockUsersPermissions } from "../../config/mocks/users"
import {
  ItemUserContainer,
  ListPermissionsContainer,
  UsersContainer,
} from "./users.styles"
// Icons
import { Security } from "@styled-icons/material/Security"
import { Edit } from "@styled-icons/fluentui-system-filled/Edit"
import { Trash } from "@styled-icons/ionicons-solid/Trash"

const Users: React.FC = () => {
  const navigate = useNavigate()

  const handleEditUser = (userId: string) => () =>
    navigate(`/usuarios/${userId}`)

  const handleChangeUserPermissions = (userId: string) => () =>
    navigate(`/usuarios/${userId}/permisos`)

  const handleDeleteUser = (userId: string) => () =>
    console.log("Delete user -> ", userId)

  return (
    <UsersContainer>
      {(mockUsersPermissions || []).map(user => (
        <ItemUserContainer>
          <div>{user.name}</div>
          <ListPermissionsContainer>
            <div onClick={handleChangeUserPermissions(user.id)}>
              <Security />
            </div>
            <div onClick={handleEditUser(user.id)}>
              <Edit />
            </div>
            <div onClick={handleDeleteUser(user.id)}>
              <Trash />
            </div>
          </ListPermissionsContainer>
        </ItemUserContainer>
      ))}
    </UsersContainer>
  )
}

export default Users
