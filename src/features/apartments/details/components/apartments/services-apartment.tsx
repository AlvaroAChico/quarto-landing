import React from "react"
import {
  ClientStylesTD,
  ContentStylesSection,
  DateStylesTD,
  NameStylesTD,
  ProgressStylesTD,
} from "../../../apartments.styles"
import {
  ApartmentDTO,
  PropertyDTO,
  StadisticsDTO,
} from "../../../../../core/models/interfaces/property-model"
import { FilterPermissionsDTO } from "../../../../../core/models/interfaces/user-model"
import { useNavigate, useParams } from "react-router-dom"
import useDataUser from "../../../../../utils/use-data-user"
import { pathRoutes } from "../../../../../config/routes/path"
import axios from "axios"
import { settingsApp } from "../../../../../config/environment/settings"
import { toast } from "sonner"
import { APP_MENU, months, monthsSelect } from "../../../../../constants/app"
import { routeWithReplaceId } from "../../../../../utils/path-util"
import {
  ContainerActions,
  ContainerBody,
  ContainerDropdown,
  ContainerHead,
  ContainerTable,
  NotFoundStyles,
  selectStyles,
  WrapperInput,
} from "../../../../../config/theme/global-styles"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { ContainerFilters } from "../task/task.styles"
import Input from "../../../../../components/input/input"
import { Search } from "styled-icons/bootstrap"
import Select from "react-select"
import { User } from "styled-icons/boxicons-solid"
import { formatToDDMonth } from "../../../../../utils/date-util"
import { Ellipsis } from "styled-icons/fa-solid"
import {
  ApartmentTitleStyles,
  ButtonsStyles,
  ContentDetailsOulet,
  HeaderDetailStyles,
  StatusStylesTD,
} from "./apartment-detail.styles"
import Button from "../../../../../components/button/button"
import ForbiddenAction from "../../../../../components/forbidden-action/forbidden-action"

const ServicesApartment: React.FC = () => {
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
        data?.user.includes(permission),
      )
    ) {
      return
    }
  }, [])
  const [listApartments, setListApartments] = React.useState<ApartmentDTO>()
  const [isLoadingListProjects, setIsLoadingListProjects] =
    React.useState<boolean>(false)
  const [stadisticts, setStadisticts] = React.useState<StadisticsDTO>()
  const [dropdownVisible, setDropdownVisible] = React.useState<string | null>(
    null,
  )
  const { id: idApartment } = useParams<{ id: string }>()

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
  }

  const handleDeleteProject = (projectId: string) => () => {
    handleCleanDropdown()
  }

  const handleClick = React.useCallback(() => {
    navigate(pathRoutes.APARTMENTS.CREATE)
  }, [])

  React.useEffect(() => {
    fetchDataProjects()
  }, [])

  const fetchDataProjects = React.useCallback(() => {
    const storedToken = handleGetToken()
    const data = handleGetPermissions()
    if (
      storedToken &&
      (!!data?.work.includes(APP_MENU.LIST) ||
        !!data?.work.includes(APP_MENU.READ_OWN))
    ) {
      setIsLoadingListProjects(true)
      axios
        .get(
          `${settingsApp.api.base}/apartments/${idApartment}?include=works,service,status`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        )
        .then(response => {
          const dataResponse: ApartmentDTO[] = response.data as ApartmentDTO[]
          if (!!dataResponse) {
            setListApartments(dataResponse[0])
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
      routeWithReplaceId(pathRoutes.APARTMENTS.DETAIL.OVERVIEW, projectId),
    )

  return (
    <ContentDetailsOulet>
      <ContentStylesSection>
        {isLoadingListProjects && (
          <ContainerTable>
            <table>
              <ContainerHead>
                <tr>
                  <td>Service</td>
                  <td>Status</td>
                  <td>Contractor</td>
                  <td>Due Date</td>
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
          !!listApartments &&
          !!!!listApartments.works &&
          (listApartments.works || []).length <= 0 &&
          (!!dataPermissions?.work.includes(APP_MENU.LIST) ||
            !!dataPermissions?.work.includes(APP_MENU.READ_OWN)) && (
            <>
              <ContainerTable>
                <table>
                  <ContainerHead>
                    <tr>
                      <td>Service</td>
                      <td>Status</td>
                      <td>Contractor</td>
                      <td>Due Date</td>
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
        <ContainerTable>
          {/* <HeaderDetailStyles> */}
          {/* <ApartmentTitleStyles> */}
          {/* <div>
                    <img src={listApartments.picture} />
                  </div>
                  <div>
                    <span>{listApartments?.name}</span>
                    <span>{listApartments?.status</span>
                  </div> */}
          {/* </ApartmentTitleStyles> */}
          {/* </HeaderDetailStyles> */}
          <ContainerFilters>
            <div>
              {!!listApartments &&
                !!listApartments.works &&
                listApartments.works.length > 0 &&
                (dataPermissions?.work.includes(APP_MENU.LIST) ||
                  dataPermissions?.work.includes(APP_MENU.READ_OWN)) && (
                  <WrapperInput>
                    <Input
                      id="email-create-user"
                      placeholder="Search"
                      icon={Search}
                      props={undefined} // props={register("email")}
                    />
                  </WrapperInput>
                )}
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
            {!!listApartments &&
              !!listApartments.works &&
              listApartments.works.length > 0 &&
              (dataPermissions?.work.includes(APP_MENU.LIST) ||
                dataPermissions?.work.includes(APP_MENU.READ_OWN)) && (
                <ContainerHead>
                  <tr>
                    <td>Service</td>
                    <td>Status</td>
                    <td>Contractor</td>
                    <td>Due Date</td>
                    <td></td>
                  </tr>
                </ContainerHead>
              )}
            <ContainerBody>
              {!!listApartments &&
                !!listApartments.works &&
                listApartments.works.length > 0 &&
                (dataPermissions?.work.includes(APP_MENU.LIST) ||
                  dataPermissions?.work.includes(APP_MENU.READ_OWN)) &&
                (listApartments.works || []).map(service => (
                  <tr
                  // onDoubleClick={() => handleDblClickView(`${service.id}`)}
                  >
                    <NameStylesTD>
                      <div>
                        {/* <span>
                          <img src={service.picture} />
                        </span> */}
                        <div>
                          <span>{service.serviceId}</span>
                          {/* <span>{service.status}</span> */}
                        </div>
                      </div>
                    </NameStylesTD>
                    <StatusStylesTD status={service.statusId ? "" : ""}>
                      <div>
                        <span>{service.statusId}</span>
                      </div>
                    </StatusStylesTD>
                    {/* <td>{project.contractors[0].fullName}</td> */}
                    <ClientStylesTD>
                      <div>
                        <span>
                          <User />
                        </span>
                        <span>{}</span>
                        <span>Zicia</span>
                      </div>
                    </ClientStylesTD>
                    <DateStylesTD>
                      <div>
                        <span>{formatToDDMonth(service.startDate)}</span>
                      </div>
                    </DateStylesTD>
                    <ContainerActions>
                      <div>
                        <div onClick={() => toggleDropdown(`${service.id}`)}>
                          <Ellipsis />
                        </div>
                        {dropdownVisible === `${service.id}` && (
                          <ContainerDropdown
                            id={`dropdown_ov${service.id}`}
                            tabIndex={0}
                            onBlur={handleCleanDropdown}
                          >
                            {(
                              dataPermissions ||
                              ({
                                project: [],
                              } as unknown as FilterPermissionsDTO)
                            ).apartment.includes(APP_MENU.UPDATE) && (
                              <span
                                onClick={handleEditProject(`${service.id}`)}
                              >
                                Edit
                              </span>
                            )}
                            {(
                              dataPermissions ||
                              ({
                                project: [],
                              } as unknown as FilterPermissionsDTO)
                            ).apartment.includes(APP_MENU.DELETE) && (
                              <span
                                onClick={handleDeleteProject(`${service.id}`)}
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
          {!dataPermissions?.work.includes(APP_MENU.LIST) &&
            !dataPermissions?.work.includes(APP_MENU.READ_OWN) && (
              <ForbiddenAction />
            )}
        </ContainerTable>
      </ContentStylesSection>
    </ContentDetailsOulet>
  )
}

export default ServicesApartment
