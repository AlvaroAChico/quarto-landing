import React from "react"
import HeaderSection from "../../components/header-section/header-section"
import { pathRoutes } from "../../config/routes/path"
import { useNavigate } from "react-router-dom"

const Tasks: React.FC = () => {
  const [listServices, setListServices] = React.useState<DataRoleResponse[]>([])
  const [isOpenModalEdit, setIsOpenModalEdit] = React.useState<boolean>(false)
  const [isLoadingListServices, setIsLoadingListServices] =
    React.useState<boolean>(false)
  const [isOpenModalDelete, setIsOpenModalDelete] =
    React.useState<boolean>(false)
  const [dataRoleDelete, setDataRoleDelete] = React.useState<RoleDTO>()
  const [dataRoleEdit, setDataRoleEdit] = React.useState<RoleDTO>()
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
    setIsLoadingListRoles(true)
    const storedToken = handleGetToken()
    if (storedToken) {
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
          setListRoles(listData)
          setIsLoadingListRoles(false)
        })
        .catch(err => {
          toast.error("Failed to fetch data")
          setIsLoadingListRoles(false)
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
        title="Tasks"
        subtitle="List of tasks"
        nameButton="Create"
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
      {!isLoadingListRoles && !!listRoles && listRoles.length <= 0 && (
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
        dataPermissions.role.includes("list") && (
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
      <ModalEditRole
        isOpen={isOpenModalEdit}
        handleClose={handleCloseModalEdit}
        handleRefreshData={fetchListRole}
        dataRoleEdit={dataRoleEdit!!}
      />
      <ModalDeleteRole
        isOpen={isOpenModalDelete}
        handleClose={handleCloseModalDelete}
        handleDeleteUser={handleDeleteUserModal}
        dataUserDelete={dataRoleDelete!!}
      />
    </div>
  )
}

export default Tasks
