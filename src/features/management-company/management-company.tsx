import React from "react"
import { useNavigate } from "react-router-dom"
import HeaderSection from "../../components/header-section/header-section"
import { pathRoutes } from "../../config/routes/path"
import axios from "axios"
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
import { ContainerNameRoleTD } from "./management-company.styles"
import { FilterPermissionsDTO } from "../../core/models/interfaces/user-model"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import ModalEditRole from "../../components/modal/variants/modal-edit-role/modal-edit-role"
import ModalDeleteGeneral from "../../components/modal/variants/modal-delete-general/modal-delete-general"
import { ManagementCompanyDTO } from "../../core/models/interfaces/management-company"

const ManagementCompany: React.FC = () => {
  const [listManagementCompany, setListManagementCompany] = React.useState<
    ManagementCompanyDTO[]
  >([])
  const [isOpenModalEdit, setIsOpenModalEdit] = React.useState<boolean>(false)
  const [isLoadingListManagementCompany, setIsLoadingListManagementCompany] =
    React.useState<boolean>(false)
  const [isOpenModalDelete, setIsOpenModalDelete] =
    React.useState<boolean>(false)
  const [dataDelete, setDataDelete] = React.useState<ManagementCompanyDTO>()
  const [dataRoleEdit, setDataRoleEdit] = React.useState<ManagementCompanyDTO>()
  const [dropdownVisible, setDropdownVisible] = React.useState<string | null>(
    null,
  )
  const [dataPermissions, setDataPermissions] =
    React.useState<FilterPermissionsDTO>()

  const { handleGetToken, handleGetPermissions } = useDataUser()
  const navigate = useNavigate()

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
        listManagementCompany.filter(role => `${role.id}` == roleId)[0],
      )
      setIsOpenModalEdit(true)
    },
    [listManagementCompany],
  )

  const handleDeleteRole = React.useCallback(
    (roleId: string) => () => {
      setDataDelete(
        listManagementCompany.filter(role => `${role.id}` == roleId)[0],
      )
      setIsOpenModalDelete(true)
    },
    [listManagementCompany],
  )

  const handleClick = React.useCallback(() => {
    navigate(pathRoutes.MANAGEMENT_COMPANY.CREATE)
  }, [])

  const fetchListRole = React.useCallback(() => {
    setIsLoadingListManagementCompany(true)
    const storedToken = handleGetToken()
    if (storedToken) {
      axios
        .get(`${settingsApp.api.base}/management_companies`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          const listData: ManagementCompanyDTO[] =
            response.data as ManagementCompanyDTO[]
          setListManagementCompany(listData)
          setIsLoadingListManagementCompany(false)
        })
        .catch(err => {
          toast.error("Failed to fetch data")
          setIsLoadingListManagementCompany(false)
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
        title="Management Company"
        subtitle="List of management company"
        nameButton="New Management Company"
        havePermissionCreate={dataPermissions?.user.includes("create") || false}
        onPrimaryClick={handleClick}
      />
      {isLoadingListManagementCompany && (
        <ContainerTable>
          <table>
            <ContainerHead>
              <tr>
                <td>Name</td>
                <td>Manager</td>
                <td>Phone Manager</td>
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
      {!isLoadingListManagementCompany &&
        !!listManagementCompany &&
        listManagementCompany.length <= 0 && (
          <ContainerTable>
            <table>
              <ContainerHead>
                <tr>
                  <td>Name</td>
                  <td>Manager</td>
                  <td>Phone Manager</td>
                  <td></td>
                </tr>
              </ContainerHead>
            </table>
            <NotFoundStyles>
              <span>No managementCompany found</span>
            </NotFoundStyles>
          </ContainerTable>
        )}
      {!isLoadingListManagementCompany &&
        !!listManagementCompany &&
        listManagementCompany.length > 0 &&
        !!dataPermissions &&
        dataPermissions.role.includes("list") && (
          <ContainerTable>
            <table>
              <ContainerHead>
                <tr>
                  <td>Name</td>
                  <td>Manager</td>
                  <td>Phone Manager</td>
                  <td></td>
                </tr>
              </ContainerHead>
              <ContainerBody>
                {(listManagementCompany || []).map(role => (
                  <tr>
                    <ContainerNameRoleTD>
                      <div>
                        <span>{role.name}</span>
                      </div>
                    </ContainerNameRoleTD>
                    <ClasicStylesTD>
                      <div>
                        <span>{role.managerName}</span>
                      </div>
                    </ClasicStylesTD>
                    <ClasicStylesTD>
                      <div>
                        <span>{role.managerPhone}</span>
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
                            {(
                              dataPermissions ||
                              ({
                                role: [],
                              } as unknown as FilterPermissionsDTO)
                            ).role.includes("update") && (
                              <span onClick={handleEditRole(`${role.id}`)}>
                                Edit
                              </span>
                            )}
                            {(
                              dataPermissions ||
                              ({
                                role: [],
                              } as unknown as FilterPermissionsDTO)
                            ).role.includes("delete") && (
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
      {/*<ModalEditRole
        isOpen={isOpenModalEdit}
        handleClose={handleCloseModalEdit}
        handleRefreshData={fetchListRole}
        dataRoleEdit={dataRoleEdit!!}
      />*/}
      <ModalDeleteGeneral
        isOpen={isOpenModalDelete}
        dataAPI="managementCompany"
        dataLabel="role"
        dataId={dataDelete?.id || ""}
        dataName={dataDelete?.name || ""}
        handleClose={handleCloseModalDelete}
        handleRefresh={fetchListRole}
      />
    </div>
  )
}

export default ManagementCompany
