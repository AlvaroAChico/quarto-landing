import { palette } from "../../config/theme/theme"
import styled from "styled-components"

export const ContainerHeaderBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`

export const UsersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  :hover {
    background: #e7e7e7;
  }
`

export const ItemUserContainer = styled.div`
  width: 100%;
  border: 1px solid #ebebeb;
  padding: 8px 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const ListPermissionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  > div {
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }

    &:nth-child(1) {
      > svg {
        max-width: 20px;
        width: 100%;
        color: ${palette.secondaryColor};
      }
    }
    &:nth-child(2) {
      > svg {
        max-width: 20px;
        width: 100%;
        color: ${palette.primaryColor};
      }
    }
    &:nth-child(3) {
      > svg {
        max-width: 20px;
        width: 100%;
        color: ${palette.errorColor};
      }
    }
  }
`

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
    width: 10%;
  }
  > tr td:nth-child(2) {
    width: 60%;
  }
  > tr td:nth-child(3) {
    width: 20%;
  }
  > tr td:nth-child(3) {
    width: 20%;
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
    width: 10%;
  }
  > tr td:nth-child(2) {
    width: 60%;
  }
  > tr td:nth-child(3) {
    width: 20%;
  }
  > tr td:nth-child(3) {
    width: 20%;
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
