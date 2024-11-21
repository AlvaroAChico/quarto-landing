import styled from "styled-components"
import { palette } from "../../config/theme/theme"
import { breakpoints } from "../../constants/breakpoints"

export const ContainerFilterActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 10px;

  ${breakpoints.laptopMax} {
    flex-direction: column;
    width: 100%;

    > div {
      width: 100%;
    }
  }
`

export const ContainerButtonReferral = styled.div`
  margin-bottom: 20px;
  height: 100%;

  ${breakpoints.laptopMax} {
    justify-content: flex-end;
    display: flex;
    width: 100%;
  }
`

export const ContainerRentals = styled.div``

export const ContentStylesSection = styled.div``

export const ContainerListRentals = styled.div``

export const ContainerImageRental = styled.div`
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
