import React from "react"
import {
  ContainerCard,
  ContainerInfo,
  ContainerHeadImage,
  ContainerPriceStatus,
  ContainerInfoProp,
  SingleSpan,
  ContainerSinglesSpan,
} from "./property-card.styles"
import Button from "../../../../components/button/button"
import { palette } from "../../../../config/theme/theme"
import { PropertyDTO } from "../../../../core/models/interfaces/property-model"
import { useNavigate } from "react-router-dom"
import { pathRoutes } from "../../../../config/routes/paths"
import { routeWithReplaceId } from "../../../../utils/path-util"

interface IOwnProps {
  property: PropertyDTO
}

const PropertyCard: React.FC<IOwnProps> = ({ property }) => {
  const navigate = useNavigate()

  const handleViewDetail = () =>
    navigate(
      routeWithReplaceId(
        pathRoutes.PROPERTY.otherPaths.DETAIL.to,
        `${property.id}`,
      ),
    )

  return (
    <ContainerCard onClick={handleViewDetail}>
      <ContainerHeadImage
        image={
          property.principalImage ||
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
            {(() => {
              const deposit = property.monthDeposits
              const advance = property.monthInAdvance
              const depositIsZero = deposit === "0" || deposit == null
              const advanceIsZero = advance === "0" || advance == null

              if (depositIsZero && advanceIsZero) {
                return <span>Sin adelantos ni depósitos</span>
              }

              const messages = []
              if (depositIsZero) {
                messages.push("Sin depósitos")
              } else {
                messages.push(
                  `${deposit} ${Number(deposit) === 1 ? "depósito" : "depósitos"}`,
                )
              }

              if (advanceIsZero) {
                messages.push("Sin adelantos")
              } else {
                messages.push(
                  `${advance} ${Number(advance) === 1 ? "adelanto" : "adelantos"}`,
                )
              }

              return (
                <ContainerSinglesSpan>
                  {messages.map((mp, index) => (
                    <SingleSpan key={index}>{mp}</SingleSpan>
                  ))}
                </ContainerSinglesSpan>
              )
            })()}
          </p>
        </ContainerPriceStatus>
        <ContainerInfoProp>
          {/* <p>{property.fullAddress}</p> */}
          <p>{property.fullAddress}</p>
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
