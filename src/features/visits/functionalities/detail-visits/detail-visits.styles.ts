import styled from "styled-components"
import { palette } from "../../../../config/theme/theme"
import { breakpoints } from "../../../../constants/breakpoints"

export const ContainerDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  > * svg {
    max-width: 25px;
    cursor: pointer;
    width: 100%;
  }
`

export const OptionsDetailVisits = styled.div`
  justify-content: right;
  margin-bottom: 20px;
  max-width: 1000px;
  display: flex;
  width: 100%;
  gap: 20px;
`

export const GeneralInfoVisit = styled.div`
  background: white;
  border: 1px solid ${palette.inputBorderolor};
  padding: 20px;
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
`

export const ContainerInfoVisit = styled(GeneralInfoVisit)`
  > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;

    &:nth-child(1) {
      justify-content: space-between;
      margin-bottom: 15px;

      > span {
        display: flex;
        gap: 12px;
      }
    }

    > p {
      width: 100%;
      color: red;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;

      &:nth-child(1) {
        > span:nth-child(1) {
          color: #3c3c3c;
          font-weight: 600;
        }
        > span:nth-child(2) {
          background: ${palette.successColor};
          text-transform: capitalize;
          border-radius: 6 px;
          place-items: center;
          border-radius: 5px;
          padding: 5px 10px;
          font-size: 0.8rem;
          font-weight: 600;
          display: grid;
          color: white;
        }
      }

      &:nth-child(2),
      &:nth-child(3) {
        width: calc(50% - 20px);
      }

      > span {
        &:nth-child(1) {
          color: #858585;
        }
        &:nth-child(2) {
          color: #3c3c3c;
        }
      }

      &:nth-last-child(1) {
        display: flex;
        flex-direction: row;
        gap: 20px;
        width: 100%;
        color: green;

        > span:nth-child(1) {
          width: calc(30%-20px);
        }
        > span:nth-child(2) {
          width: calc(70%-20px);
        }
      }
    }
  }
`

export const ContainerInfoRental = styled(GeneralInfoVisit)``

export const ItemInfoRental = styled.div`
  border-bottom: 1px solid ${palette.inputBorderolor};
  padding: 15px 0;

  &:nth-last-child(1) {
    border-bottom: none;
  }

  > div {
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
    display: flex;
    width: 100%;

    > div {
      margin-bottom: 15px;

      &:nth-child(1) {
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;
        display: flex;
        width: 80%;

        > span {
          &:nth-child(1) {
            color: #858585;
            width: 25%;
          }
          &:nth-child(2) {
            font-weight: 600;
            color: #3c3c3c;
            width: 75%;
          }
        }

        ${breakpoints.tabletLargeMax} {
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: column;
        }
      }

      &:nth-child(2) {
        justify-content: flex-end;
        display: flex;
        width: 20%;
        gap: 20px;
      }
    }

    > span {
      &:nth-child(1) {
        color: #858585;
        min-width: 100px;
        width: 20%;
      }
      &:nth-child(2) {
        font-weight: 600;
        color: #3c3c3c;
        width: 80%;
      }
    }
  }

  > div:nth-child(2) {
    flex-direction: row;
    display: flex;

    ${breakpoints.tabletLargeMax} {
      flex-direction: column;
    }
  }
`
