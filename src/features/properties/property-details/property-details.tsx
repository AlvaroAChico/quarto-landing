import styled from "styled-components"
import { PropertyBreadcrumb } from "./components/property-breadcrumb/property-breadcrumb"
import { PropertyGallery } from "./components/property-gallery/property-gallery"
import { PropertyDescription } from "./components/property-description/property-description"
import { PropertyFeatures } from "./components/property-features/property-features"
import { PropertyPricing } from "./components/property-pricing/property-pricing"
import { SimilarProperties } from "./components/similar-properties/similar-properties"
import { FC, useCallback, useEffect, useState } from "react"
import { PropertyHeader } from "./components/property-header/property-header"
import { breakpoints } from "../../../constants/breakpoints"
import { propertyRepository } from "../../../api/repositories/property-repository"
import { PropertyDTO } from "../../../core/models/interfaces/property-model"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  getPropertyDetail,
  updatePropertyDetail,
} from "../../../core/store/app-store/appSlice"

const images = [
  "https://cdn.builder.io/api/v1/image/assets/e9515abc9ca94eaab6a0444e40b2e5f2/998aef31883d6d2b094674e130c31a9e97cc6897717760bca6c0a87b75d89f6b",
  "https://cdn.builder.io/api/v1/image/assets/e9515abc9ca94eaab6a0444e40b2e5f2/21a67e5e62dd02c59bbedfa6b9f597488462cd16a7c2f0f13073a0be07d52bab",
  "https://cdn.builder.io/api/v1/image/assets/e9515abc9ca94eaab6a0444e40b2e5f2/929cfbd2fc091ba79a2eb8485f9906028daf1ae2fb09091f004d04c1d04407d8",
  "https://cdn.builder.io/api/v1/image/assets/e9515abc9ca94eaab6a0444e40b2e5f2/1b6d5d4e16f2a8649cd0e49015e34474784fbff9690d095fc2b083ed0bf45587",
  "https://cdn.builder.io/api/v1/image/assets/e9515abc9ca94eaab6a0444e40b2e5f2/1b6d5d4e16f2a8649cd0e49015e34474784fbff9690d095fc2b083ed0bf45587",
]

export const PropertyDetails: FC = () => {
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false)
  const [data, setData] = useState<PropertyDTO>()
  const dispatch = useAppDispatch()
  const { id } = useParams()

  const fetchDataProperties = useCallback(async () => {
    try {
      setIsLoadingData(true)
      const response: PropertyDTO[] =
        (await propertyRepository.getPropertiesById(`${id}`)) as PropertyDTO[]
      if (!!response) {
        setData(response[0])
        dispatch(updatePropertyDetail(response[0]))
      }
    } finally {
      setIsLoadingData(false)
    }
  }, [id])

  useEffect(() => {
    fetchDataProperties()
  }, [])

  return (
    <Container>
      <Content>
        <PropertyBreadcrumb />
        <PropertyGallery mainImage={""} additionalImages={[]} />

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
  gap: 20px;
`

const MainSection = styled.div`
  grid-template-columns: 1fr fit-content(100%);
  margin-top: 20px;
  display: grid;
  gap: 20px;

  ${breakpoints.tabletMediumMax} {
    grid-template-columns: 1fr;
  }
`

const LeftColumn = styled.div`
  flex-direction: column;
  display: flex;
  gap: 15px;
  flex: 1;
`

export default PropertyDetails
