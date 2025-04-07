import styled from "styled-components"
import BedICON from "../../../../../assets/img/icons/icon_bed.png"
import PisICON from "../../../../../assets/img/icons/icon_stairs.png"
import GymICON from "../../../../../assets/img/icons/icon_exercise.png"
import BatICON from "../../../../../assets/img/icons/icon_shower.png"
import GarICON from "../../../../../assets/img/icons/icon_car.png"
import { useAppSelector } from "../../../../../app/hooks"
import { getPropertyDetail } from "../../../../../core/store/app-store/appSlice"
import { globalParams } from "../../../../../constants/app"

export interface PropertyImage {
  url: string
  alt: string
}

export interface PropertyFeature {
  id: number
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
  { id: 1, icon: BedICON, value: 5, label: "Habitaciones" },
  { id: 2, icon: PisICON, value: 2, label: "Nro. Pisos" },
  { id: 3, icon: GymICON, label: "Gimnasio" },
  { id: 4, icon: BatICON, value: 4, label: "Baños" },
  { id: 5, icon: GarICON, value: 5, label: "Garage" },
]

export const PropertyFeatures = () => {
  const data = useAppSelector(getPropertyDetail)
  const params = data?.parameters ? JSON.parse(data.parameters) : []

  const mergedParams = params.map((param: any) => {
    // Convertimos el id de params (string) a número para la comparación
    const globalParam = globalParams.find(p => p.id === Number(param.id))
    // Si se encuentra el parámetro global, se usa su nombre;
    // además, si se trata del id 7 y deseas mostrar "metros" en lugar de "m2", lo reemplazas
    let displayName = globalParam?.name || ""
    if (displayName === "m2") {
      displayName = "metros"
    }
    return {
      id: param.id,
      value: param.value,
      name: displayName,
    }
  })

  return (
    <section>
      <SectionTitle>Características</SectionTitle>
      <FeaturesGrid>
        <FeaturesList>
          {mergedParams.map((mp: any) => (
            <p key={mp.id}>
              <span>•</span>
              <span>{mp.value}</span> <span>{mp.name}</span>
            </p>
          ))}
        </FeaturesList>
        <FeaturesList>
          {/* {features.slice(0, 3).map((feature, index) => (
            <FeatureItem key={index}>
              {feature.icon && <FeatureImage src={feature.icon} />}
              {feature.value && <FeatureValue>{feature.value}</FeatureValue>}
              <FeatureLabel>{feature.label}</FeatureLabel>
            </FeatureItem>
          ))} */}
        </FeaturesList>
        <FeaturesList>
          {/* {features.slice(3).map((feature, index) => (
            <FeatureItem key={index}>
              {feature.icon && <FeatureImage src={feature.icon} />}
              {feature.value && <FeatureValue>{feature.value}</FeatureValue>}
              <FeatureLabel>{feature.label}</FeatureLabel>
            </FeatureItem>
          ))} */}
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
  grid-template-columns: 1fr 1fr;
  display: grid;
`

const FeaturesList = styled.div`
  flex-direction: column;
  display: flex;
  gap: 20px;
`

const FeatureItem = styled.div`
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  color: #242424;
  display: flex;
  gap: 8px;
`

const FeatureImage = styled.img`
  height: 15px;
  width: 15px;
`

const FeatureValue = styled.span`
  font-weight: 700;
`

const FeatureLabel = styled.span`
  font-size: 14px;
`

const ShowAllButton = styled.button`
  background: #f6f6f6;
  border: 1px solid #e1e1e1;
  border-radius: 20px;
  padding: 15px 30px;
  margin-top: 20px;
  color: #242424;
  font-weight: 500;
  cursor: pointer;
`
