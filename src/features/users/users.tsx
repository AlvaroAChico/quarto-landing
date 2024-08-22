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
import StatusPoint from "../../components/status-point/status-point"
import ModalEditUser from "../../components/modal/variants/modal-edit-user/modal-edit-user"
import ModalDeleteUser from "../../components/modal/variants/modal-delete-user/modal-delete-user"

const Users: React.FC = () => {
  const [listUsers, setListUsers] = React.useState<UserDTO[]>([])
  const [isOpenModalEdit, setIsOpenModalEdit] = React.useState<boolean>(false)
  const [isOpenModalDelete, setIsOpenModalDelete] =
    React.useState<boolean>(false)
  const [dataUserEdit, setDataUserEdit] = React.useState<UserDTO>()
  const [dataUserDelete, setDataUserDelete] = React.useState<UserDTO>()
  const navigate = useNavigate()

  const handleCloseModalEdit = () => setIsOpenModalEdit(false)
  const handleCloseModalDelete = () => setIsOpenModalDelete(false)

  const handleEditUser = React.useCallback(
    (userId: string) => () => {
      setDataUserEdit(listUsers.filter(user => `${user.id}` == userId)[0])
      setIsOpenModalEdit(true)
    },
    [listUsers],
  )

  const handleDeleteUser = React.useCallback(
    (userId: string) => () => {
      setDataUserDelete(listUsers.filter(user => `${user.id}` == userId)[0])
      setIsOpenModalDelete(true)
    },
    [listUsers],
  )

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
            <td></td>
            <td>Name</td>
            <td>Actions</td>
          </tr>
        </ContainerHead>
        <ContainerBody>
          {/* <UsersContainer> */}
          {(listUsers || []).map((user, index) => (
            <tr>
              {/* <td>{index + 1}</td> */}
              <td>
                <StatusPoint isActive={user.isActive} />
              </td>
              <td>
                {user.firstName} {user.lastName}
              </td>
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
        </ContainerBody>
      </ContainerTable>
      <ModalEditUser
        isOpen={isOpenModalEdit}
        handleClose={handleCloseModalEdit}
        dataUserEdit={dataUserEdit!!}
      />
      <ModalDeleteUser
        isOpen={isOpenModalDelete}
        handleClose={handleCloseModalDelete}
        dataUserDelete={dataUserDelete!!}
      />
    </div>
  )
}

export default Users
