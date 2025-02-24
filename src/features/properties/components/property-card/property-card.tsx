import React from "react"
import {
  ContainerCard,
  ContainerInfo,
  ContainerHeadImage,
  ContainerPriceStatus,
  ContainerInfoProp,
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
      <ContainerHeadImage
        image={
          property.image ||
          "https://nexoinmobiliario.pe/blog/wp-content/uploads/2022/06/destacada-identificar-departamentos-modernos-nexo-inmobiliario.jpg"
        }
      />
      <ContainerInfo status={property.status} type={property.type || "quarto"}>
        <ContainerPriceStatus>
          <p>
            <span>$</span>
            <span>{property.price}</span>
            <span>/mes</span>
          </p>
          <p>
            <span>{property.status}</span>
          </p>
        </ContainerPriceStatus>
        <ContainerInfoProp>
          {/* <p>{property.fullAddress}</p> */}
          <p>Av. Urdaneta Mun, Libertador</p>
          <p>
            <span>Apartamento</span>
            <span />
            <span>230m2</span>
            <span />
            <span>1 Habitaciones</span>
          </p>
        </ContainerInfoProp>
        <p>{property.type || "Quarto"}</p>
      </ContainerInfo>
    </ContainerCard>
  )
}

export default PropertyCard
