import styled from "styled-components"
import { breakpoints } from "../../../constants/breakpoints"

export const ContainerCard = styled.div`
  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
  border-radius: 20px;
  background: white;
  padding: 40px;

  ${breakpoints.tabletLargeMax} {
    padding: 30px;
  }
`

export const ContainerHeadTitle = styled.div`
  flex-direction: row;
  align-items: center;
  display: flex;
  gap: 10px;

  > span {
    &:nth-child(1) {
      font-size: 35px;
      font-weight: 900;
    }
    &:nth-child(2) {
      font-size: 18px;
      font-weight: 450;
    }
  }

  ${breakpoints.tabletLargeMax} {
    flex-direction: column;
  }
`
