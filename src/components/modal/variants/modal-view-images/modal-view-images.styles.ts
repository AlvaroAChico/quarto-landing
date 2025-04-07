import styled from "styled-components"
import { palette } from "../../../../config/theme/theme"
import { Swiper, SwiperSlide } from "swiper/react"

export const ContainerModal = styled.div`
  height: 100%;
  width: 100%;

  * .swiper-button-prev,
  * .swiper-button-next {
    color: white;
  }
`

export const SwiperStyles = styled(Swiper)`
  height: 100%;
`

export const ItemSwiperImage = styled(SwiperSlide)`
  display: grid !important;
  place-items: center;
  height: 100%;
  width: 100%;

  > img {
    object-fit: cover;
    // width: 100%;
  }
`
