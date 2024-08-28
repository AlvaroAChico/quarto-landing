import React from "react"
import { useNavigate } from "react-router-dom"
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
import ModalEditUser from "../../components/modal/variants/modal-edit-user/modal-edit-user"
import ModalDeleteUser from "../../components/modal/variants/modal-delete-user/modal-delete-user"
import {
  ClasicStylesTD,
  ContainerActions,
  ContainerBody,
  ContainerDropdown,
  ContainerHead,
  ContainerTable,
} from "../../config/theme/global-styles"
import { Ellipsis } from "@styled-icons/fa-solid/Ellipsis"

const Users: React.FC = () => {
  const [listUsers, setListUsers] = React.useState<UserDTO[]>([])
  const [isOpenModalEdit, setIsOpenModalEdit] = React.useState<boolean>(false)
  const [isOpenModalDelete, setIsOpenModalDelete] =
    React.useState<boolean>(false)
  const [dataUserEdit, setDataUserEdit] = React.useState<UserDTO>()
  const [dataUserDelete, setDataUserDelete] = React.useState<UserDTO>()
  const [dropdownVisible, setDropdownVisible] = React.useState<string | null>(
    null,
  )
  const navigate = useNavigate()

  const handleCloseModalEdit = () => setIsOpenModalEdit(false)
  const handleCloseModalDelete = () => setIsOpenModalDelete(false)

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

  const handleDeleteUserModal = () => {
    handleCloseModalDelete()
    fetchListUsers()
  }

  const handleClick = React.useCallback(() => {
    navigate(pathRoutes.USERS.CREATE)
  }, [])

  const fetchListUsers = React.useCallback(() => {
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

  React.useEffect(() => {
    fetchListUsers()
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
        <table>
          <ContainerHead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td></td>
            </tr>
          </ContainerHead>
          <ContainerBody>
            {(listUsers || []).map(user => (
              <tr>
                <ClasicStylesTD>
                  <div>
                    <span>{user.firstName}</span>
                  </div>
                </ClasicStylesTD>
                <ClasicStylesTD>
                  <div>
                    <span>{user.email}</span>
                  </div>
                </ClasicStylesTD>
                <ContainerActions>
                  <div>
                    <div onClick={() => toggleDropdown(`${user.id}`)}>
                      <Ellipsis />
                    </div>
                    {dropdownVisible === `${user.id}` && (
                      <ContainerDropdown
                        id={`dropdown_ov${user.id}`}
                        tabIndex={0}
                        onBlur={handleCleanDropdown}
                      >
                        <span onClick={handleEditUser(`${user.id}`)}>
                          Editar
                        </span>
                        <span onClick={handleDeleteUser(`${user.id}`)}>
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
      <ModalEditUser
        isOpen={isOpenModalEdit}
        handleClose={handleCloseModalEdit}
        dataUserEdit={dataUserEdit!!}
      />
      <ModalDeleteUser
        isOpen={isOpenModalDelete}
        handleClose={handleCloseModalDelete}
        handleDeleteUser={handleDeleteUserModal}
        dataUserDelete={dataUserDelete!!}
      />
    </div>
  )
}

export default Users
