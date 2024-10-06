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
} from "./task.styles"
import {
  PropertyDTO,
  TaskDTO,
} from "../../../../../core/models/interfaces/property-model"
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
import { Search } from "styled-icons/bootstrap"
import Select from "react-select"
import { monthsSelect } from "../../../../../constants/app"
import Skeleton from "react-loading-skeleton"

const DetailsTask: React.FC = () => {
  const [dataProject, setDataProject] = React.useState<PropertyDTO>()
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
    [dataProject],
  )

  const handleDeleteTask = React.useCallback(
    (roleId: string) => () => {
      // setDataRoleDelete(listRoles.filter(role => `${role.id}` == roleId)[0])
      // setIsOpenModalDelete(true)
    },
    [dataProject],
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
          `${settingsApp.api.base}/properties?include=tasks&filter[id]=${idProject}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        )
        .then(response => {
          const dataResponse: PropertyDTO = response.data[0] as PropertyDTO
          if (!!dataResponse) {
            setDataProject(dataResponse)
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

  // Simulando una lista de tareas
  const tasks = Array.from({ length: 10 }, (_, index) => ({
    task: `Task ${index + 1}`,
    category: "Category",
    contractor: "Contractor",
    status: "Status",
    completion: "Completion",
    dueDate: "DueDate",
  }))
  return (
    <ContainerTasks>
      <HeaderTask>
        <TaskTitle>Tasks</TaskTitle>
        <NewTaskButton>
          <CalendarIconStyled size={20} />
          <span>New Task</span>
        </NewTaskButton>
      </HeaderTask>

      {/* <ContainerFilterTask> */}
      {/* <FilterRow> */}
      {/* <FilterRowLeft>
        <DateButton>
          <CalendarIconStyled size={20} />
          <span>Today</span>
          <span>{today}</span>
        </DateButton>
      </FilterRowLeft>
      <FilterRowRight> */}
      {/* <FilterButton>
              <SearchIconStyled size={20} />
            </FilterButton> */}
      {/* <FilterButton>
              <span>Filter</span>
              <ArrowDropDownIconStyled size={20} />
            </FilterButton> */}
      {/* <FilterButton>
              <span>Month</span>
              <ArrowDropDownIconStyled size={20} />
            </FilterButton> */}
      {/* <FilterButton>
              <TrashIconStyled size={20} />
            </FilterButton>
            <FilterButton>
              <DownloadIconStyled size={20} />
            </FilterButton> */}
      {/* </FilterRowRight> */}
      {/* </FilterRow> */}
      {/* <FilterContainer> */}
      {isLoadingDataProject && (
        <ContainerTable>
          <table>
            <ContainerHead>
              <tr>
                <td>Task</td>
                <td>Status</td>
                <td>Progress</td>
                <td>Due date</td>
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
        !!dataProject &&
        (dataProject?.tasks || []).length <= 0 && (
          <>
            <ContainerTable>
              <table>
                <ContainerHead>
                  <tr>
                    <td>Task</td>
                    <td>Status</td>
                    <td>Progress</td>
                    <td>Due date</td>
                    <td></td>
                  </tr>
                </ContainerHead>
              </table>
              <NotFoundStyles>
                <span>No tasks found</span>
              </NotFoundStyles>
            </ContainerTable>
          </>
        )}
      {!isLoadingDataProject &&
        !!dataProject &&
        (dataProject?.tasks || []).length > 0 &&
        !!dataPermissions &&
        dataPermissions.service.includes("list") && (
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
                  <td>Task</td>
                  <td>Status</td>
                  <td>Progress</td>
                  <td>Due date</td>
                  <td></td>
                </tr>
              </ContainerHead>
              <ContainerBody>
                {(dataProject?.tasks || []).map((task: any) => (
                  <tr>
                    <ContainerNameRoleTD>
                      <div>
                        <span>{task.name}</span>
                      </div>
                    </ContainerNameRoleTD>
                    <ContainerStatusTask>
                      <div>
                        <StatusPointTasks progress={task.progress} />
                        <span>Pending</span>
                      </div>
                    </ContainerStatusTask>
                    <ContainerTaskProgress progress={task.progress}>
                      <div />
                    </ContainerTaskProgress>
                    <ClasicStylesTD>
                      <div>
                        <span>{formatToDDMonth(task.dueDate)}</span>
                      </div>
                    </ClasicStylesTD>
                    <ContainerActions>
                      <div>
                        <div onClick={() => toggleDropdown(`${task.id}`)}>
                          <Ellipsis />
                        </div>
                        {dropdownVisible === `${task.id}` && (
                          <ContainerDropdown
                            id={`dropdown_ov${task.id}`}
                            tabIndex={0}
                            onBlur={handleCleanDropdown}
                          >
                            {(
                              dataPermissions ||
                              ({
                                role: [],
                              } as unknown as FilterPermissionsDTO)
                            ).role.includes("update") && (
                              <span onClick={handleEditTask(`${task.id}`)}>
                                Edit
                              </span>
                            )}
                            {(
                              dataPermissions ||
                              ({
                                role: [],
                              } as unknown as FilterPermissionsDTO)
                            ).role.includes("delete") && (
                              <span onClick={handleDeleteTask(`${task.id}`)}>
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

export default DetailsTask
