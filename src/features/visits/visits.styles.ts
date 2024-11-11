import styled from "styled-components"
import { palette } from "../../config/theme/theme"

export const ContainerVisits = styled.div``
export const ContentStylesSection = styled.div``

export const ContainerFilters = styled.div`
  margin-bottom: 20px;
  flex-direction: row;
  border-radius: 20px;
  width: fit-content;
  background: white;
  display: flex;
  padding: 20px;
  gap: 20px;
`

export const ItemFilterStyle = styled.div``

export const ContainerText = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;

  > span svg {
    width: 100%;
    max-width: 20px;
  }
`

export const ContainerReset = styled.div`
  color: ${palette.redColor};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 100%;
  width: 100%;

  > span svg {
    width: 100%;
    max-width: 20px;
  }
`

export const ContainerListVisits = styled.div``

export const ContainerImageVisit = styled.div`
  border-radius: 10px;
  height: 60px;
  width: 60px;

  > img {
    border-radius: 10px;
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`
