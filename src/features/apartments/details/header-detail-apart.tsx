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
  ProjectDTO,
} from "../../../core/models/interfaces/project-model"
import useDataUser from "../../../utils/use-data-user"
import axios from "axios"
import { settingsApp } from "../../../config/environment/settings"
import { toast } from "sonner"
import { formatToDDMonth } from "../../../utils/date-util"
import Skeleton from "react-loading-skeleton"

const HeaderDetailApart: React.FC = () => {
  const [dataProject, setDataProject] = React.useState<ApartmentDTO>()
  const [isLoadingDataProject, setIsLoadingDataProject] =
    React.useState<boolean>(false)
  const { id: idProject } = useParams<{ id: string }>()

  const { handleGetToken } = useDataUser()

  React.useEffect(() => {
    fetchDataProjects()
  }, [])

  const fetchDataProjects = React.useCallback(() => {
    setIsLoadingDataProject(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      axios
        .get(`${settingsApp.api.base}/apartment/${idProject}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          console.log("Response 01 => ", response.data)
          const dataResponse: ApartmentDTO = response.data as ApartmentDTO
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

  return (
    <DetailsContainer>
      <DataBlock>
        <LeftSideDataBlock>
          <ImageContainer>
            <img src={!!dataProject ? dataProject?.picture : ""} />
          </ImageContainer>
          <InfoBlock>
            {/*Nombre del proyecto */}
            <InfoBlockUp>
              <NameProject>
                {!isLoadingDataProject ? (
                  !!dataProject && dataProject?.name
                ) : (
                  <Skeleton count={1} height={40} />
                )}
              </NameProject>
            </InfoBlockUp>
            {/*Datos como el cliente fecha y Contratista */}
            <InfoBlockDown>
              <InfoItem>
                <Text>
                  Cliente:{" "}
                  <ClientNameProject>
                    {/* {!!dataProject && dataProject?.clientId} */}
                    Zicia
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

        {/*Falta hacer el bucle , de acuerdo a la cantidad de trabajadores */}
        {/* <RightSideDataBlock>
          <Text>Contractor:</Text>
          <ContractorSection>
            <IconWrapper>👤</IconWrapper>
            <IconWrapper>👤</IconWrapper>
            <IconWrapper>👤</IconWrapper>
            <IconWrapper>👤</IconWrapper>
            <IconWrapper>
              <AddButton>+2</AddButton>
            </IconWrapper>
            <AddButton>+</AddButton>
          </ContractorSection>
        </RightSideDataBlock> */}
      </DataBlock>
      {/*Menu*/}

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
            `${idProject}`,
          )}
        >
          Services
        </MenuItem>
        {/* <MenuItem
          to={routeWithReplaceId(
            pathRoutes.PROJECTS.DETAIL.ACTIVITY,
            `${idProject}`,
          )}
        >
          Activity
        </MenuItem> */}
        {/* <MenuItem
          to={routeWithReplaceId(
            pathRoutes.PROJECTS.DETAIL.TASKS,
            `${idProject}`,
          )}
        >
          Tasks
        </MenuItem> */}
        <MenuItem
          to={routeWithReplaceId(
            pathRoutes.PROJECTS.DETAIL.CONTRACTORS,
            `${idProject}`,
          )}
        >
          Contractor
        </MenuItem>
        <MenuItem
          to={routeWithReplaceId(
            pathRoutes.PROJECTS.DETAIL.FILES,
            `${idProject}`,
          )}
        >
          Files
        </MenuItem>
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
    </DetailsContainer>
  )
}

export default HeaderDetailApart
