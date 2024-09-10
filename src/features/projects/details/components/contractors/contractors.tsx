import React from "react"
import {
  ContainerTasks,
  HeaderTask,
  TaskTitle,
  NewTaskButton,
  FilterContainer,
  DateButton,
  FilterButton,
  CalendarIconStyled,
  ArrowDropDownIconStyled,
  TrashIconStyled,
  DownloadIconStyled,
  FilterRow,
  ContainerFilterTask,
  FilterRowLeft,
  FilterRowRight,
  TableHeader,
  TaskContainer,
  TaskRow,
  ContainerStatusTask,
  StatusPointTasks,
  ContainerTaskProgress,
  ContainerFilters,
} from "./contractors.styles"
import {
  ProjectDTO,
  TaskDTO,
} from "../../../../../core/models/interfaces/project-model"
import { useNavigate, useParams } from "react-router-dom"
import useDataUser from "../../../../../utils/use-data-user"
import { settingsApp } from "../../../../../config/environment/settings"
import { toast } from "sonner"
import axios from "axios"
import { formatToDDMonth } from "../../../../../utils/date-util"
import {
  ClasicStylesTD,
  ContainerActions,
  ContainerBody,
  ContainerDropdown,
  ContainerHead,
  ContainerTable,
  NotFoundStyles,
  selectStyles,
  WrapperInput,
} from "../../../../../config/theme/global-styles"
import { ContainerNameRoleTD } from "../../../../roles/roles.styles"
import { Ellipsis } from "@styled-icons/fa-solid/Ellipsis"
import { FilterPermissionsDTO } from "../../../../../core/models/interfaces/user-model"
import Input from "../../../../../components/input/input"
import { Plus, Search } from "styled-icons/bootstrap"
import Select from "react-select"
import { monthsSelect } from "../../../../../constants/app"
import Skeleton from "react-loading-skeleton"
import { FileDTO } from "../../../../../core/models/interfaces/file-model"
import Button from "../../../../../components/button/button"
import { ContractorDTO } from "../../../../../core/models/interfaces/contractor-model"

const DetailContractors: React.FC = () => {
  const [dataContractor, setDataContractor] = React.useState<ContractorDTO[]>()
  const [isOpenModalEdit, setIsOpenModalEdit] = React.useState<boolean>(false)
  const [isLoadingDataProject, setIsLoadingDataProject] =
    React.useState<boolean>(false)
  const [dropdownVisible, setDropdownVisible] = React.useState<string | null>(
    null,
  )
  const [dataTaskDelete, setDataTaskDelete] = React.useState<TaskDTO>()
  const [dataTaskEdit, setDataTaskEdit] = React.useState<TaskDTO>()
  const { id: idProject } = useParams<{ id: string }>()
  const [dataPermissions, setDataPermissions] =
    React.useState<FilterPermissionsDTO>()
  const [selectedOptionRole, setSelectedOptionRole] = React.useState(null)
  const [optionsRoles, setOptionsRoles] = React.useState<any>([])
  const handleChangeOptionRole = (value: any) => {
    setSelectedOptionRole(value)
  }

  const today = new Date().toLocaleDateString()
  const navigate = useNavigate()

  const { handleGetToken, handleGetPermissions } = useDataUser()

  const handleEditTask = React.useCallback(
    (taskId: string) => () => {
      //   setDataTaskEdit(
      //     (dataProject?.tasks || []).filter(task => `${task.id}` == taskId)[0],
      //   )
      //   setIsOpenModalEdit(true)
    },
    [],
  )

  const handleDeleteTask = React.useCallback(
    (roleId: string) => () => {
      // setDataRoleDelete(listRoles.filter(role => `${role.id}` == roleId)[0])
      // setIsOpenModalDelete(true)
    },
    [],
  )

  const getCookiesDataPermission = React.useCallback(() => {
    const data = handleGetPermissions()
    if (!!data) {
      setDataPermissions(data)
    }
  }, [handleGetPermissions])

  React.useEffect(() => {
    getCookiesDataPermission()
  }, [])

  React.useEffect(() => {
    fetchDataProjects()
  }, [])

  const fetchDataProjects = React.useCallback(() => {
    setIsLoadingDataProject(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      axios
        .get(
          `${settingsApp.api.base}/contractors?include=user&filter[id]=${idProject}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        )
        .then(response => {
          const dataResponse: ContractorDTO[] = response.data as ContractorDTO[]
          if (!!dataResponse) {
            setDataContractor(dataResponse)
            // setStadisticts(dataResponse.stadistics)
          }
          setIsLoadingDataProject(false)
        })
        .catch(err => {
          toast.error("Failed to fetch data")
          setIsLoadingDataProject(false)
        })
    }
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

  return (
    <ContainerTasks>
      <HeaderTask>
        <TaskTitle>Contractors</TaskTitle>
        {/* <NewTaskButton>
          <CalendarIconStyled size={20} />
          <span>New File</span>
        </NewTaskButton> */}
        <Button text={"Asign"} onClick={() => console.log} IconLeft={Plus} />
      </HeaderTask>

      {isLoadingDataProject && (
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
                <td colSpan={5}>
                  <Skeleton count={3} height={40} />
                </td>
              </tr>
            </ContainerBody>
          </table>
        </ContainerTable>
      )}
      {!isLoadingDataProject &&
        !!dataContractor &&
        (dataContractor || []).length <= 0 && (
          <>
            <ContainerTable>
              <table>
                <ContainerHead>
                  <tr>
                    <td>Name</td>
                    <td>Email</td>
                    <td>CreatedAt</td>
                    <td></td>
                  </tr>
                </ContainerHead>
              </table>
              <NotFoundStyles>
                <span>No contractor found</span>
              </NotFoundStyles>
            </ContainerTable>
          </>
        )}
      {!isLoadingDataProject &&
        !!dataContractor &&
        (dataContractor || []).length > 0 &&
        !!dataPermissions &&
        dataPermissions.task.includes("list") && (
          <ContainerTable>
            {/* <ContainerFilters>
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
            </ContainerFilters> */}
            <table>
              <ContainerHead>
                <tr>
                  <td>Name</td>
                  <td>Email</td>
                  <td>CreatedAt</td>
                  <td></td>
                </tr>
              </ContainerHead>
              <ContainerBody>
                {(dataContractor || []).map(contractor => (
                  <tr>
                    <ContainerNameRoleTD>
                      <div>
                        <span>
                          {contractor.user.firstName} {contractor.user.lastName}
                        </span>
                      </div>
                    </ContainerNameRoleTD>
                    <ClasicStylesTD>
                      <div>
                        <span>{contractor.user.email}</span>
                      </div>
                    </ClasicStylesTD>
                    <ClasicStylesTD>
                      <div>
                        <span>{formatToDDMonth(contractor.createdAt)}</span>
                      </div>
                    </ClasicStylesTD>
                    <ContainerActions>
                      <div>
                        <div onClick={() => toggleDropdown(`${contractor.id}`)}>
                          <Ellipsis />
                        </div>
                        {dropdownVisible === `${contractor.id}` && (
                          <ContainerDropdown
                            id={`dropdown_ov${contractor.id}`}
                            tabIndex={0}
                            onBlur={handleCleanDropdown}
                          >
                            {(
                              dataPermissions ||
                              ({
                                role: [],
                              } as unknown as FilterPermissionsDTO)
                            ).role.includes("update") && (
                              <span
                                onClick={handleEditTask(`${contractor.id}`)}
                              >
                                Edit
                              </span>
                            )}
                            {(
                              dataPermissions ||
                              ({
                                role: [],
                              } as unknown as FilterPermissionsDTO)
                            ).role.includes("delete") && (
                              <span
                                onClick={handleDeleteTask(`${contractor.id}`)}
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
          </ContainerTable>
        )}
      {/* </ContainerFilterTask> */}
    </ContainerTasks>
  )
}

export default DetailContractors
