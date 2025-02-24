"use client"
import styled from "styled-components"

export const PropertyPricing = () => {
  return (
    <PricingContainer>
      <PricingContent>
        <MonthlyTag>Pagos mensuales</MonthlyTag>
        <PriceSection>
          <PriceLabel>Canon</PriceLabel>
          <Price>
            $500
            <PriceUnit>/mes</PriceUnit>
          </Price>
        </PriceSection>
        <Description>
          Al mudarte a esta propiedad, se aplicarán algunas tarifas iniciales.
          Luego, solo tendrás pagos mensuales sin complicaciones.
        </Description>
      </PricingContent>

      <ActionButtons>
        <PrimaryButton>Agendar visita</PrimaryButton>
        <SecondaryButton>Contáctanos</SecondaryButton>
      </ActionButtons>

      <SocialActions>
        <ActionButton>
          <IconWrapper>
            <i className="ti ti-share" />
          </IconWrapper>
          <span>Compartir</span>
        </ActionButton>
        <ActionButton>
          <IconWrapper>
            <i className="ti ti-heart" />
          </IconWrapper>
          <span>Favoritos</span>
        </ActionButton>
      </SocialActions>
    </PricingContainer>
  )
}

const PricingContainer = styled.aside`
  position: sticky;
  top: 24px;
  width: 342px;
  border-left: 1px solid #e1e1e1;
  padding: 0 46px;

  @media (max-width: 991px) {
    width: 100%;
    border-left: none;
    padding: 24px;
    margin-top: 32px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

const PricingContent = styled.div`
  margin-bottom: 24px;
`

const MonthlyTag = styled.div`
  background-color: #032c29;
  color: #fff;
  text-align: center;
  padding: 12px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 12px;
`

const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
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
  color: #6b7280;
  font-size: 14px;
  line-height: 1.4;
`

const ActionButtons = styled.div`
  margin-bottom: 32px;
`

const PrimaryButton = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 9999px;
  font-weight: 700;
  margin-bottom: 12px;
  cursor: pointer;
  background-color: #032c29;
  color: #fff;
  border: none;
`

const SecondaryButton = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 9999px;
  font-weight: 700;
  margin-bottom: 12px;
  cursor: pointer;
  background-color: #f6f6f6;
  color: #242424;
  border: 1px solid #e1e1e1;
`

const SocialActions = styled.div`
  display: flex;
  gap: 32px;
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
