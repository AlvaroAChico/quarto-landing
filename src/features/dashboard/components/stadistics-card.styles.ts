import styled from "styled-components"
import { breakpoints } from "../../../constants/breakpoints"

export const ContainerCard = styled.div<{ bg: string }>`
  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 20px;
  height: fit-content;
  background: white;
  padding: 15px;
  width: 170px;
  display: flex;
  gap: 10px;

  > div:nth-child(1) {
    background: ${p => p.bg};
    border-radius: 15px;
    place-items: center;
    display: grid;
    height: 50px;
    width: 50px;

    > img {
      width: 25px;
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
  gap: 5px;

  > span {
    &:nth-child(1) {
      font-size: 0.8rem;
      font-weight: 450;
    }
    &:nth-child(2) {
      font-size: 1.4rem;
      font-weight: 900;
    }
  }

  ${breakpoints.tabletLargeMax} {
    flex-direction: column;
  }
`
