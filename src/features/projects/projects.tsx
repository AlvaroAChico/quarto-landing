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
} from "./projects.styles"
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
  selectStyles,
  WrapperInput,
} from "../../config/theme/global-styles"
import Input from "../../components/input/input"
import { Search } from "styled-icons/bootstrap"
import Select from "react-select"
import useDataUser from "../../utils/use-data-user"
import { settingsApp } from "../../config/environment/settings"
import { FilterPermissionsDTO } from "../../core/models/interfaces/user-model"

const Projects: React.FC = () => {
  const [listProjects, setListProjects] = React.useState<ProjectDTO[]>([])
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
  // navigate(`/role/${projectId}`)

  const handleDeleteProject = (projectId: string) => () => {
    handleCleanDropdown()
    console.log("Delete project -> ", projectId)
  }

  const handleClick = React.useCallback(() => {
    navigate(pathRoutes.PROJECTS.CREATE)
  }, [])

  React.useEffect(() => {
    fetchDataProjects()
  }, [])

  const fetchDataProjects = React.useCallback(() => {
    const storedToken = handleGetToken()
    if (!!storedToken) {
      axios
        .get(`${settingsApp.api.base}/projects`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          console.log("Response => ", response.data)
          const dataResponse: ProjectResponseDTO =
            response.data as ProjectResponseDTO
          if (
            !!dataResponse &&
            !!dataResponse.stadistics &&
            !!dataResponse.listProjects
          ) {
            setListProjects(dataResponse.listProjects)
            setStadisticts(dataResponse.stadistics)
          }
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

  const formatDate = (date: string) => {
    const [day, month] = date.split("/")

    return `${day} ${months[parseInt(month) - 1]}`
  }
  const [selectedOptionRole, setSelectedOptionRole] = React.useState(null)
  const [optionsRoles, setOptionsRoles] = React.useState<any>([])
  const handleChangeOptionRole = (value: any) => {
    setSelectedOptionRole(value)
  }

  return (
    <SectionRoute>
      <HeaderSection
        title="Projects"
        subtitle="Projects"
        nameButton="New Project"
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
              />
              <ContractorCard
                data={
                  stadisticts?.contractors || ({} as StadisticsPropertiesDTO)
                }
              />
            </>
          )}
        </CardStadistics>
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
                <td>Project</td>
                <td>Progress</td>
                {/* <td>Contractor</td> */}
                <td>Client</td>
                <td>Due Date</td>
                <td></td>
              </tr>
            </ContainerHead>
            <ContainerBody>
              {(listProjects || []).map(project => (
                <tr>
                  <NameStylesTD>
                    <div>
                      <span>{project.name}</span>
                      <span>{project.status}</span>
                    </div>
                  </NameStylesTD>
                  <ProgressStylesTD progress={project.progress}>
                    <div>
                      <span>{project.progress} %</span>
                      <div></div>
                      <span>{project.pending_task} tasks</span>
                    </div>
                  </ProgressStylesTD>
                  {/* <td>{project.contractors[0].fullName}</td> */}
                  <ClientStylesTD>
                    <div>
                      <span>
                        <User />
                      </span>
                      <span>{project.client.split(" ")[1]}</span>
                    </div>
                  </ClientStylesTD>
                  <DateStylesTD>
                    <div>
                      <span>{formatDate(project.dueDate)}</span>
                    </div>
                  </DateStylesTD>
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
                          <span onClick={handleEditProject(`${project.id}`)}>
                            Editar
                          </span>
                          <span onClick={handleDeleteProject(`${project.id}`)}>
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
      </ContentStylesSection>
    </SectionRoute>
  )
}

export default Projects
