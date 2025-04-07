import React from "react"
import {
  ContainerFeatureSection,
  DiscoverImage,
  DiscoverSection,
  DiscoverTitle,
  FeatureColumn,
  FeatureContent,
  FeatureDownCard,
  FeatureDownContent,
  FeatureImage,
  FeatureSectionWrapper,
  FeatureSubtitle,
  FeatureTitle,
  FeatureUpCard,
  PingImage,
} from "./feature-section.styles"
import AlcanciaMesIMG from "../../../../../assets/img/alcancia_mesames.png"
import PingIMG from "../../../../../assets/img/pig-adds.png"
import ScreenHomeAppIMG from "../../../../../assets/img/screen_app_home.png"

const FeatureSection: React.FC = () => {
  return (
    <ContainerFeatureSection>
      <h1>Venta y alquiler de inmuebles</h1>
      <FeatureSectionWrapper>
        <FeatureColumn>
          <FeatureUpCard backgroundColor="#fbf5e7">
            <FeatureContent>
              <FeatureTitle>Alquiler en cuotas</FeatureTitle>
              <FeatureSubtitle>
                y sin depósitos <br /> en garantía.
              </FeatureSubtitle>
            </FeatureContent>
            <FeatureImage
              loading="lazy"
              src={AlcanciaMesIMG}
              alt="Alquiler mensual"
            />
          </FeatureUpCard>
          <FeatureDownCard backgroundColor="#032c29">
            <FeatureDownContent>
              <FeatureTitle>Compra tu propiedad</FeatureTitle>
              <FeatureSubtitle>
                con solo la inicial y el resto en cómodas cuotas.
              </FeatureSubtitle>
            </FeatureDownContent>
            <PingImage loading="lazy" src={PingIMG} alt="Alquiler mensual" />
          </FeatureDownCard>
        </FeatureColumn>
        <DiscoverSection>
          <DiscoverTitle>
            Descubre cientos de inmuebles al alcance de tu mano
          </DiscoverTitle>
          <DiscoverImage
            loading="lazy"
            src={ScreenHomeAppIMG}
            alt="Descubre inmuebles"
          />
        </DiscoverSection>
      </FeatureSectionWrapper>
    </ContainerFeatureSection>
  )
}

export default FeatureSection
