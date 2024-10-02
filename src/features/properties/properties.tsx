import React from "react"
import HeaderSection from "../../components/header-section/header-section"
import { useNavigate } from "react-router-dom"
import { pathRoutes } from "../../config/routes/path"
import {
  CardStadistics,
  ClientStylesTD,
  ContainerFilters,
  ContentStylesSection,
  DateStylesTD,
  NameStylesTD,
  ProgressStylesTD,
  SectionRoute,
} from "./properties.styles"
import Cookies from "js-cookie"
import {
  PropertyDTO,
  PropertyResponseDTO,
  StadisticsDTO,
  StadisticsPropertiesDTO,
} from "../../core/models/interfaces/property-model"
import {
  APP_MENU,
  COOKIES_APP,
  months,
  monthsSelect,
} from "../../constants/app"
import axios from "axios"
import { toast } from "sonner"
import { Ellipsis } from "@styled-icons/fa-solid/Ellipsis"
import ProjectCard from "./components/project-card/project-card"
import ContractorCard from "./components/contractor-card/contractor-card"
import { User } from "@styled-icons/typicons/User"
import {
  ContainerActions,
  ContainerBody,
  ContainerDropdown,
  ContainerHead,
  ContainerTable,
  NotFoundStyles,
  selectStyles,
  WrapperInput,
} from "../../config/theme/global-styles"
import Input from "../../components/input/input"
import { Search } from "styled-icons/bootstrap"
import Select from "react-select"
import useDataUser from "../../utils/use-data-user"
import { settingsApp } from "../../config/environment/settings"
import { FilterPermissionsDTO } from "../../core/models/interfaces/user-model"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { routeWithReplaceId } from "../../utils/path-util"
import { formatToDDMonth } from "../../utils/date-util"
import ModalDeleteGeneral from "../../components/modal/variants/modal-delete-general/modal-delete-general"
import ModalEditProperty from "../../components/modal/variants/modal-edit-property/modal-edit-property"

const Properties: React.FC = () => {
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
    if (
      !!data &&
      !Object.values(APP_MENU).some(permission =>
        data?.role.includes(permission),
      )
    ) {
      return
    }
  }, [])

  const [listProperties, setListProperties] = React.useState<PropertyDTO[]>([])
  const [dataEdit, setDataEdit] = React.useState<PropertyDTO>()
  const [isOpenModalEdit, setIsOpenModalEdit] = React.useState<boolean>(false)
  const [temporalListProperties, setTemporalListProperties] = React.useState<
    PropertyDTO[]
  >([])
  const [isLoadingListProperties, setIsLoadingListProperties] =
    React.useState<boolean>(false)
  const [stadisticts, setStadisticts] = React.useState<StadisticsDTO>()
  const [dropdownVisible, setDropdownVisible] = React.useState<string | null>(
    null,
  )
  const [dataPermissions, setDataPermissions] =
    React.useState<FilterPermissionsDTO>()
  const [isOpenModalDelete, setIsOpenModalDelete] =
    React.useState<boolean>(false)
  const [dataDelete, setDataDelete] = React.useState<PropertyDTO>()

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

  const handleEditProject = React.useCallback(
    (projectId: string) => () => {
      handleCleanDropdown()
      setDataEdit(listProperties.filter(prop => `${prop.id}` == projectId)[0])
      setIsOpenModalEdit(true)
    },
    [listProperties],
  )

  const handleDeleteProject = (projectId: string) => () => {
    handleCleanDropdown()
    setDataDelete(listProperties.filter(prop => `${prop.id}` == projectId)[0])
    setIsOpenModalDelete(true)
  }

  const handleClick = React.useCallback(() => {
    navigate(pathRoutes.PROPERTIES.CREATE)
  }, [])

  React.useEffect(() => {
    fetchDataProperties()
  }, [])

  const fetchDataProperties = React.useCallback(() => {
    setIsLoadingListProperties(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      axios
        .get(`${settingsApp.api.base}/residentials?include=apartments`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          console.log("Response => ", response.data)
          const dataResponse: PropertyDTO[] = response.data as PropertyDTO[]
          if (!!dataResponse) {
            setListProperties(dataResponse)
            setTemporalListProperties(dataResponse)
            // setStadisticts(dataResponse.stadistics)
          }
          setIsLoadingListProperties(false)
        })
        .catch(err => {
          toast.error("Failed to fetch data")
          setIsLoadingListProperties(false)
        })
    }
  }, [])

  const formatDate = (date: string) => {
    const [day, month] = date.split("/")

    return `${day} ${months[parseInt(month) - 1]}`
  }
  const [selectedOptionRole, setSelectedOptionRole] = React.useState(null)
  const [optionsRoles, setOptionsRoles] = React.useState<any>([])
  const handleChangeOptionRole = (value: any) => {
    setSelectedOptionRole(value)
  }

  const handleDblClickView = (projectId: string) =>
    navigate(
      routeWithReplaceId(pathRoutes.PROPERTIES.DETAIL.OVERVIEW, projectId),
    )

  return (
    <SectionRoute>
      <HeaderSection
        title="Properties"
        subtitle="Properties"
        nameButton="New Property"
        havePermissionCreate={
          dataPermissions?.property.includes(APP_MENU.CREATE) || false
        }
        onPrimaryClick={handleClick}
      />
      <ContentStylesSection>
        <CardStadistics>
          {!!stadisticts && (
            <>
              <ProjectCard
                data={stadisticts?.projects || ({} as StadisticsPropertiesDTO)}
                name="Properties"
              />
              <ContractorCard
                data={
                  stadisticts?.contractors || ({} as StadisticsPropertiesDTO)
                }
              />
            </>
          )}
        </CardStadistics>
        {isLoadingListProperties && (
          <ContainerTable>
            <table>
              <ContainerHead>
                <tr>
                  <td>Residential</td>
                  <td>Apartments</td>
                  <td>Address</td>
                  <td></td>
                </tr>
              </ContainerHead>
              <ContainerBody>
                <tr>
                  <td colSpan={5}>
                    <Skeleton count={3} height={40} />
                  </td>
                </tr>
              </ContainerBody>
            </table>
          </ContainerTable>
        )}
        {!isLoadingListProperties &&
          !!listProperties &&
          !!dataPermissions &&
          dataPermissions.property.includes(APP_MENU.LIST) && (
            <ContainerTable>
              <ContainerFilters>
                <div>
                  <WrapperInput>
                    <Input
                      id="email-create-user"
                      placeholder="Search"
                      icon={Search}
                      onChange={(e: any) => {
                        if (!!e.target.value) {
                          const newList = temporalListProperties.filter(prop =>
                            prop.name
                              .toLocaleLowerCase()
                              .includes(e.target.value.toLocaleLowerCase()),
                          )
                          setListProperties(newList)
                        } else {
                          fetchDataProperties()
                        }
                      }}
                    />
                  </WrapperInput>
                </div>
                <div>
                  <div>
                    <Select
                      defaultValue={selectedOptionRole}
                      onChange={handleChangeOptionRole}
                      options={monthsSelect}
                      isSearchable={false}
                      styles={selectStyles}
                      placeholder="Month"
                    />
                  </div>
                </div>
              </ContainerFilters>
              <table>
                <ContainerHead>
                  <tr>
                    <td>Residential</td>
                    <td>Apartments</td>
                    <td>Address</td>
                    {/* <td>Progress</td> */}
                    {/* <td>Client</td> */}
                    {/* <td>Due Date</td> */}
                    <td></td>
                  </tr>
                </ContainerHead>
                <ContainerBody>
                  {(listProperties || []).map(project => (
                    <tr
                      onDoubleClick={() => handleDblClickView(`${project.id}`)}
                    >
                      <NameStylesTD>
                        <div>
                          <span>
                            <img src={project.picture} />
                          </span>
                          <div>
                            <span>{project.name}</span>
                            {/* <span>{project.status}</span> */}
                          </div>
                        </div>
                      </NameStylesTD>
                      <ProgressStylesTD progress={project.progress}>
                        <div>
                          {/* <span>{project.progress} %</span>
                          <div></div> */}
                          <span>
                            {(project.apartments || []).length} apartments
                          </span>
                        </div>
                      </ProgressStylesTD>
                      {/* <td>{project.contractors[0].fullName}</td> */}
                      <ClientStylesTD>
                        <div>
                          <span>
                            <User />
                          </span>
                          <span>{}</span>
                          <span>
                            {project.address}
                            {/* Zicia */}
                          </span>
                        </div>
                      </ClientStylesTD>
                      {/* <DateStylesTD>
                        <div>
                          <span>{formatToDDMonth(project.dueDate)}</span>
                        </div>
                      </DateStylesTD> */}
                      <ContainerActions>
                        <div>
                          <div onClick={() => toggleDropdown(`${project.id}`)}>
                            <Ellipsis />
                          </div>
                          {dropdownVisible === `${project.id}` && (
                            <ContainerDropdown
                              id={`dropdown_ov${project.id}`}
                              tabIndex={0}
                              onBlur={handleCleanDropdown}
                            >
                              {(
                                dataPermissions ||
                                ({
                                  project: [],
                                } as unknown as FilterPermissionsDTO)
                              ).property.includes(APP_MENU.UPDATE) && (
                                <span
                                  onClick={handleEditProject(`${project.id}`)}
                                >
                                  Edit
                                </span>
                              )}
                              {(
                                dataPermissions ||
                                ({
                                  project: [],
                                } as unknown as FilterPermissionsDTO)
                              ).property.includes(APP_MENU.DELETE) && (
                                <span
                                  onClick={handleDeleteProject(`${project.id}`)}
                                >
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
              {!isLoadingListProperties &&
                !!listProperties &&
                listProperties.length <= 0 && (
                  <NotFoundStyles>
                    <span>No properties found</span>
                  </NotFoundStyles>
                )}
            </ContainerTable>
          )}
      </ContentStylesSection>
      <ModalEditProperty
        isOpen={isOpenModalEdit}
        handleClose={handleCloseModalEdit}
        handleRefreshData={fetchDataProperties}
        dataEdit={dataEdit!!}
      />
      <ModalDeleteGeneral
        isOpen={isOpenModalDelete}
        dataAPI="residentials"
        dataLabel="property"
        dataId={dataDelete?.id || ""}
        dataName={dataDelete?.name || ""}
        handleClose={handleCloseModalDelete}
        handleRefresh={fetchDataProperties}
      />
    </SectionRoute>
  )
}

export default Properties
