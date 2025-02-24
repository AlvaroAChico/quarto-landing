import styled from "styled-components"
import PropertyCard from "../../../components/property-card/property-card"
import { PropertyDTO } from "../../../../../core/models/interfaces/property-model"

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
  // Add other similar properties...
]

export const SimilarProperties = () => {
  return (
    <section>
      <SectionTitle>Propiedades similares</SectionTitle>
      <PropertiesGrid>
        {similarProperties.map((property, index) => (
          <PropertyCard
            key={index}
            {...property}
            property={{} as PropertyDTO}
          />
        ))}
      </PropertiesGrid>
    </section>
  )
}

const SectionTitle = styled.h2`
  font-family: Raleway, sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: #242424;
  margin: 46px 0 24px;
`

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`
