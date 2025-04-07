import { FC } from "react"
import WarningIconIMG from "../../assets/img/icons/icon_warning_pricing.png"
import { ContainerDetailCard } from "./detail-card.styles"

interface IOwnProps {
  children: any
}

const DetailCard: FC<IOwnProps> = ({ children }) => {
  return (
    <ContainerDetailCard>
      <img src={WarningIconIMG} />
      <span>{children}</span>
    </ContainerDetailCard>
  )
}

export default DetailCard
