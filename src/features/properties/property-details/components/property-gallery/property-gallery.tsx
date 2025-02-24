import { FC } from "react"
import styled from "styled-components"
import { Layout } from "styled-icons/evaicons-solid"
import LayoutICON from "../../../../../assets/img/icons/icon_layout-gallery.png"

interface GalleryProps {
  mainImage: string
  additionalImages: string[]
}

export const PropertyGallery: FC<GalleryProps> = ({
  mainImage,
  additionalImages,
}) => {
  return (
    <GalleryContainer>
      <MainImage src={mainImage} alt="Property main view" />
      <PetTag>Acepta mascotas</PetTag>
      <AdditionalImagesGrid>
        {additionalImages.map((img, index) => (
          <ImageWrapper key={index}>
            {index === 3 ? (
              <ViewAllOverlay>
                <div>
                  <img src={LayoutICON} />
                  <span>Todas las fotos</span>
                </div>
              </ViewAllOverlay>
            ) : null}
            <GridImage src={img} alt={`Property view ${index + 1}`} />
          </ImageWrapper>
        ))}
      </AdditionalImagesGrid>
    </GalleryContainer>
  )
}

const GalleryContainer = styled.section`
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  position: relative;
  display: grid;
  gap: 20px;

  @media (max-width: 991px) {
    flex-direction: column;
    height: auto;
  }
`

const MainImage = styled.img`
  border-radius: 8px 0 0 8px;
  object-position: center;
  object-fit: cover;
  height: 100%;
  width: 100%;

  @media (max-width: 991px) {
    width: 100%;
  }
`

const PetTag = styled.span`
  position: absolute;
  left: 16px;
  top: 16px;
  background-color: #fff;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  color: #242424;
`

const AdditionalImagesGrid = styled.div`
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  display: grid;
  gap: 20px;

  > div {
    &:nth-child(2) > img {
      border-radius: 0 8px 0 0;
    }

    &:nth-child(4) > img {
      border-radius: 0 0 8px 0;
    }
  }

  @media (max-width: 991px) {
    width: 100%;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  cursor: pointer;
`

const GridImage = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`

const ViewAllOverlay = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: 0 0 8px 0;
  place-items: center;
  position: absolute;
  display: grid;
  height: 100%;
  width: 100%;
  color: white;

  > div {
  }
`
