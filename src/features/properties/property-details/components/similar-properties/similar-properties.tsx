import styled from "styled-components"
import PropertyCard from "../../../components/property-card/property-card"
import { PropertyDTO } from "../../../../../core/models/interfaces/property-model"
import { palette } from "../../../../../config/theme/theme"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css/navigation"
import "swiper/css/autoplay"
import "swiper/css"

const similarProperties = [
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/e9515abc9ca94eaab6a0444e40b2e5f2/661154849d2dcd2f12be94c97cc24123a659d4396e934ea8a4b46257aa9c4dff",
    price: 600,
    title: "Av. Urdaneta, Mun. Libertador",
    type: "Apartamento",
    area: "230 m²",
    bedrooms: 2,
    acceptsPets: true,
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/e9515abc9ca94eaab6a0444e40b2e5f2/661154849d2dcd2f12be94c97cc24123a659d4396e934ea8a4b46257aa9c4dff",
    price: 600,
    title: "Av. Urdaneta, Mun. Libertador",
    type: "Apartamento",
    area: "230 m²",
    bedrooms: 2,
    acceptsPets: true,
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/e9515abc9ca94eaab6a0444e40b2e5f2/661154849d2dcd2f12be94c97cc24123a659d4396e934ea8a4b46257aa9c4dff",
    price: 600,
    title: "Av. Urdaneta, Mun. Libertador",
    type: "Apartamento",
    area: "230 m²",
    bedrooms: 2,
    acceptsPets: true,
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/e9515abc9ca94eaab6a0444e40b2e5f2/661154849d2dcd2f12be94c97cc24123a659d4396e934ea8a4b46257aa9c4dff",
    price: 600,
    title: "Av. Urdaneta, Mun. Libertador",
    type: "Apartamento",
    area: "230 m²",
    bedrooms: 2,
    acceptsPets: true,
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/e9515abc9ca94eaab6a0444e40b2e5f2/661154849d2dcd2f12be94c97cc24123a659d4396e934ea8a4b46257aa9c4dff",
    price: 600,
    title: "Av. Urdaneta, Mun. Libertador",
    type: "Apartamento",
    area: "230 m²",
    bedrooms: 2,
    acceptsPets: true,
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/e9515abc9ca94eaab6a0444e40b2e5f2/661154849d2dcd2f12be94c97cc24123a659d4396e934ea8a4b46257aa9c4dff",
    price: 600,
    title: "Av. Urdaneta, Mun. Libertador",
    type: "Apartamento",
    area: "230 m²",
    bedrooms: 2,
    acceptsPets: true,
  },
]

export const SimilarProperties = () => {
  return (
    <SectionSimilar>
      <SectionTitle>Propiedades similares</SectionTitle>
      <PropertiesGrid>
        <Swiper
          breakpoints={{
            280: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }}
          slidesPerGroup={1}
          modules={[Navigation, Autoplay]}
          onSlideChange={() => console.log("slide change")}
          onSwiper={swiper => console.log(swiper)}
          navigation
          loop
        >
          {similarProperties.map((property, index) => (
            <ItemSwiperAdd key={index}>
              {/* {index} */}
              <PropertyCard
                key={index}
                {...property}
                property={{} as PropertyDTO}
              />
            </ItemSwiperAdd>
          ))}
        </Swiper>
      </PropertiesGrid>
    </SectionSimilar>
  )
}

const SectionSimilar = styled.div`
  width: 100%;
`

const SectionTitle = styled.h2`
  font-family: Raleway, sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: #242424;
  margin: 46px 0 24px;
`

const PropertiesGrid = styled.div`
  width: 100%;
`

export const ItemSwiperAdd = styled(SwiperSlide)`
  // max-width: 300px;
  // width: 100%;
`
