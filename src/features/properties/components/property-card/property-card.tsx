import React from "react"
import {
  ContainerCard,
  ContainerInfo,
  ContainerHeadImage,
} from "./property-card.styles"
import Button from "../../../../components/button/button"
import { palette } from "../../../../config/theme/theme"
import { PropertyDTO } from "../../../../core/models/interfaces/property-model"

interface IOwnProps {
  property: PropertyDTO
}

const PropertyCard: React.FC<IOwnProps> = ({ property }) => {
  return (
    <ContainerCard>
      <ContainerHeadImage image={property.image} />
      <ContainerInfo status={property.status} type={property.type}>
        <p>{property.address}</p>
        <p>
          {property.price}
          <span>{property.status}</span>
        </p>
        <div>
          <Button
            onClick={() => console.log}
            text="Editar"
            customStyles={`
              background: #F1F1F1;
              color: ${palette.blackColor};
              font-weight: 600;
              width: 100%;
              `}
          />
        </div>
        <p>{property.type}</p>
      </ContainerInfo>
    </ContainerCard>
  )
}

export default PropertyCard
