import React from "react"
import { ContainerCard, ContainerHeadTitle } from "./stadistics-card.styles"

interface IOwnProps {
  data: string
  label: string
  icon: any
}

const StadisticsCard: React.FC<IOwnProps> = ({ data, label, icon }) => {
  return (
    <ContainerCard>
      <ContainerHeadTitle>
        <span>{label}</span>
        <span>{data}</span>
      </ContainerHeadTitle>
      <div>
        <img src={icon} />
      </div>
    </ContainerCard>
  )
}

export default StadisticsCard
