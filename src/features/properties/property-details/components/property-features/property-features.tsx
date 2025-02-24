import styled from "styled-components"

export interface PropertyImage {
  url: string
  alt: string
}

export interface PropertyFeature {
  icon?: string
  label: string
  value?: string | number
}

export interface PropertyCardProps {
  image: string
  price: number
  title: string
  type: string
  area: string
  bedrooms: number
  acceptsPets?: boolean
}

const features: PropertyFeature[] = [
  { value: 5, label: "Habitaciones" },
  { value: 2, label: "Nro. Pisos" },
  { label: "Gimnasio" },
  { value: 3, label: "Baños" },
  { value: 1, label: "Garage" },
]

export const PropertyFeatures = () => {
  return (
    <section>
      <SectionTitle>Características</SectionTitle>
      <FeaturesGrid>
        <FeaturesList>
          {features.slice(0, 3).map((feature, index) => (
            <FeatureItem key={index}>
              {feature.value && <FeatureValue>{feature.value}</FeatureValue>}
              <FeatureLabel>{feature.label}</FeatureLabel>
            </FeatureItem>
          ))}
        </FeaturesList>
        <FeaturesList>
          {features.slice(3).map((feature, index) => (
            <FeatureItem key={index}>
              {feature.value && <FeatureValue>{feature.value}</FeatureValue>}
              <FeatureLabel>{feature.label}</FeatureLabel>
            </FeatureItem>
          ))}
        </FeaturesList>
      </FeaturesGrid>
      <ShowAllButton>Mostrar todas las características</ShowAllButton>
    </section>
  )
}

const SectionTitle = styled.h2`
  font-family: Raleway, sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: #242424;
  margin-bottom: 16px;
`

const FeaturesGrid = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 16px;
`

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #242424;
`

const FeatureValue = styled.span`
  font-weight: 700;
`

const FeatureLabel = styled.span`
  font-size: 14px;
`

const ShowAllButton = styled.button`
  background: none;
  border: none;
  color: #242424;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
`
