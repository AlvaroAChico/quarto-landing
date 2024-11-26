import React from "react"
import {
  ContainerAmount,
  ContainerCard,
  ContainerDate,
  ContainerUpInfo,
} from "./card-stats-wallet.styles"

interface IOwnProps {
  amount: number
  date: string
  title: string
  icon: string
  activeCard?: boolean
}

const CardStatsWallet: React.FC<IOwnProps> = ({
  amount,
  date,
  icon,
  title,
  activeCard = false,
}) => {
  return (
    <ContainerCard activeCard={activeCard}>
      <ContainerUpInfo>
        <div>
          <span>{title}</span>
        </div>
        <div>
          <img src={icon} />
        </div>
      </ContainerUpInfo>
      <ContainerAmount>
        <span>$ {amount}</span>
      </ContainerAmount>
      <ContainerDate>
        <span>{date}</span>
      </ContainerDate>
    </ContainerCard>
  )
}

export default CardStatsWallet
