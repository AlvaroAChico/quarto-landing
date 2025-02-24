import styled from "styled-components"

export const PropertyHeader = () => {
  return (
    <div>
      <Title>El Encantado, Mun. Sucre #347</Title>
      <PropertyMeta>
        <span>Casa</span>
        <Separator>•</Separator>
        <span>Caracas</span>
        <Separator>•</Separator>
        <span>200 m²</span>
        <Separator>•</Separator>
        <span>2 Habitaciones</span>
      </PropertyMeta>
    </div>
  )
}

const Title = styled.h1`
  font-family: Raleway, sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #242424;
  margin-bottom: 8px;

  @media (max-width: 640px) {
    font-size: 24px;
  }
`

const PropertyMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 14px;
`

const Separator = styled.span`
  color: #6b7280;
`
