import React from "react"
import { Outlet, useParams } from "react-router-dom"
import { useState } from "react"
import {
  DataBlock,
  DetailsContainer,
  TaskList,
  ImageContainer,
  InfoBlock,
  InfoItem,
  ContractorSection,
  IconWrapper,
  AddButton,
  Icon,
  Text,
  LeftSideDataBlock,
  InfoBlockUp,
  InfoBlockDown,
  NameProject,
  RightSideDataBlock,
  ProjectMenu,
  MenuItem,
  CalendarIcon,
  ClientNameProject,
  ContainerOutletProjectDetails,
} from "./details.styles"
import { routeWithReplaceId } from "../../../utils/path-util"
import { pathRoutes } from "../../../config/routes/path"
import {
  ApartmentDTO,
  PropertyDTO,
} from "../../../core/models/interfaces/property-model"
import useDataUser from "../../../utils/use-data-user"
import axios from "axios"
import { settingsApp } from "../../../config/environment/settings"
import { toast } from "sonner"
import { formatToDDMonth } from "../../../utils/date-util"
import Skeleton from "react-loading-skeleton"
import Button from "../../../components/button/button"
import ModalAddService from "../../../components/modal/variants/modal-add-service/modal-add-service"

const HeaderDetailApart: React.FC = () => {
  const [dataProject, setDataProject] = React.useState<ApartmentDTO>()
  const [isLoadingDataProject, setIsLoadingDataProject] =
    React.useState<boolean>(false)

  const [isOpenModalAdd, setIsOpenModalAdd] = React.useState(false)

  const handleOpenModalAdd = () => setIsOpenModalAdd(true)
  const handleCloseModalAdd = () => setIsOpenModalAdd(false)
  const handleAddServiceModal = () => setIsOpenModalAdd(false)

  const { id: idApartment } = useParams<{ id: string }>()

  const { handleGetToken } = useDataUser()

  React.useEffect(() => {
    fetchDataProjects()
  }, [])

  const fetchDataProjects = () => {
    setIsLoadingDataProject(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      axios
        .get(`${settingsApp.api.base}/apartments/${idApartment}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          const dataResponse: ApartmentDTO[] = response.data as ApartmentDTO[]
          if (!!dataResponse) {
            setDataProject(dataResponse[0])
            // setStadisticts(dataResponse.stadistics)
          }
          setIsLoadingDataProject(false)
        })
        .catch(err => {
          toast.error("Failed to fetch data")
          setIsLoadingDataProject(false)
        })
    }
  }

  return (
    <DetailsContainer>
      <DataBlock>
        <LeftSideDataBlock>
          <ImageContainer>
            <img src={!!dataProject ? dataProject.picture : ""} />
          </ImageContainer>
          <InfoBlock>
            {/*Nombre del proyecto */}
            <InfoBlockUp>
              <NameProject>
                {!isLoadingDataProject ? (
                  !!dataProject && dataProject.name
                ) : (
                  <Skeleton count={1} height={40} />
                )}
              </NameProject>
            </InfoBlockUp>
            {/*Datos como el cliente fecha y Contratista */}
            <InfoBlockDown>
              <InfoItem>
                <Text>
                  Detail:{" "}
                  <ClientNameProject>
                    {!!dataProject && dataProject.code}
                  </ClientNameProject>
                </Text>
              </InfoItem>
              <InfoItem>
                {/* <CalendarIcon />
                <Text>
                  {!isLoadingDataProject ? (
                    <>
                      {formatToDDMonth(
                        !!dataProject ? dataProject?.startDate : "",
                      )}{" "}
                      -
                      {formatToDDMonth(
                        !!dataProject ? dataProject?.dueDate : "",
                      )}
                    </>
                  ) : (
                    <Skeleton count={1} height={20} />
                  )}
                </Text> */}
                {/* <ButtonDown>
                  <ArrowDownIcon />
                </ButtonDown> */}
              </InfoItem>
              {/* <InfoItem>
                <Icon className="person-icon" />
                <Text>
                  {!isLoadingDataProject ? (
                    <span>Contractor: {dataProject?.clientId}</span>
                  ) : (
                    <Skeleton count={1} height={20} />
                  )}
                </Text> */}
              {/* <ButtonDown>
                  <ArrowDownIcon />
                </ButtonDown> */}
              {/* </InfoItem> */}
            </InfoBlockDown>
          </InfoBlock>
        </LeftSideDataBlock>
        <RightSideDataBlock>
          <Button text="New work" onClick={handleOpenModalAdd} />
        </RightSideDataBlock>
      </DataBlock>
      {/* Menu */}

      <ProjectMenu>
        {/* <MenuItem
          to={routeWithReplaceId(
            pathRoutes.PROJECTS.DETAIL.OVERVIEW,
            `${idProject}`,
          )}
          end
        >
          Overview
        </MenuItem> */}
        <MenuItem
          to={routeWithReplaceId(
            pathRoutes.APARTMENTS.DETAIL.SERVICES,
            `${idApartment}`,
          )}
        >
          Services
        </MenuItem>
        <MenuItem
          to={routeWithReplaceId(
            pathRoutes.APARTMENTS.DETAIL.ACTIVITY,
            `${idApartment}`,
          )}
        >
          Activity
        </MenuItem>
        {/* <MenuItem
          to={routeWithReplaceId(
            pathRoutes.PROJECTS.DETAIL.TASKS,
            `${idProject}`,
          )}
        >
          Tasks
        </MenuItem> */}
        {/* <MenuItem
          to={routeWithReplaceId(
            pathRoutes.APARTMENTS.DETAIL.CONTRACTORS,
            `${idProject}`,
          )}
        >
          Contractor
        </MenuItem> */}
        {/* <MenuItem
          to={routeWithReplaceId(
            pathRoutes.APARTMENTS.DETAIL.FILES,
            `${idProject}`,
          )}
        >
          Files
        </MenuItem> */}
        {/* <MenuItem
          to={routeWithReplaceId(
            pathRoutes.PROJECTS.DETAIL.SETTINGS,
            `${idProject}`,
          )}
        >
          Settings
        </MenuItem> */}
      </ProjectMenu>

      {/*Espacio para outlet y barra inferior*/}
      <ContainerOutletProjectDetails>
        <div>
          <Outlet />
        </div>
        <div></div>
      </ContainerOutletProjectDetails>
      <ModalAddService
        isOpen={isOpenModalAdd}
        handleClose={handleCloseModalAdd}
        handleRefreshData={handleAddServiceModal}
      />
    </DetailsContainer>
  )
}

export default HeaderDetailApart
