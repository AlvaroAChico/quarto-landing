import React from "react"
import {
  ClientStylesTD,
  ContentStylesSection,
  DateStylesTD,
  NameStylesTD,
  ProgressStylesTD,
} from "../../../../properties.styles"
import {
  ApartmentDTO,
  PropertyDTO,
  StadisticsDTO,
} from "../../../../../../core/models/interfaces/property-model"
import { FilterPermissionsDTO } from "../../../../../../core/models/interfaces/user-model"
import { useNavigate, useParams } from "react-router-dom"
import useDataUser from "../../../../../../utils/use-data-user"
import { pathRoutes } from "../../../../../../config/routes/path"
import axios from "axios"
import { settingsApp } from "../../../../../../config/environment/settings"
import { toast } from "sonner"
import { APP_MENU, months, monthsSelect } from "../../../../../../constants/app"
import { routeWithReplaceId } from "../../../../../../utils/path-util"
import {
  ContainerActions,
  ContainerBody,
  ContainerDropdown,
  ContainerHead,
  ContainerTable,
  NotFoundStyles,
  selectStyles,
  WrapperInput,
} from "../../../../../../config/theme/global-styles"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { ContainerFilters } from "../../task/task.styles"
import Input from "../../../../../../components/input/input"
import { Search } from "styled-icons/bootstrap"
import Select from "react-select"
import { User } from "styled-icons/boxicons-solid"
import { formatToDDMonth } from "../../../../../../utils/date-util"
import { Ellipsis } from "styled-icons/fa-solid"
import {
  ApartmentTitleStyles,
  ContentDetailsOulet,
  StatusStylesTD,
} from "./apartment-detail.styles"
import Button from "../../../../../../components/button/button"
import ModalAddService from "../../../../../../components/modal/variants/modal-add-service/modal-add-service"

const DetailsApartmentsById: React.FC = () => {
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
        data?.property.includes(permission),
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
  const [dataPermissions, setDataPermissions] =
    React.useState<FilterPermissionsDTO>()
  const { apartmentId } = useParams<{ apartmentId: string }>()

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
    console.log("Delete project -> ", projectId)
  }

  const handleClick = React.useCallback(() => {
    navigate(pathRoutes.PROPERTIES.CREATE)
  }, [])

  React.useEffect(() => {
    fetchDataProjects()
  }, [])

  const fetchDataProjects = React.useCallback(() => {
    setIsLoadingListProjects(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      axios
        .get(
          `${settingsApp.api.base}/apartments/${apartmentId}?include=works`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        )
        .then(response => {
          console.log("Response => ", response.data)
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
      routeWithReplaceId(pathRoutes.PROPERTIES.DETAIL.OVERVIEW, projectId),
    )

  const [isOpenModalAdd, setIsOpenModalAdd] = React.useState(false)
  const [dataServiceAdd, setDataServiceAdd] = React.useState(false)

  const handleOpenModalAdd = () => setIsOpenModalAdd(true)
  const handleCloseModalAdd = () => setIsOpenModalAdd(false)
  const handleAddServiceModal = () => setIsOpenModalAdd(false)
  return (
    <>
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
            !!listApartments.works && (
              <ContainerTable>
                <ApartmentTitleStyles>
                  <div>
                    <span>{listApartments?.name}</span>
                  </div>
                  <div>
                    <Button text="New work" onClick={handleOpenModalAdd} />
                  </div>
                </ApartmentTitleStyles>
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
                      <td>Service</td>
                      <td>Status</td>
                      <td>Contractor</td>
                      <td>Due Date</td>
                      <td>Notes</td>
                      <td></td>
                    </tr>
                  </ContainerHead>
                  <ContainerBody>
                    {(listApartments.works || []).map(work => (
                      <tr
                      // onDoubleClick={() => handleDblClickView(`${service.id}`)}
                      >
                        <NameStylesTD>
                          <div>
                            {/* <span>
                          <img src={service.picture} />
                        </span> */}
                            <div>
                              <span>
                                {work.serviceId == 1
                                  ? "Clean"
                                  : work.serviceId == 2
                                    ? "Paint"
                                    : work.serviceId == 3
                                      ? "Miscellaneus"
                                      : "Resurfacing"}
                              </span>
                              {/* <span>{service.status}</span> */}
                            </div>
                          </div>
                        </NameStylesTD>
                        <StatusStylesTD
                          status={
                            work.statusId == 1 ? "Created" : "In progress"
                          }
                        >
                          <div>
                            <span>
                              {work.statusId == 1 ? "Created" : "In progress"}
                            </span>
                          </div>
                        </StatusStylesTD>
                        {/* <td>{project.contractors[0].fullName}</td> */}
                        <ClientStylesTD>
                          <div>
                            <span>
                              <User />
                            </span>
                            <span>{}</span>
                            <span>
                              {/* {work.contractorId} */}
                              Joe Doe
                            </span>
                          </div>
                        </ClientStylesTD>
                        <DateStylesTD>
                          <div>
                            <span>{formatToDDMonth(work.startDate)}</span>
                          </div>
                        </DateStylesTD>
                        <ClientStylesTD>
                          <div>
                            <span>{work.customerNotes}</span>
                          </div>
                        </ClientStylesTD>
                        <ContainerActions>
                          <div>
                            <div onClick={() => toggleDropdown(`${work.id}`)}>
                              <Ellipsis />
                            </div>
                            {dropdownVisible === `${work.id}` && (
                              <ContainerDropdown
                                id={`dropdown_ov${work.id}`}
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
                                    onClick={handleEditProject(`${work.id}`)}
                                  >
                                    Completed
                                  </span>
                                )}
                                {(
                                  dataPermissions ||
                                  ({
                                    project: [],
                                  } as unknown as FilterPermissionsDTO)
                                ).property.includes(APP_MENU.UPDATE) && (
                                  <span
                                    onClick={handleEditProject(`${work.id}`)}
                                  >
                                    Approved
                                  </span>
                                )}
                                {(
                                  dataPermissions ||
                                  ({
                                    project: [],
                                  } as unknown as FilterPermissionsDTO)
                                ).property.includes(APP_MENU.UPDATE) && (
                                  <span
                                    onClick={handleEditProject(`${work.id}`)}
                                  >
                                    Rejected
                                  </span>
                                )}
                                {(
                                  dataPermissions ||
                                  ({
                                    project: [],
                                  } as unknown as FilterPermissionsDTO)
                                ).property.includes(APP_MENU.UPDATE) && (
                                  <span
                                    onClick={handleEditProject(`${work.id}`)}
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
                                    onClick={handleDeleteProject(`${work.id}`)}
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
                {!isLoadingListProjects &&
                  !!listApartments &&
                  !!listApartments.works &&
                  listApartments.works.length <= 0 && (
                    <NotFoundStyles>
                      <span>No works found</span>
                    </NotFoundStyles>
                  )}
              </ContainerTable>
            )}
        </ContentStylesSection>
      </ContentDetailsOulet>
      <ModalAddService
        isOpen={isOpenModalAdd}
        apartmentId={apartmentId || ""}
        handleClose={handleCloseModalAdd}
        handleRefreshData={handleAddServiceModal}
      />
    </>
  )
}

export default DetailsApartmentsById
