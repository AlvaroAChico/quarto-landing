import React from "react"
import { StadisticsPropertiesDTO } from "../../../../core/models/interfaces/project-model"
import {
  ContainerCard,
  ContainerHeadTitle,
  ContainerDataContractors,
  ContainerAvatar,
  ContainerAvatarPlus,
} from "./contractor-card.styles"

interface IOwnProps {
  data: StadisticsPropertiesDTO
}

const ContractorCard: React.FC<IOwnProps> = ({ data }) => {
  return (
    <ContainerCard>
      <ContainerHeadTitle>
        <h4>
          <span>{data.total}</span> Contractor
        </h4>
      </ContainerHeadTitle>
      <ContainerDataContractors>
        <ContainerAvatar>AC</ContainerAvatar>
        <ContainerAvatar>AC</ContainerAvatar>
        <ContainerAvatar>AC</ContainerAvatar>
        <ContainerAvatar>AC</ContainerAvatar>
        {data.total > 4 && <ContainerAvatarPlus>+</ContainerAvatarPlus>}
      </ContainerDataContractors>
    </ContainerCard>
  )
}

export default ContractorCard
