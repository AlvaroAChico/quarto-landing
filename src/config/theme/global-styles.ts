import styled, { createGlobalStyle } from "styled-components"
import { palette } from "./theme"

export const GlobalStyles = createGlobalStyle`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  .react-datepicker-wrapper {
    // visibility: hidden;
    // position: absolute;
    // opacity: 0;
    // bottom: 0;
  }

  .react-datepicker {
    border-radius: 22px 22px 8px 8px;
    border-top: 0;
  }
  
  .react-datepicker__input-container{
    display: flex;
    gap:20px;

    > svg {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      margin-left: 10px;
    }

    > input {
      border: 1px solid #ebebeb;
      border-radius: 10px;
      padding-left: 50px;
      max-width: 400px;
      font-size: 15px;
      height: 47px;
      width: 100%;

      &:focus-within {
        border-color: #f59e36; // Color del borde cuando está enfocado
        box-shadow: 0 0 8px rgba(245, 158, 54, 0.5); // Sombra cuando está enfocado
      }
    }
  }

  .react-datepicker__current-month {
    color: white;
  }

  .react-datepicker__header__dropdown {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .react-datepicker__day-name {
    color: white !important;
  }

  .react-datepicker__month-select,
  .react-datepicker__year-select {
    color: ${palette.primaryColor};
    border-radius: 6px;
    padding: 3px 15px;
    outline: none;
    width: 100%;
  }

  .react-datepicker__month-dropdown-container--select,
  .react-datepicker__year-dropdown-container--select {
    margin: 0px 5px;
  }

  .react-datepicker__day-name {
    text-transform: uppercase;
    font-size: 12px;
  }

  .react-datepicker__header {
    background: ${palette.primaryColor};
    border-bottom: 0px solid #aeaeae;
    border-top: 0px solid #aeaeae;
    border-radius: 6px;
    margin: auto;
    width: 100%;
  }

  .react-datepicker__triangle::after,
  .react-datepicker__triangle::before {
    border-bottom-color: ${palette.primaryColor} !important;
    top: 1px !important;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background: ${palette.secondaryColor};
    outline: none;
    color: white;
  }
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
export const NotFoundStyles = styled.div`
  text-align: center;
  padding: 40px 0 !important;

  > span {
    color: ${palette.errorColor};
    text-align: center;
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

export const CustomWrapperInputAvatar = styled(WrapperInput)`
  > div {
    display: flex;
    flex-direction: row;
    justify-content: center;

    div {
      > svg {
        width: 100%;
        max-width: 20px;
      }
    }
  }
`

export const CustomWrapperInputFiles = styled(WrapperInput)`
  margin: auto;
  max-width: 800px;

  > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;

    div {
      > svg {
        width: 100%;
        max-width: 20px;
      }
    }
  }
`
export const ContainerImageAvatar = styled.div`
  position: relative;
  height: 160px;
  width: 160px;

  > img {
    border: 2px solid ${palette.grayColor};
    place-items: center;
    border-radius: 50%;
    object-fit: cover;
    display: grid;
    height: 160px;
    width: 160px;
  }

  > div {
    box-shadow:
      rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    background: ${palette.errorColor};
    place-items: center;
    position: absolute;
    border-radius: 50%;
    cursor: pointer;
    display: grid;
    padding: 8px;
    height: 40px;
    width: 40px;
    bottom: 0;
    right: 0;

    > svg {
      color: white;
      width: 100%;
      max-width: 15px;
    }
  }
`

export const ContainerDragAndDropAvatar = styled.div<{ isDragActive: boolean }>`
  border: 1px solid ${p => (p.isDragActive ? palette.successColor : "#ebebeb")};
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 50%;
  padding: 4px 14px;
  display: flex;
  height: 160px;
  width: 160px;
  gap: 10px;

  > p {
    color: ${palette.grayColor};
    font-size: 14px;
  }

  &:focus-within {
    border-color: #f59e36; // Color del borde cuando está enfocado
    box-shadow: 0 0 8px rgba(245, 158, 54, 0.5); // Sombra cuando está enfocado
  }
`

export const ContainerDragAndDropFiles = styled.div<{ isDragActive: boolean }>`
  border: 1px solid ${p => (p.isDragActive ? palette.successColor : "#ebebeb")};
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 20px;
  padding: 4px 14px;
  display: flex;
  height: 100px;
  gap: 10px;

  > svg {
    widt: 100%;
    max-width: 20px;
  }

  > p {
    color: ${palette.grayColor};
    font-size: 14px;
  }

  &:focus-within {
    border-color: #f59e36; // Color del borde cuando está enfocado
    box-shadow: 0 0 8px rgba(245, 158, 54, 0.5); // Sombra cuando está enfocado
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
