import { FC, useState } from "react"
import LayoutICON from "../../../../../assets/img/icons/icon_layout-gallery.png"
import {
  AdditionalImagesGrid,
  GalleryContainer,
  GridImage,
  ImageWrapper,
  MainImage,
  PetTag,
  ViewAllOverlay,
} from "./property-gallery.styles"
import { useAppSelector } from "../../../../../app/hooks"
import { getPropertyDetail } from "../../../../../core/store/app-store/appSlice"
import ModalViewImages from "../../../../../components/modal/variants/modal-view-images/modal-view-images"

interface GalleryProps {
  mainImage: string
  additionalImages: string[]
}

export const PropertyGallery: FC<GalleryProps> = ({
  mainImage,
  additionalImages,
}) => {
  const [openViewImages, setOpenViewImages] = useState<boolean>(false)
  const [showImages, setShowImages] = useState<string[]>([])
  const data = useAppSelector(getPropertyDetail)

  const handleViewImages = (images: string[]) => () => {
    setShowImages(images)
    setOpenViewImages(true)
  }

  return (
    <GalleryContainer>
      <MainImage
        src={data?.images?.[0]?.url || "fallback.jpg"}
        alt="Property main view"
        onClick={handleViewImages([
          data?.images?.[0]?.url || "",
          ...(data?.images?.map(mp => mp.url) || []),
        ])}
      />
      <PetTag>Acepta mascotas</PetTag>
      <AdditionalImagesGrid>
        {data?.images?.slice(1, 5).map((img, index) => (
          <ImageWrapper key={index}>
            {index === 3 ? (
              <ViewAllOverlay>
                <div>
                  <div>
                    <img src={LayoutICON} alt="Icono de layout" />
                  </div>
                  <span
                    onClick={handleViewImages(data?.images.map(mp => mp.url))}
                  >
                    Todas las fotos
                  </span>
                </div>
              </ViewAllOverlay>
            ) : null}
            <GridImage
              src={img.url}
              alt={`Property view ${index + 2}`}
              onClick={handleViewImages([
                img.url,
                ...data?.images.map(mp => mp.url),
              ])}
            />
          </ImageWrapper>
        ))}
      </AdditionalImagesGrid>
      <ModalViewImages
        handleClose={() => setOpenViewImages(false)}
        images={showImages}
        isOpen={openViewImages}
      />
    </GalleryContainer>
  )
}
