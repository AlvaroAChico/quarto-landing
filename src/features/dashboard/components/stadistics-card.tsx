import React from "react"
import { ContainerCard, ContainerHeadTitle } from "./stadistics-card.styles"

interface IOwnProps {
  data: number
  label: string
}

const StadisticsCard: React.FC<IOwnProps> = ({ data, label }) => {
  return (
    <ContainerCard>
      <ContainerHeadTitle>
        <span>{data}</span>
        <span>{label}</span>
      </ContainerHeadTitle>
    </ContainerCard>
  )
}

export default StadisticsCard
