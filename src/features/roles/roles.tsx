import React from "react"
import { useNavigate } from "react-router-dom"
import HeaderSection from "../../components/header-section/header-section"
import { pathRoutes } from "../../config/routes/path"
import axios from "axios"
import Cookies from "js-cookie"
import { COOKIES_APP } from "../../constants/app"
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
} from "../../config/theme/global-styles"
import { Ellipsis } from "@styled-icons/fa-solid/Ellipsis"
import { settingsApp } from "../../config/environment/settings"
import useDataUser from "../../utils/use-data-user"
import { formatToDDMonth } from "../../utils/date-util"
import ModalDeleteRole from "../../components/modal/variants/modal-delete-role/modal-delete-role"
import { ContainerNameRoleTD } from "./roles.styles"
import { FilterPermissionsDTO } from "../../core/models/interfaces/user-model"

const Roles: React.FC = () => {
  const [listRoles, setListRoles] = React.useState<DataRoleResponse[]>([])
  const [isOpenModalDelete, setIsOpenModalDelete] =
    React.useState<boolean>(false)
  const [dataRoleDelete, setDataRoleDelete] = React.useState<RoleDTO>()
  const [dropdownVisible, setDropdownVisible] = React.useState<string | null>(
    null,
  )
  const [dataPermissions, setDataPermissions] =
    React.useState<FilterPermissionsDTO>()

  const { handleGetToken, handleGetPermissions } = useDataUser()
  const navigate = useNavigate()

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

  const handleEditRole = (userId: string) => () =>
    console.log(`EditRole /role/${userId}`)

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
    if (storedToken) {
      axios
        .get(`${settingsApp.api.base}/roles`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
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
  }, [handleGetToken])

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
        nameButton="Create"
        havePermissionCreate={dataPermissions?.user.includes("create") || false}
        onPrimaryClick={handleClick}
      />
      <ContainerTable>
        <table>
          <ContainerHead>
            <tr>
              <td>Name</td>
              <td>Creado</td>
              <td></td>
            </tr>
          </ContainerHead>
          <ContainerBody>
            {(listRoles || []).map(role => (
              <tr>
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
      <ModalDeleteRole
        isOpen={isOpenModalDelete}
        handleClose={handleCloseModalDelete}
        handleDeleteUser={handleDeleteUserModal}
        dataUserDelete={dataRoleDelete!!}
      />
    </div>
  )
}

export default Roles
