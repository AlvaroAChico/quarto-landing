import React from "react"
import {
  ContainerCard,
  ContainerInfo,
  ContainerHeadImage,
} from "./property-card.styles"
import Button from "../../../../components/button/button"
import { palette } from "../../../../config/theme/theme"

interface IOwnProps {
  image: string
  name: string
  address: string
  price: number
}

const PropertyCard: React.FC<IOwnProps> = ({ image, name, address, price }) => {
  return (
    <ContainerCard>
      <ContainerHeadImage image={image} />
      <ContainerInfo>
        <p>{address}</p>
        <span>{price}</span>
        <div>
          <Button
            onClick={() => console.log}
            text="Editar"
            customStyles={`
            background: ${palette.inputBorderolor};
            color: ${palette.blackColor};
            font-weight: 600;
            `}
          />
        </div>
      </ContainerInfo>
    </ContainerCard>
  )
}

export default PropertyCard
