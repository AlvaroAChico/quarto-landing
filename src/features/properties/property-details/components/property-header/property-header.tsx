import styled from "styled-components"
import HomeICON from "../../../../../assets/img/icons/icon_home.png"
import { useAppSelector } from "../../../../../app/hooks"
import { getPropertyDetail } from "../../../../../core/store/app-store/appSlice"

export const PropertyHeader = () => {
  const data = useAppSelector(getPropertyDetail)
  const params = data?.parameters ? JSON.parse(data.parameters) : []

  return (
    <div>
      <Title>{data.fullAddress}</Title>
      <PropertyMeta>
        <span>
          <img src={HomeICON} />
        </span>
        <span>Casa</span>
        <Separator>•</Separator>
        <span>Caracas</span>
        <Separator>•</Separator>
        <span>
          {
            (
              params?.find(
                (mp: { id: string; value: string }) => mp.id === "7",
              ) || { value: "0" }
            ).value
          }{" "}
          m²
        </span>
        <Separator>•</Separator>
        <span>
          {
            (
              params?.find(
                (mp: { id: string; value: string }) => mp.id === "3",
              ) || { value: "0" }
            ).value
          }{" "}
          Habitaciones
        </span>
      </PropertyMeta>
    </div>
  )
}

const Title = styled.h1`
  font-family: Raleway, sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #242424;
  margin-bottom: 8px;

  @media (max-width: 640px) {
    font-size: 24px;
  }
`

const PropertyMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 14px;
`

const Separator = styled.span`
  color: #6b7280;
`
