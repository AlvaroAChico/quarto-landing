"use client"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { routeWithReplaceId } from "../../../../../utils/path-util"
import { pathRoutes } from "../../../../../config/routes/paths"
import WarningIconIMG from "../../../../../assets/img/icons/icon_warning_pricing.png"
import ShareIconIMG from "../../../../../assets/img/icons/icon_share_pricing.png"
import FavoriteIconIMG from "../../../../../assets/img/icons/icon_favorite_pricing.png"
import { breakpoints } from "../../../../../constants/breakpoints"
import { useAppSelector } from "../../../../../app/hooks"
import { getPropertyDetail } from "../../../../../core/store/app-store/appSlice"

export const PropertyPricing = () => {
  const data = useAppSelector(getPropertyDetail)
  const navigate = useNavigate()

  const handleSchedule = () =>
    navigate(
      routeWithReplaceId(pathRoutes.PROPERTY.otherPaths.SCHEDULE.to, "1"),
    )

  return (
    <PricingContainer>
      <PricingContent>
        {/* <MonthlyTag>Pagos mensuales</MonthlyTag> */}
        <PriceSection>
          <PriceLabel>Canon</PriceLabel>
          <Price>
            ${data.price}
            <PriceUnit>/mes</PriceUnit>
          </Price>
        </PriceSection>
        <Description>
          <img src={WarningIconIMG} />
          <span>
            Al mudarte a esta propiedad, se aplicarán algunas tarifas iniciales.
            Luego, solo tendrás pagos mensuales sin complicaciones.
          </span>
        </Description>
      </PricingContent>

      <ActionButtons>
        <PrimaryButton onClick={handleSchedule}>Agendar visita</PrimaryButton>
        <SecondaryButton
           onClick={() =>
            window.open(
              "https://api.whatsapp.com/send?phone=584121714930&text=%C2%A1Bienvenido%20a%20Quarto!%20%F0%9F%8F%A1%E2%9C%A8%0A%C2%BFTienes%20alguna%20duda%20sobre%20esta%20propiedad%3F%20Estamos%20aqu%C3%AD%20para%20ayudarte%20en%20todo%20el%20proceso.%0A%F0%9F%93%8C%20Comp%C3%A1rtenos%20el%20link%20de%20la%20propiedad%20para%20brindarte%20m%C3%A1s%20informaci%C3%B3n%20y%20asistencia%20personalizada.%20%C2%A1Escr%C3%ADbenos!%20%F0%9F%98%8A",
              "_blank"
            )
          }
        >
          Contáctanos
        </SecondaryButton>
      </ActionButtons>

      <SocialActions>
        <ActionButton>
          <IconWrapper>
            <img src={ShareIconIMG} />
          </IconWrapper>
          <span>Compartir</span>
        </ActionButton>
        <ActionButton>
          <IconWrapper>
            <img src={FavoriteIconIMG} />
          </IconWrapper>
          <span>Favoritos</span>
        </ActionButton>
      </SocialActions>
    </PricingContainer>
  )
}

const PricingContainer = styled.aside`
  border-left: 1px solid #e1e1e1;
  flex-direction: column;
  max-width: 350px;
  padding: 0 20px;
  display: flex;
  width: 100%;
  gap: 20px;

  ${breakpoints.laptopMediumMax} {
    max-width: 300px;
  }

  ${breakpoints.tabletLargeMax} {
    max-width: 250px;
  }

  ${breakpoints.tabletMediumMax} {
    border-top: 1px solid #e1e1e1;
    padding-top: 20px;
    border-left: none;
    max-width: none;
  }
`

const PricingContent = styled.div`
  margin-bottom: 24px;
`

const MonthlyTag = styled.div`
  background: linear-gradient(
    90deg,
    rgba(0, 196, 154, 0.2),
    rgba(0, 196, 154, 0.8)
  );
  color: black;
  border-radius: 6px;
  place-items: center;
  font-size: 0.8rem;
  width: 100%;
  padding: 10px 15px;
  font-weight: 600;
  display: grid;
`

const PriceSection = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  gap: 20px;
`

const PriceLabel = styled.span`
  color: #6b7280;
  font-size: 14px;
`

const Price = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #242424;
`

const PriceUnit = styled.span`
  font-size: 16px;
  color: #6b7280;
  font-weight: 400;
`

const Description = styled.p`
  grid-template-columns: fit-content(100%) 1fr;
  background: #f5f5f5;
  border-radius: 10px;
  line-height: 1.4;
  color: #6b7280;
  margin-top: 20px;
  font-size: 14px;
  display: grid;
  padding: 20px;
  gap: 10px;

  > img {
    max-width: 20px;
    width: 100%;
  }
`

const ActionButtons = styled.div`
  flex-direction: column;
  display: flex;
  gap: 10px;
`

const PrimaryButton = styled.button`
  background: linear-gradient(90deg, #52e1c3, #52e1c3);
  border-radius: 40px;
  place-items: center;
  font-size: 0.8rem;
  padding: 10px 15px;
  font-weight: 600;
  display: grid;
  color: black;
  border: none;
  height: 50px;
  width: 100%;
`

const SecondaryButton = styled.button`
  width: 100%;
  border-radius: 40px;
  font-weight: 700;
  margin-bottom: 12px;
  cursor: pointer;
  background-color: #f6f6f6;
  color: #242424;
  border: 1px solid #e1e1e1;
  height: 50px;
`

const SocialActions = styled.div`
  display: flex;
  gap: 20px;

  ${breakpoints.tabletLargeMax} {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }

  ${breakpoints.tabletMediumMax} {
    flex-direction: row;
  }
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #242424;
  font-weight: 500;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
`

const IconWrapper = styled.div`
  width: 42px;
  height: 42px;
  background-color: #f6f6f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`
