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
} from "./apartments.styles"
import Cookies from "js-cookie"
import {
  ProjectDTO,
  ProjectResponseDTO,
  StadisticsDTO,
  StadisticsPropertiesDTO,
} from "../../core/models/interfaces/project-model"
import { COOKIES_APP, months, monthsSelect } from "../../constants/app"
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

const Apartments: React.FC = () => {
  const [listProjects, setListProjects] = React.useState<ProjectDTO[]>([])
  const [isLoadingListProjects, setIsLoadingListProjects] =
    React.useState<boolean>(false)
  const [stadisticts, setStadisticts] = React.useState<StadisticsDTO>()
  const [dropdownVisible, setDropdownVisible] = React.useState<string | null>(
    null,
  )
  const [dataPermissions, setDataPermissions] =
    React.useState<FilterPermissionsDTO>()
  const navigate = useNavigate()

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

  const handleEditProject = (projectId: string) => () => {
    handleCleanDropdown()
    console.log("Delete edit -> ", projectId)
  }

  const handleDeleteProject = (projectId: string) => () => {
    handleCleanDropdown()
    console.log("Delete project -> ", projectId)
  }

  const handleClick = React.useCallback(() => {
    navigate(pathRoutes.APARTMENTS.CREATE)
  }, [])

  React.useEffect(() => {
    fetchDataProjects()
  }, [])

  const fetchDataProjects = React.useCallback(() => {
    setIsLoadingListProjects(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      axios
        .get(`${settingsApp.api.base}/projects?include=tasks,client`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          console.log("Response => ", response.data)
          const dataResponse: ProjectDTO[] = response.data as ProjectDTO[]
          if (!!dataResponse) {
            setListProjects(dataResponse)
            // setStadisticts(dataResponse.stadistics)
          }
          setIsLoadingListProjects(false)
        })
        .catch(err => {
          toast.error("Failed to fetch data")
          setIsLoadingListProjects(false)
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
      routeWithReplaceId(pathRoutes.APARTMENTS.DETAIL.SERVICES, projectId),
    )

  return (
    <SectionRoute>
      <HeaderSection
        title="Apartments"
        subtitle="Apartments"
        nameButton="New Apartment"
        havePermissionCreate={
          dataPermissions?.project.includes("create") || false
        }
        onPrimaryClick={handleClick}
      />
      <ContentStylesSection>
        <CardStadistics>
          {!!stadisticts && (
            <>
              <ProjectCard
                data={stadisticts?.projects || ({} as StadisticsPropertiesDTO)}
                name="Projects"
              />
              <ContractorCard
                data={
                  stadisticts?.contractors || ({} as StadisticsPropertiesDTO)
                }
              />
            </>
          )}
        </CardStadistics>
        {isLoadingListProjects && (
          <ContainerTable>
            <table>
              <ContainerHead>
                <tr>
                  <td>Apartment</td>
                  <td>Residential</td>
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
        {!isLoadingListProjects &&
          !!listProjects &&
          listProjects.length <= 0 && (
            <>
              <ContainerTable>
                <table>
                  <ContainerHead>
                    <tr>
                      <td>Apartment</td>
                      <td>Residential</td>
                      <td>Address</td>
                      <td></td>
                    </tr>
                  </ContainerHead>
                </table>
                <NotFoundStyles>
                  <span>No projects found</span>
                </NotFoundStyles>
              </ContainerTable>
            </>
          )}
        {!isLoadingListProjects &&
          !!listProjects &&
          listProjects.length > 0 &&
          !!dataPermissions &&
          dataPermissions.project.includes("list") && (
            <ContainerTable>
              <ContainerFilters>
                <div>
                  <WrapperInput>
                    <Input
                      id="email-create-user"
                      placeholder="Search"
                      icon={Search}
                      props={undefined} // props={register("email")}
                    />
                  </WrapperInput>
                </div>
                <div>
                  {/* <div>
                    <Select
                      defaultValue={selectedOptionRole}
                      onChange={handleChangeOptionRole}
                      options={monthsSelect}
                      isSearchable={false}
                      styles={selectStyles}
                      placeholder="Month"
                    />
                  </div> */}
                </div>
              </ContainerFilters>
              <table>
                <ContainerHead>
                  <tr>
                    <td>Apartment</td>
                    <td>Residential</td>
                    <td>Address</td>
                    <td></td>
                  </tr>
                </ContainerHead>
                <ContainerBody>
                  {(listProjects || []).map(resi =>
                    resi.apartments.map(apart => (
                      <tr
                        onDoubleClick={() => handleDblClickView(`${apart.id}`)}
                      >
                        <NameStylesTD>
                          <div>
                            <span>
                              <img src={apart.picture} />
                            </span>
                            <div>
                              <span>{apart.name}</span>
                              <span>{apart.status}</span>
                            </div>
                          </div>
                        </NameStylesTD>

                        <NameStylesTD>
                          <div>
                            {/* <span>
                              <img src={resi.picture} />
                            </span> */}
                            <div>
                              <span>{resi.name}</span>
                            </div>
                          </div>
                        </NameStylesTD>
                        <ContainerActions>
                          <div>
                            <div onClick={() => toggleDropdown(`${apart.id}`)}>
                              <Ellipsis />
                            </div>
                            {dropdownVisible === `${apart.id}` && (
                              <ContainerDropdown
                                id={`dropdown_ov${apart.id}`}
                                tabIndex={0}
                                onBlur={handleCleanDropdown}
                              >
                                {(
                                  dataPermissions ||
                                  ({
                                    project: [],
                                  } as unknown as FilterPermissionsDTO)
                                ).project.includes("update") && (
                                  <span
                                    onClick={handleEditProject(`${apart.id}`)}
                                  >
                                    Edit
                                  </span>
                                )}
                                {(
                                  dataPermissions ||
                                  ({
                                    project: [],
                                  } as unknown as FilterPermissionsDTO)
                                ).project.includes("delete") && (
                                  <span
                                    onClick={handleDeleteProject(`${apart.id}`)}
                                  >
                                    Delete
                                  </span>
                                )}
                              </ContainerDropdown>
                            )}
                          </div>
                        </ContainerActions>
                      </tr>
                    )),
                  )}
                </ContainerBody>
              </table>
            </ContainerTable>
          )}
      </ContentStylesSection>
    </SectionRoute>
  )
}

export default Apartments
