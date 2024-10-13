import React from "react"
import {
  ClientStylesTD,
  ContentStylesSection,
  DateStylesTD,
  NameStylesTD,
  ProgressStylesTD,
} from "../../../properties.styles"
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
import {
  routeWithCustomReplace,
  routeWithReplaceId,
} from "../../../../../utils/path-util"
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
import { ContainerFilters } from "../../../../apartments/details/components/task/task.styles"
import Input from "../../../../../components/input/input"
import { Search } from "styled-icons/bootstrap"
import Select from "react-select"
import { User } from "styled-icons/boxicons-solid"
import { formatToDDMonth } from "../../../../../utils/date-util"
import { Ellipsis } from "styled-icons/fa-solid"
import ForbiddenAction from "../../../../../components/forbidden-action/forbidden-action"

const DetailsApartments: React.FC = () => {
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
        data?.apartment.includes(permission),
      )
    ) {
      return
    }
  }, [])

  const [listApartments, setListApartments] = React.useState<PropertyDTO>()
  const [isLoadingListProjects, setIsLoadingListProjects] =
    React.useState<boolean>(false)
  const [stadisticts, setStadisticts] = React.useState<StadisticsDTO>()
  const [dropdownVisible, setDropdownVisible] = React.useState<string | null>(
    null,
  )
  const { id: idProperty } = useParams<{ id: string }>()

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

  React.useEffect(() => {
    fetchDataProjects()
  }, [])

  const fetchDataProjects = React.useCallback(() => {
    const storedToken = handleGetToken()
    const data = handleGetPermissions()
    if (storedToken && !!data?.apartment.includes(APP_MENU.LIST)) {
      setIsLoadingListProjects(true)
      axios
        .get(
          `${settingsApp.api.base}/residentials/${idProperty}?include=apartments`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        )
        .then(response => {
          const dataResponse: PropertyDTO[] = response.data as PropertyDTO[]
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

  const handleDblClickView = (apartmentId: string) =>
    navigate(
      routeWithCustomReplace(pathRoutes.PROPERTIES.DETAIL.APARTMENTS_DETAIL, [
        ["id", idProperty!],
        ["apartmentId", apartmentId],
      ]),
    )

  return (
    <ContentStylesSection>
      {isLoadingListProjects && (
        <ContainerTable>
          <table>
            <ContainerHead>
              <tr>
                <td>Project</td>
                <td>Progress</td>
                <td>Client</td>
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
        listApartments.apartments.length <= 0 &&
        !!dataPermissions?.apartment.includes(APP_MENU.LIST) && (
          <>
            <ContainerTable>
              <table>
                <ContainerHead>
                  <tr>
                    <td>Project</td>
                    <td>Progress</td>
                    <td>Client</td>
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
      {!isLoadingListProjects &&
        !!listApartments &&
        listApartments.apartments.length > 0 &&
        !!dataPermissions &&
        dataPermissions.apartment.includes(APP_MENU.LIST) && (
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
                  <td>Progress</td>
                  <td>Client</td>
                  {/* <td>Due Date</td> */}
                  <td></td>
                </tr>
              </ContainerHead>
              <ContainerBody>
                {(listApartments.apartments || []).map(apartment => (
                  <tr
                    onDoubleClick={() => handleDblClickView(`${apartment.id}`)}
                  >
                    <NameStylesTD>
                      <div>
                        <span>
                          <img src={apartment.picture} />
                        </span>
                        <div>
                          <span>{apartment.name}</span>
                          <span>{apartment.status}</span>
                        </div>
                      </div>
                    </NameStylesTD>
                    {/* <ProgressStylesTD progress={apartment.progress}>
                      <div>
                        <span>{apartment.progress} %</span>
                        <div></div>
                        <span>{apartment.tasks_apart.length} services</span>
                      </div>
                    </ProgressStylesTD> */}
                    {/* <td>{project.contractors[0].fullName}</td> */}
                    <ClientStylesTD>
                      <div>
                        <span>
                          <User />
                        </span>
                        <span>{}</span>
                        <span>
                          {/* {project.clientId} */}
                          Zicia
                        </span>
                      </div>
                    </ClientStylesTD>
                    {/* <DateStylesTD>
                      <div>
                        <span>{formatToDDMonth("09/09/2024")}</span>
                      </div>
                    </DateStylesTD> */}
                    <ContainerActions>
                      <div>
                        <div onClick={() => toggleDropdown(`${apartment.id}`)}>
                          <Ellipsis />
                        </div>
                        {dropdownVisible === `${apartment.id}` && (
                          <ContainerDropdown
                            id={`dropdown_ov${apartment.id}`}
                            tabIndex={0}
                            onBlur={handleCleanDropdown}
                          >
                            {dataPermissions?.apartment.includes(
                              APP_MENU.UPDATE,
                            ) && (
                              <span
                                onClick={handleEditProject(`${apartment.id}`)}
                              >
                                Edit
                              </span>
                            )}
                            {dataPermissions?.apartment.includes(
                              APP_MENU.DELETE,
                            ) && (
                              <span
                                onClick={handleDeleteProject(`${apartment.id}`)}
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
      {!dataPermissions?.apartment.includes(APP_MENU.LIST) && (
        <ForbiddenAction />
      )}
    </ContentStylesSection>
  )
}

export default DetailsApartments
