import styled from "styled-components"
import { breakpoints } from "../../../../constants/breakpoints"
import { palette } from "../../../../config/theme/theme"

export const ContainerCard = styled.div`
  // box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
  border-radius: 20px;
  position: relative;
  background: white;
  transition: 0.3s;
  max-width: 350px;
  cursor: pointer;
  width: 100%;

  &:hover {
    transform: scale(0.98);
  }

  ${breakpoints.tabletMediumMax} {
    max-width: none;
  }
`

export const ContainerHeadImage = styled.div<{ image: string }>`
  background-image: url(${p => p.image});
  border-radius: 8px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 200px;
`

export const ContainerInfo = styled.div<{ status: string; type: string }>`
  flex-direction: column;
  padding: 20px 0;
  display: flex;
  gap: 10px;

  > p:nth-last-child(1) {
    font-weight: 600;
    background: white;
    color: black;
    position: absolute;
    top: 20px;
    left: 20px;
    font-weight: 600;
    font-size: 0.8rem;
    padding: 2px 10px;
    border-radius: 5px;
  }
`
export const ContainerPriceStatus = styled.div`
  grid-template-columns: fit-content(100%) 1fr;
  align-items: center;
  display: grid;
  gap: 20px;

  > p {
    font-weight: 600;

    &:nth-child(1) {
      display: flex;
      flex-direction: row;
      align-items: flex-end;

      > span {
        &:nth-child(1) {
          font-size: 0.6rem;
          padding-bottom: 5px;
        }
        &:nth-child(2) {
          font-size: 1.3rem;
        }
        &:nth-child(3) {
          font-weight: 100;
          font-size: 0.8rem;
          padding-bottom: 4px;
        }
      }
    }

    &:nth-child(2) {
      > span {
        background: linear-gradient(
          90deg,
          rgba(0, 196, 154, 0.2),
          rgba(0, 196, 154, 0.8)
        );
        color: black;
        border-radius: 6px;
        place-items: center;
        font-size: 0.8rem;
        width: fit-content;
        padding: 5px 15px;
        font-weight: 600;
        display: grid;
      }
    }
  }
`

export const ContainerInfoProp = styled.div`
  flex-direction: column;
  display: flex;

  > p {
    &: nth-child(1) {
      font-weight: 400;
      font-size: 1rem;
    }

    &: nth-child(2) {
      color: rgb(98, 98, 98);
      font-weight: 400;
      font-size: 0.8rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 15px;

      > span:nth-child(2n) {
        background: rgb(98, 98, 98);
        border-radius: 50%;
        height: 4px;
        width: 4px;
      }
    }
  }
`
