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
  ArrowDownIcon,
  ButtonDown,
  ContainerOutletProjectDetails,
} from "./details.styles"

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [isActive, setIsActive] = useState(false)

  const handleToggle = () => {
    setIsActive(prevState => !prevState)
  }

  return (
    <DetailsContainer>
      <DataBlock>

        <LeftSideDataBlock>
          <ImageContainer />
          <InfoBlock>
         {/*Nombre del proyecto */}
            <InfoBlockUp>
              <NameProject>Construction of Central Park</NameProject>
            </InfoBlockUp>
          {/*Datos como el cliente fecha y Contratista */}
            <InfoBlockDown>
              <InfoItem>
                <Text>
                  Cliente: <ClientNameProject>Zicia</ClientNameProject>
                </Text>
              </InfoItem>
              <InfoItem>
                <CalendarIcon />
                <Text>23-Mar - 12 Apr</Text>
                <ButtonDown>
                  <ArrowDownIcon />
                </ButtonDown>
              </InfoItem>
              <InfoItem>
                <Icon className="person-icon" />
                <Text>Contractor 1</Text>
                <ButtonDown>
                  <ArrowDownIcon />
                </ButtonDown>
              </InfoItem>
            </InfoBlockDown>
          </InfoBlock>
        </LeftSideDataBlock>

        <RightSideDataBlock>
          <Text>Contractor:</Text>
          {/*Falta hacer el bucle , de acuerdo a la cantidad de trabajadores */}
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
        </RightSideDataBlock>

      </DataBlock>
          {/*Menu*/}

      <ProjectMenu>
        <MenuItem to={`/projects/${id}/detail/overview`} end>
          Overview
        </MenuItem>
        <MenuItem to={`/projects/${id}/detail/activity`}>Activity</MenuItem>
        <MenuItem to={`/projects/${id}/detail/tasks`}>Tasks</MenuItem>
        <MenuItem to={`/projects/${id}/detail/contractor`}>Contractor</MenuItem>
        <MenuItem to={`/projects/${id}/detail/file`}>File</MenuItem>
        <MenuItem to={`/projects/${id}/detail/settings`}>Settings</MenuItem>
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

export default Details
