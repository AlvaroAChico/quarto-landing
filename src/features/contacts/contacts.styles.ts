import styled from "styled-components"
import { palette } from "../../config/theme/theme"

export const CardStadistics = styled.div`
  flex-direction: row;
  display: flex;
  gap: 40px;
`

export const ContentStylesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export const SectionRoute = styled.div``

export const NameStylesTD = styled.td`
  > div {
    flex-direction: row;
    display: flex;
    gap: 10px;

    > span {
      > img {
        border-radius: 16px;
        object-fit: cover;
        width: 50px;
        height: 50px;
      }
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 2px;

      > span {
        &:nth-child(2) {
          color: ${palette.grayColor};
          font-size: 14px;
          font-weight: 500;
        }

        &:nth-child(2) {
          color: ${palette.grayColor};
          font-size: 12px;
          font-weight: 200;
        }
      }
    }
  }
`

export const ClientStylesTD = styled.td`
  > div {
    width: fit-content;
    min-width: 80px;

    > span {
      color: ${palette.grayColor};
      font-size: 12px;
      font-weight: 500;

      > svg {
        width: 100%;
        max-width: 15px;
      }
    }
  }
`
export const DateStylesTD = styled.td`
  > div {
    > span {
      color: ${palette.grayColor};
      font-size: 12px;
      font-weight: 500;
    }
  }
`

export const ContainerOffer = styled.div`
  background: ${palette.blueColor};
  color: ${palette.whiteColor};
  flex-direction: column;
  border-radius: 15px;
  padding: 40px;
  display: flex;
  gap: 10px;

  > h3 {
    font-size: 2.6rem;
    font-weight: 800;
  }

  > p {
    font-size: 1.2rem;
    font-weight: 200;
  }
`

export const ContainerListProperties = styled.div`
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
  display: grid;
  gap: 20px;
`
