import styled from "styled-components"
import { palette } from "../../config/theme/theme"

export const ContainerTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`
export const ContainerHead = styled.thead`
  width: 100%;

  > tr {
    border-bottom: 1px #e0e0e0 solid;
    > td {
      padding: 10px;
    }
  }

  > tr td:nth-child(1) {
    width: 10px;
  }
  > tr td:nth-child(2) {
    width: 80%;
  }
`
export const ContainerBody = styled.tbody`
  width: 100%;

  > tr {
    border-bottom: 1px #e0e0e0 solid;
    > td {
      padding: 10px;
    }
  }
  > tr td:nth-child(1) {
    width: 10px;
  }
  > tr td:nth-child(2) {
    width: 80%;
  }
`

export const ContainerActions = styled.td`
  color: white;
  display: flex;
  flex-direction: row;
  gap: 10px;

  > div {
    width: 35px;
    height: 35px;
    display: grid;
    place-items: center;
    border-radius: 10px;

    > svg {
      max-width: 25px;
      width: 100%;
    }

    &:nth-child(1) {
      background: ${palette.successColor};
      cursor: pointer;
      transition: 0.5s;

      &:hover {
        background: ${palette.successColorHover};
      }
    }
    &:nth-child(2) {
      background: ${palette.errorColor};
      cursor: pointer;
      transition: 0.5s;

      &:hover {
        background: ${palette.errorColorHover};
      }
    }
  }
`
