import React from "react"
import { useNavigate } from "react-router-dom"
import HeaderSection from "../../components/header-section/header-section"
import { pathRoutes } from "../../config/routes/paths"
import axios from "axios"
import Cookies from "js-cookie"
import { APP_MENU, COOKIES_APP } from "../../constants/app"
import {
  DataRoleResponse,
  RoleDTO,
} from "../../core/models/interfaces/roles-model"
import { toast } from "sonner"
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
import { formatToDDMonth } from "../../utils/date-util"
import ModalDeleteRole from "../../components/modal/variants/modal-delete-role/modal-delete-role"
import { ContainerNameRoleTD } from "./roles.styles"
import { FilterPermissionsDTO } from "../../core/models/interfaces/user-model"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import ModalEditRole from "../../components/modal/variants/modal-edit-role/modal-edit-role"
import ModalDeleteGeneral from "../../components/modal/variants/modal-delete-general/modal-delete-general"
import ForbiddenAction from "../../components/forbidden-action/forbidden-action"

const Roles: React.FC = () => {
  const [dataPermissions, setDataPermissions] =
    React.useState<FilterPermissionsDTO>()
  const { handleGetToken, clearAllDataAPP, handleGetPermissions } =
    useDataUser()
  const navigate = useNavigate()

  React.useEffect(() => {
    // Verify Token
    const storedToken = handleGetToken()
    if (!storedToken) {
      clearAllDataAPP()
      navigate(pathRoutes.SIGN_IN)
    }
    // Verify Permissions
    const data = handleGetPermissions()
    setDataPermissions(data)
    if (
      !!data &&
      !Object.values(APP_MENU).some(permission =>
        data?.role.includes(permission),
      )
    ) {
      return
    }
  }, [])

  const [listRoles, setListRoles] = React.useState<DataRoleResponse[]>([])
  const [isOpenModalEdit, setIsOpenModalEdit] = React.useState<boolean>(false)
  const [isLoadingListRoles, setIsLoadingListRoles] =
    React.useState<boolean>(false)
  const [isOpenModalDelete, setIsOpenModalDelete] =
    React.useState<boolean>(false)
  const [dataRoleDelete, setDataRoleDelete] = React.useState<RoleDTO>()
  const [dataRoleEdit, setDataRoleEdit] = React.useState<RoleDTO>()
  const [dropdownVisible, setDropdownVisible] = React.useState<string | null>(
    null,
  )

  const handleCloseModalEdit = () => setIsOpenModalEdit(false)
  const handleCloseModalDelete = () => setIsOpenModalDelete(false)

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

  const handleEditRole = React.useCallback(
    (roleId: string) => () => {
      setDataRoleEdit(listRoles.filter(role => `${role.id}` == roleId)[0])
      setIsOpenModalEdit(true)
    },
    [listRoles],
  )

  const handleDeleteRole = React.useCallback(
    (roleId: string) => () => {
      setDataRoleDelete(listRoles.filter(role => `${role.id}` == roleId)[0])
      setIsOpenModalDelete(true)
    },
    [listRoles],
  )

  const handleClick = React.useCallback(() => {
    navigate(pathRoutes.ROLES.CREATE)
  }, [])

  const fetchListRole = React.useCallback(() => {
    const storedToken = handleGetToken()
    const data = handleGetPermissions()
    if (storedToken && !!data?.role.includes(APP_MENU.LIST)) {
      setIsLoadingListRoles(true)
      axios
        .get(`${settingsApp.api.base}/roles?include=permissions`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          const listData: DataRoleResponse[] =
            response.data as DataRoleResponse[]
          setListRoles(
            listData.filter(
              role => role.name !== "super-admin" && role.name !== "admin",
            ),
          )
          setIsLoadingListRoles(false)
        })
        .catch(err => {
          toast.error("Failed to fetch data")
          setIsLoadingListRoles(false)
        })
    }
  }, [dataPermissions, handleGetToken])

  React.useEffect(() => {
    fetchListRole()
  }, [])

  const handleDeleteUserModal = () => {
    fetchListRole()
    handleCloseModalDelete()
  }

  return (
    <div>
      <HeaderSection
        title="Roles"
        subtitle="List of roles"
        nameButton="New Role"
        havePermissionCreate={
          dataPermissions?.role.includes(APP_MENU.CREATE) || false
        }
        onPrimaryClick={handleClick}
      />
      {isLoadingListRoles && (
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
      {!isLoadingListRoles &&
        !!listRoles &&
        listRoles.length <= 0 &&
        !!dataPermissions?.role.includes(APP_MENU.LIST) && (
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
              <span>No roles found</span>
            </NotFoundStyles>
          </ContainerTable>
        )}
      {!isLoadingListRoles &&
        !!listRoles &&
        listRoles.length > 0 &&
        !!dataPermissions &&
        dataPermissions.role.includes(APP_MENU.LIST) && (
          <ContainerTable>
            <table>
              <ContainerHead>
                <tr>
                  <td>Name</td>
                  <td>CreatedAt</td>
                  <td></td>
                </tr>
              </ContainerHead>
              <ContainerBody>
                {(listRoles || []).map(role => (
                  <tr key={role.id}>
                    <ContainerNameRoleTD>
                      <div>
                        <span>{role.name}</span>
                      </div>
                    </ContainerNameRoleTD>
                    <ClasicStylesTD>
                      <div>
                        <span>{formatToDDMonth(role.createdAt)}</span>
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
                            {dataPermissions?.role.includes(
                              APP_MENU.UPDATE,
                            ) && (
                              <span onClick={handleEditRole(`${role.id}`)}>
                                Edit
                              </span>
                            )}
                            {dataPermissions?.role.includes(
                              APP_MENU.DELETE,
                            ) && (
                              <span onClick={handleDeleteRole(`${role.id}`)}>
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
      {!dataPermissions?.role.includes(APP_MENU.LIST) && <ForbiddenAction />}
      <ModalEditRole
        isOpen={isOpenModalEdit}
        handleClose={handleCloseModalEdit}
        handleRefreshData={fetchListRole}
        dataRoleEdit={dataRoleEdit!!}
      />
      <ModalDeleteGeneral
        isOpen={isOpenModalDelete}
        dataAPI="roles"
        dataLabel="role"
        dataId={dataRoleDelete?.id || ""}
        dataName={dataRoleDelete?.name || ""}
        handleClose={handleCloseModalDelete}
        handleRefresh={fetchListRole}
      />
    </div>
  )
}

export default Roles
