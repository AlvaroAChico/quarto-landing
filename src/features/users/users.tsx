import React from "react"
import { useNavigate } from "react-router-dom"
// Icons
import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "sonner"
import HeaderSection from "../../components/header-section/header-section"
import { pathRoutes } from "../../config/routes/path"
import { COOKIES_APP } from "../../constants/app"
import {
  FilterPermissionsDTO,
  UserDTO,
} from "../../core/models/interfaces/user-model"
import ModalEditUser from "../../components/modal/variants/modal-edit-user/modal-edit-user"
import ModalDeleteUser from "../../components/modal/variants/modal-delete-user/modal-delete-user"
import {
  ClasicStylesTD,
  ContainerActions,
  ContainerBody,
  ContainerDropdown,
  ContainerHead,
  ContainerTable,
  NotFoundStyles,
} from "../../config/theme/global-styles"
import { Ellipsis } from "@styled-icons/fa-solid/Ellipsis"
import { settingsApp } from "../../config/environment/settings"
import useDataUser from "../../utils/use-data-user"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const Users: React.FC = () => {
  const [listUsers, setListUsers] = React.useState<UserDTO[]>([])
  const [isOpenModalEdit, setIsOpenModalEdit] = React.useState<boolean>(false)
  const [isLoadingListUsers, setIsLoadingListUsers] =
    React.useState<boolean>(false)
  const [isOpenModalDelete, setIsOpenModalDelete] =
    React.useState<boolean>(false)
  const [dataUserEdit, setDataUserEdit] = React.useState<UserDTO>()
  const [dataUserDelete, setDataUserDelete] = React.useState<UserDTO>()
  const [dropdownVisible, setDropdownVisible] = React.useState<string | null>(
    null,
  )
  const [dataPermissions, setDataPermissions] =
    React.useState<FilterPermissionsDTO>()
  const navigate = useNavigate()

  const handleCloseModalEdit = () => setIsOpenModalEdit(false)
  const handleCloseModalDelete = () => setIsOpenModalDelete(false)

  const { handleGetToken, handleGetPermissions } = useDataUser()

  const getCookiesDataPermission = React.useCallback(() => {
    const data = handleGetPermissions()
    if (!!data) {
      setDataPermissions(data)
    }
  }, [handleGetPermissions])

  React.useEffect(() => {
    getCookiesDataPermission()
  }, [])

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
    fetchListUsers()
    handleCloseModalDelete()
  }

  const handleClick = React.useCallback(() => {
    navigate(pathRoutes.USERS.CREATE)
  }, [])

  const fetchListUsers = React.useCallback(() => {
    setIsLoadingListUsers(true)
    const storedToken = handleGetToken()
    if (storedToken) {
      axios
        .get(`${settingsApp.api.base}/users?include=role`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            ContentType: "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          const listData: UserDTO[] = response.data as UserDTO[]
          setListUsers(listData)
          setIsLoadingListUsers(false)
        })
        .catch(err => {
          toast.error("Failed to fetch data")
          setIsLoadingListUsers(false)
        })
    }
  }, [handleGetToken])

  React.useEffect(() => {
    fetchListUsers()
  }, [])

  return (
    <div>
      <HeaderSection
        title="Users"
        subtitle="List of users"
        nameButton="New User"
        havePermissionCreate={dataPermissions?.user.includes("create") || false}
        onPrimaryClick={handleClick}
      />

      {isLoadingListUsers && (
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
              <tr>
                <td colSpan={3}>
                  <Skeleton count={3} height={40} />
                </td>
              </tr>
            </ContainerBody>
          </table>
        </ContainerTable>
      )}
      {!isLoadingListUsers && !!listUsers && listUsers.length <= 0 && (
        <ContainerTable>
          <table>
            <ContainerHead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td></td>
              </tr>
            </ContainerHead>
          </table>
          <NotFoundStyles>
            <span>No users found</span>
          </NotFoundStyles>
        </ContainerTable>
      )}
      {!isLoadingListUsers &&
        !!listUsers &&
        listUsers.length > 0 &&
        !!dataPermissions &&
        dataPermissions.user.includes("list") && (
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
                {(listUsers || [])
                  .filter(user => user.isActive)
                  .map(user => (
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
                              {(
                                dataPermissions ||
                                ({
                                  user: [],
                                } as unknown as FilterPermissionsDTO)
                              ).user.includes("update") && (
                                <span onClick={handleEditUser(`${user.id}`)}>
                                  Edit
                                </span>
                              )}
                              {(
                                dataPermissions ||
                                ({
                                  user: [],
                                } as unknown as FilterPermissionsDTO)
                              ).user.includes("delete") && (
                                <span onClick={handleDeleteUser(`${user.id}`)}>
                                  Delete
                                </span>
                              )}
                            </ContainerDropdown>
                          )}
                        </div>
                      </ContainerActions>
                    </tr>
                  ))}
              </ContainerBody>
            </table>
          </ContainerTable>
        )}
      <ModalEditUser
        isOpen={isOpenModalEdit}
        handleClose={handleCloseModalEdit}
        handleRefreshData={fetchListUsers}
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
