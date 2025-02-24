import styled from "styled-components"
import { PropertyBreadcrumb } from "./components/property-breadcrumb/property-breadcrumb"
import { PropertyGallery } from "./components/property-gallery/property-gallery"
import { PropertyDescription } from "./components/property-description/property-description"
import { PropertyFeatures } from "./components/property-features/property-features"
import { PropertyPricing } from "./components/property-pricing/property-pricing"
import { SimilarProperties } from "./components/similar-properties/similar-properties"
import { FC } from "react"
import { PropertyHeader } from "./components/property-header/property-header"

const images = [
  "https://cdn.builder.io/api/v1/image/assets/e9515abc9ca94eaab6a0444e40b2e5f2/998aef31883d6d2b094674e130c31a9e97cc6897717760bca6c0a87b75d89f6b",
  "https://cdn.builder.io/api/v1/image/assets/e9515abc9ca94eaab6a0444e40b2e5f2/21a67e5e62dd02c59bbedfa6b9f597488462cd16a7c2f0f13073a0be07d52bab",
  "https://cdn.builder.io/api/v1/image/assets/e9515abc9ca94eaab6a0444e40b2e5f2/929cfbd2fc091ba79a2eb8485f9906028daf1ae2fb09091f004d04c1d04407d8",
  "https://cdn.builder.io/api/v1/image/assets/e9515abc9ca94eaab6a0444e40b2e5f2/1b6d5d4e16f2a8649cd0e49015e34474784fbff9690d095fc2b083ed0bf45587",
  "https://s3-alpha-sig.figma.com/img/18a4/bdb5/8ec371ffb25635b2305708b0b47cee99?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=n3lcTVbEY1yg563gobdvUAFcq3omjNmuuOUpn~Tc9uxJbV7rf5dZz0D9X8oRwbgpWVkTphVrHVaUcAGBoT3mHaGR6fsYeKQaaOAdrmnWQTCVQTsK-a8XyVbbvYBiSW-GQxEv1oEk-kddHAv2u~kaQIDrR2jPUI4KXbjrMb8XrQI5IwnNYjK1r9wOTX8FNhML~0luIsByVw7WeeLZDFP4Qcc454hbpRSLGUFRUnDclodeg1gSoWVQxM4FsToc~RnurPHIOApdm5mYeX9HETDt6lqNSPX1Mk9UdEFXhaDWIe4pUbNZEWAKl-3zMaNX-u2PyyrxPZK0xKqnObSAmLH97A__",
]

export const PropertyDetails: FC = () => {
  return (
    <Container>
      <Content>
        <PropertyBreadcrumb />
        <PropertyGallery
          mainImage={images[0]}
          additionalImages={images.slice(1)}
        />

        <MainSection>
          <LeftColumn>
            <PropertyHeader />
            <PropertyDescription />
            <PropertyFeatures />
          </LeftColumn>
          <PropertyPricing />
        </MainSection>

        <SimilarProperties />
      </Content>
    </Container>
  )
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 24px;
  max-width: 1200px;
  margin: auto;
`

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: start;
`

const MainSection = styled.div`
  display: flex;
  margin-top: 32px;
  gap: 58px;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 32px;
  }
`

const LeftColumn = styled.div`
  flex: 1;
  max-width: 550px;
`

export default PropertyDetails
