import styled from "styled-components"
import { breakpoints } from "../../../constants/breakpoints"

export const ContainerCard = styled.div`
  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
  border-radius: 20px;
  background: white;
  padding: 30px;
  width: 260px;
  min-width: 260px;
  height: 140px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;

  > div:nth-last-child(1) {
    > img {
      border-radius: 15px;
      width: 50px;
    }
  }

  ${breakpoints.tabletLargeMax} {
    padding: 30px;
  }
`

export const ContainerHeadTitle = styled.div`
  justify-content: space-around;
  flex-direction: column;
  align-items: flex-start;
  display: flex;
  height: 100%;
  gap: 8px;

  > span {
    &:nth-child(1) {
      font-size: 0.8rem;
      font-weight: 450;
    }
    &:nth-child(2) {
      font-size: 1.6rem;
      font-weight: 900;
    }
  }

  ${breakpoints.tabletLargeMax} {
    flex-direction: column;
  }
`
