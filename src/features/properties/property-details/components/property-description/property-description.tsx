import styled from "styled-components"
import { useAppSelector } from "../../../../../app/hooks"
import { getPropertyDetail } from "../../../../../core/store/app-store/appSlice"

export const PropertyDescription = () => {
  const data = useAppSelector(getPropertyDetail)

  return (
    <section>
      <SectionTitle>Descripción</SectionTitle>
      <Description>{data.description}</Description>
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

const Description = styled.p`
  color: #6b7280;
  font-size: 14px;
  line-height: 1.4;
`
