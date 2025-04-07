import React from "react"
import Modal from "../../modal"
import {
  ContainerModal,
  ItemSwiperImage,
  SwiperStyles,
} from "./modal-view-images.styles"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/autoplay"

interface IOwnProps {
  isOpen: boolean
  images: string[]
  handleClose: () => void
}

const ModalViewImages: React.FC<IOwnProps> = ({
  isOpen,
  images,
  handleClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      customStyles={`
        background: transparent;
        max-height: 90vh;
        max-width: 90vw;
        height: 100%;
        width: 100%;

        > div:nth-child(1){
          color: white;
          height: 35px;
          width: 35px;
        }
    `}
    >
      <ContainerModal>
        <SwiperStyles
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={30}
          modules={[Navigation, Autoplay]}
          onSlideChange={() => console.log("slide change")}
          onSwiper={swiper => console.log(swiper)}
          navigation
          loop
        >
          {(images || []).map(image => (
            <ItemSwiperImage key={`${new Date()}_${image}`}>
              <img src={image} />
            </ItemSwiperImage>
          ))}
        </SwiperStyles>
      </ContainerModal>
    </Modal>
  )
}

export default ModalViewImages
