import React from "react"
import HeaderSection from "../../components/header-section/header-section"
import { pathRoutes } from "../../config/routes/paths"
import { useNavigate } from "react-router-dom"
import { FilterPermissionsDTO } from "../../core/models/interfaces/user-model"
import useDataUser from "../../utils/use-data-user"
import axios from "axios"
import { settingsApp } from "../../config/environment/settings"
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
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { ContainerNameRoleTD } from "../roles/roles.styles"
import { formatToDDMonth } from "../../utils/date-util"
import { Ellipsis } from "styled-icons/fa-solid"
import ModalDeleteGeneral from "../../components/modal/variants/modal-delete-general/modal-delete-general"
import ModalEditService from "../../components/modal/variants/modal-edit-service/modal-edit-service"
import { ServiceDTO } from "../../core/models/interfaces/services-model"
import { APP_MENU } from "../../constants/app"
import ForbiddenAction from "../../components/forbidden-action/forbidden-action"

const Services: React.FC = () => {
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
        data?.service.includes(permission),
      )
    ) {
      return
    }
  }, [])
  const [listServices, setListServices] = React.useState<ServiceDTO[]>([])
  const [isOpenModalEdit, setIsOpenModalEdit] = React.useState<boolean>(false)
  const [isLoadingListServices, setIsLoadingListServices] =
    React.useState<boolean>(false)
  const [isOpenModalDelete, setIsOpenModalDelete] =
    React.useState<boolean>(false)
  const [dataRoleEdit, setDataRoleEdit] = React.useState<ServiceDTO>()
  const [dataServiceDelete, setDataServiceDelete] = React.useState<ServiceDTO>()
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
      setDataRoleEdit(
        listServices.filter(service => `${service.id}` == roleId)[0],
      )
      setIsOpenModalEdit(true)
    },
    [listServices],
  )

  const handleDeleteRole = React.useCallback(
    (serviceId: string) => () => {
      if (!!serviceId) {
        setDataServiceDelete(
          listServices.filter(service => `${service.id}` == serviceId)[0],
        )
        setIsOpenModalDelete(true)
      }
    },
    [listServices],
  )

  const handleClick = React.useCallback(() => {
    navigate(pathRoutes.SERVICES.CREATE)
  }, [])

  const fetchListRole = React.useCallback(() => {
    const storedToken = handleGetToken()
    const data = handleGetPermissions()
    if (storedToken && !!data?.service.includes(APP_MENU.LIST)) {
      setIsLoadingListServices(true)
      axios
        .get(`${settingsApp.api.base}/services`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          const listData: ServiceDTO[] = response.data as ServiceDTO[]
          setListServices(listData)
          setIsLoadingListServices(false)
        })
        .catch(err => {
          toast.error("Failed to fetch data")
          setIsLoadingListServices(false)
        })
    }
  }, [dataPermissions, handleGetToken])

  React.useEffect(() => {
    fetchListRole()
  }, [])

  return (
    <div>
      <HeaderSection
        title="Services"
        subtitle="List of services"
        nameButton="New Service"
        havePermissionCreate={
          dataPermissions?.service.includes(APP_MENU.CREATE) || false
        }
        onPrimaryClick={handleClick}
      />
      {isLoadingListServices && (
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
              <tr>
                <td colSpan={3}>
                  <Skeleton count={3} height={40} />
                </td>
              </tr>
            </ContainerBody>
          </table>
        </ContainerTable>
      )}
      {!isLoadingListServices &&
        !!listServices &&
        listServices.length <= 0 &&
        !!dataPermissions?.service.includes(APP_MENU.LIST) && (
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
      {!isLoadingListServices &&
        !!listServices &&
        listServices.length > 0 &&
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
                {(listServices || []).map(role => (
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
                            {dataPermissions?.service.includes(
                              APP_MENU.UPDATE,
                            ) && (
                              <span onClick={handleEditRole(`${role.id}`)}>
                                Edit
                              </span>
                            )}
                            {dataPermissions?.service.includes(
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
      {/*<ModalDeleteRole
        isOpen={isOpenModalDelete}
        handleClose={handleCloseModalDelete}
        handleDeleteUser={handleDeleteUserModal}
        dataUserDelete={dataRoleDelete!!}
        /> */}
      {!dataPermissions?.service.includes(APP_MENU.LIST) && <ForbiddenAction />}
      <ModalEditService
        isOpen={isOpenModalEdit}
        handleClose={handleCloseModalEdit}
        handleRefreshData={fetchListRole}
        dataEdit={dataRoleEdit!!}
      />
      <ModalDeleteGeneral
        isOpen={isOpenModalDelete}
        dataAPI="services"
        dataLabel={"service"}
        dataId={dataServiceDelete?.id || ""}
        dataName={dataServiceDelete?.name || ""}
        handleRefresh={fetchListRole}
        handleClose={handleCloseModalDelete}
      />
    </div>
  )
}

export default Services
