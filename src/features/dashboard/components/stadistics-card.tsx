import React from "react"
import { ContainerCard, ContainerHeadTitle } from "./stadistics-card.styles"

interface IOwnProps {
  data: string
  label: string
  bg: string
  icon: any
}

const StadisticsCard: React.FC<IOwnProps> = ({ data, label, icon, bg }) => {
  return (
    <ContainerCard bg={bg}>
      <div>
        <img src={icon} />
      </div>
      <ContainerHeadTitle>
        <span>{label}</span>
        <span>{data}</span>
      </ContainerHeadTitle>
    </ContainerCard>
  )
}

export default StadisticsCard
