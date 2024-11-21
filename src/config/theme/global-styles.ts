import styled, { createGlobalStyle } from "styled-components"
import { palette } from "./theme"
import { breakpoints } from "../../constants/breakpoints"

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
    color:red;

    > svg {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      margin-left: 10px;
    }

    > input {
      // border: 1px solid #ebebeb;
      border: none;
      border-radius: 10px;
      padding-left: 50px;
      max-width: 400px;
      font-size: 15px;
      height: 47px;
      width: 100%;

      &:focus-within {
        // border-color: #f59e36; // Color del borde cuando está enfocado
        // box-shadow: 0 0 8px rgba(245, 158, 54, 0.5); // Sombra cuando está enfocado
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
    background: ${palette.primaryColor};
    outline: none;
    color: white;
  }
`

export const WrapperInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  > label {
    color: black;
    font-weight: 600;
    font-size: 0.9rem;

    > span {
      padding: 10px;
      color: ${palette.primaryColor};
      font-weight: 400;
    }
  }
`

export const ErrorMessage = styled.span`
  color: ${palette.redColor};
  font-size: 12px;
`

export const ContainerTable = styled.div`
  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
  border-radius: 20px;
  background: white;
  padding: 30px;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

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

      &:nth-child(1) {
        min-width: 180px;
      }
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
    width: 100%;

    > td {
      padding: 15px;
      height: 100%;
      vertical-align: middle;
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
padding: 0 !important;
width: 100px;

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
      background: ${palette.grayColor};
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
  width: 100%;
  color: ${palette.grayColor};

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
    border-radius: 20px;
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
    border-radius: 20px;
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
  border: 1px solid
    ${p => (p.isDragActive ? palette.successColor : palette.inputBorderolor)};
  background: ${palette.inputBgColor};
  color: ${palette.inputTextrolor};
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 20px;
  padding: 4px 14px;
  display: flex;
  height: 160px;
  width: 160px;
  gap: 10px;

  > p {
    color: ${palette.inputTextrolor};
    font-size: 14px;
  }

  &:focus-within {
    border-color: #f59e36; // Color del borde cuando está enfocado
    box-shadow: 0 0 8px rgba(245, 158, 54, 0.5); // Sombra cuando está enfocado
  }
`

export const ContainerDragAndDropFiles = styled.div<{ isDragActive: boolean }>`
  border: 1px solid
    ${p => (p.isDragActive ? palette.successColor : palette.inputBorderolor)};
  background: ${palette.inputBgColor};
  color: ${palette.inputTextrolor};
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
    color: ${palette.inputTextrolor};
    font-size: 14px;
  }

  &:focus-within {
    border-color: #f59e36; // Color del borde cuando está enfocado
    box-shadow: 0 0 8px rgba(245, 158, 54, 0.5); // Sombra cuando está enfocado
  }
`

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

export const ContainerFilters = styled.div`
  border: 1px solid ${palette.inputBorderolor};
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-direction: row;
  border-radius: 15px;
  width: fit-content;
  background: white;
  display: flex;
  gap: 5px;

  > div {
    width: 25%;
    height: 40px;
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  ${breakpoints.laptopMax} {
    justify-content: flex-start;
    width: 100%;

    > div {
      &:nth-child(1) {
        display: none;
      }
      &:nth-last-child(1) {
        display: none;
      }

      &:nth-last-child(2) {
        border: none;
      }
    }
  }

  ${breakpoints.tabletMediumMax} {
    flex-wrap: wrap;
    justify-content: space-between;

    > div {
      width: calc(50% - 2.5px);

      &:nth-last-child(4) {
        border: none;
      }
    }
  }
`

export const ContainerResetMobileFilter = styled.div`
  border: 1px solid ${palette.inputBorderolor};
  border-radius: 15px;
  margin-bottom: 10px;
  background: white;
  display: none;

  > div {
    padding: 10px;

    &:nth-child(1) {
      border-right: 1px solid ${palette.inputBorderolor};
    }
  }

  ${breakpoints.laptopMax} {
    display: flex;
  }
`

export const ItemFilterStyle = styled.div`
  border-right: 1px solid ${palette.inputBorderolor};
  position: relative;
  padding: 32px 10px;

  > div {
    width: 100%;
  }

  &:nth-last-child(1) {
    border-right: none;
  }

  .react-datepicker__input-container {
    > input {
      color: black !important;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0;

      &::placeholder {
        color: black !important;
        font-weight: 600;
        font-size: 0.8rem;
      }
    }
  }

  > span:nth-last-child(1) {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0px;
    right: 12px;
    margin: auto;
    top: 0px;

    > svg {
      width: 100%;
      max-width: 20px;
    }
  }

  ${breakpoints.tabletMediumMax} {
    padding: 25px 10px;
  }
`

export const ContainerText = styled.div`
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  height: 100%;
  width: 100%;
  gap: 15px;

  > span svg {
    width: 100%;
    max-width: 20px;
  }
`

export const ContainerReset = styled.div`
  color: ${palette.redColor};
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  height: 100%;
  width: 100%;
  gap: 15px;

  > span svg {
    width: 100%;
    max-width: 20px;
  }
`

export const selectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused
      ? palette.primaryColor
      : palette.inputBorderolor,
    boxShadow: state.isFocused ? "0 0 0 #fff" : provided.boxShadow,
    background: palette.inputBgColor,
    borderRadius: 10,
    padding: "10px 10px",
    height: "100%",
    cursor: "pointer",
    "&:hover": {
      borderColor: state.isFocused ? palette.grayColor : "none",
      // transform: "scale(1.05)",
    },
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
  placeholder: (provided: any) => ({
    ...provided,
    color: palette.inputTextrolor,
  }),
}

export const selectFilterStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? "white" : "white",
    boxShadow: state.isFocused ? "0 0 0 #fff" : provided.boxShadow,
    background: "white",
    borderRadius: 10,
    padding: "10px 10px",
    height: "100%",
    cursor: "pointer",
    "&:hover": {
      borderColor: state.isFocused ? palette.grayColor : "none",
      // transform: "scale(1.05)",
    },
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
  placeholder: (provided: any) => ({
    ...provided,
    color: "#000",
    fontWeight: "800",
  }),
}

export const selectStylesFilterTable = {
  control: (provided: any, state: any) => ({
    ...provided,
    border: "0px solid transparent",
    backgroundColor: "transparent",
    boxShadow: "none",
    borderRadius: 0,
    outline: "none",
    fontSize: "0.8rem",
    "> div:nth-child(1) div": {
      color: "#000000",
      fontWeight: 600,
    },
    "> div:nth-child(2)": {
      paddingRight: "5px",
      "> span": {
        display: "none",
      },
      "> div svg": {
        fill: "black",
      },
    },
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
  placeholder: (provided: any) => ({
    ...provided,
    color: "#000",
    fontWeight: "600",
    fontSize: "0.8rem",
  }),
}
