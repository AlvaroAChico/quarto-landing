import styled, { createGlobalStyle } from "styled-components"
import { palette } from "./theme"
import { BorderRadius } from "styled-icons/boxicons-regular"

export const GlobalStyles = createGlobalStyle`
    // input {
    //     display: flex;
    //     align-items: center;
    //     border: 1px solid #ebebeb; // Color del borde
    //     border-radius: 10px; // Radio del borde
    //     padding: 10px 15px;
    //     max-width: 400px;
    //     width: 100%;

    //     &:focus-within {
    //       border-color: #f59e36; // Color del borde cuando está enfocado
    //       box-shadow: 0 0 8px rgba(245, 158, 54, 0.5); // Sombra cuando está enfocado
    //     }
    // }
  `

export const WrapperInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ErrorMessage = styled.span`
  color: ${palette.errorColor};
  font-size: 12px;
`

export const ContainerTable = styled.div`
  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
  border-radius: 20px;
  background: white;
  padding: 30px;
  width: 100%;

  > table {
    border-collapse: collapse;
    width: 100%;
  }
`

export const ContainerHead = styled.thead`
  width: 100%;

  > tr {
    border-bottom: 1px #e0e0e0 solid;
    > td {
      color: ${palette.grayColor};
      font-weight: 600;
      font-size: 12px;
      padding: 10px;

      &:nth-last-child(1) {
        max-width: 20px;
      }
    }
  }
`
export const ContainerBody = styled.tbody`
  width: 100%;

  > tr {
    transition: 0.5s;

    > td {
      padding: 15px;
      height: 100%;
      vertical-align: center;
    }

    &:hover {
      box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
      border-radius: 10px;
    }
  }
`
export const ClasicStylesTD = styled.td`
  > div {
    flex-direction: column;
    display: flex;
    gap: 2px;

    > span {
      color: ${palette.grayColor};
      font-size: 14px;
      font-weight: 500;
    }
  }
`

export const ContainerActions = styled.td`
  > div {
    position: relative;
    max-width 20px;
    width 100%;

    > div:nth-child(1) {
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      height: 100%;
      width: 100%;

      > svg {
        max-width: 25px;
        width: 100%;
      }

      &:nth-child(1) {
        color: ${palette.grayColor};
        transition: 0.2s;
        cursor: pointer;
      }
    }
  }
`

export const ContainerDropdown = styled.div`
  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
  flex-direction: column;
  border-radius: 15px;
  position: absolute;
  width: fit-content;
  background: white;
  display: flex;
  padding: 8px;
  z-index: 1;
  gap: 10px;

  > span {
    border-radius: 5px;
    padding: 5px 20px;
    cursor: pointer;

    &:hover {
      background: ${palette.grayLightColor};
    }
  }
`

export const selectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? "#f59e36" : palette.grayLightColor,
    boxShadow: state.isFocused ? "0 0 5px #f59e36" : provided.boxShadow,
    "&:hover": {
      borderColor: state.isFocused ? "#f59e36" : "gray", // color al pasar el ratón
    },
    background: "white",
    borderRadius: 10,
    padding: "1px 4px",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? palette.primaryColor : "white",
    color: state.isSelected ? "black" : "black",
    "&:hover": {
      backgroundColor: palette.primaryColor,
      color: "white",
    },
  }),
}
