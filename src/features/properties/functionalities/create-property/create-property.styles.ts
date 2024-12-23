import styled from "styled-components"
import { palette } from "../../../../config/theme/theme"
import { WrapperInput } from "../../../../config/theme/global-styles"
import { breakpoints } from "../../../../constants/breakpoints"

export const FormContainer = styled.div`
  grid-template-columns: repeat(2, 1fr);
  width: fit-content;
  min-width: 800px;
  display: grid;
  margin: auto;
  gap: 15px;
`

export const ContainerBodyCreate = styled.div``

export const CustomWrapperInput = styled(WrapperInput)`
  > label {
    span {
      color: ${palette.successColor};
      margin-left: 10px;
      font-weight: 900;
    }
  }
`

export const ContainerButton = styled.div`
  display: flex;
  justify-content: flex-end;

  > button {
    margin-top: 20px;
    width: 100%;
    max-width: 150px;

    ${breakpoints.tabletMediumMax} {
      max-width: 100%;
    }
  }
`

export const ContainerDragAndDrop = styled.div<{ isDragActive: boolean }>`
  display: flex;
  align-items: center;
  border: 1px solid ${p => (p.isDragActive ? palette.successColor : "#ebebeb")};
  border-radius: 10px;
  padding: 4px 14px;
  width: 100%;
  max-width: 400px;
  height: 47px;
  gap: 15px;

  > p {
    color: ${palette.grayColor};
    font-size: 14px;
  }

  &:focus-within {
    border-color: ${palette.primaryColor};
    // box-shadow: 0 0 8px rgba(245, 158, 54, 0.5); // Sombra cuando está enfocado
  }

  > svg {
    width: 100%;
    max-width: 20px;
  }
`

export const ContainerStepperCreate = styled.div`
  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
  padding: 30px;
  border-radius: 16px;
  background: white;
`

export const ResidentialFormStyles = styled.div``

export const ContainerResFormStyles = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
  gap: 20px;
`

export const ContainerSwitchTwo = styled.div`
  flex-direction: column;
  display: flex;
  gap: 10px;

  > label {
    font-weight: 600;
  }
`

export const ContainerThreeInputs = styled.div`
  display: flex;
  gap: 10px;

  > div {
    width: calc(33% - 10px);
  }
`

export const ContainerTwoInputs = styled.div`
  display: flex;
  gap: 10px;

  > div {
    width: calc(50% - 10px);
  }
`
export const ContainerOneInputs = styled.div`
  display: flex;

  > div {
    width: 100%;
  }
`

export const ContainerUpInputs = styled.div`
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  margin-bottom: 20px;
  display: flex;
  gap: 20px;

  ${breakpoints.tabletMediumMax} {
    flex-direction: column;
  }
`

export const ContainerDownInputs = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;

  > div {
    &:nth-child(1) {
      width: 100%;
    }
    &:nth-child(2),
    &:nth-child(3) {
      width: 50%s;
    }
  }
`

export const SteppersStyles = styled.div`
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
  display: flex;
  width: 100%;
  gap: 20px;
`

export const ItemStepper = styled.div<{ isActive: boolean }>`
  flex-direction: row;
  align-items: center;
  display: flex;
  width: 100%;
  gap: 8px;

  > div {
    > span {
      &:nth-child(1) {
        color: ${p => (p.isActive ? "white" : "#7A86A1")};
        background: ${p => (p.isActive ? palette.primaryColor : "white")};
        border: 1px solid
          ${p => (p.isActive ? palette.primaryColor : "#ebebeb")};
        box-shadow: ${p =>
          p.isActive ? "8px 10px 30px 4px rgba(238, 236, 243, 1)" : "none"};
        border-radius: 10px;
        place-items: center;
        font-weight: 600;
        cursor: pointer;
        display: grid;
        height: 40px;
        width: 40px;
      }
    }
  }

  > span {
    &:nth-child(2) {
      color: ${p => (p.isActive ? palette.primaryColor : "#7A86A1")};
    }
    &:nth-child(3) {
      background: #ebebeb;
      width: 100%;
      height: 2px;
    }
  }

  &:last-child {
    width: fit-content;
  }
`

export const ContainerCheckTypeProperty = styled.div<{ typeProperty: number }>`
  background: ${palette.inputBgColor};
  border: 1px solid ${palette.inputBorderolor};
  flex-direction: row;
  border-radius: 10px;
  transition: 0.2s;
  display: flex;
  height: 60px;

  > div {
    border-radius: 10px;
    transition: 0.2s;
    cursor: pointer;
    padding: 15px;
    width: 100%;

    &:nth-child(1) {
      background: ${p => p.typeProperty === 1 && palette.primaryColor};
      color: ${p => p.typeProperty === 1 && "white"};
    }
    &:nth-child(2) {
      background: ${p => p.typeProperty === 2 && palette.primaryColor};
      color: ${p => p.typeProperty === 2 && "white"};
    }
  }
`

export const ContainerUploadFiles = styled.div``

export const ContainerListFiles = styled.div`
  display: flex;
  overflow-y: auto;
  padding: 20px 10px;
  gap: 10px;
  justify-content: flex-start !important;
`

export const ContainerSwitchs = styled.div`
  padding: 10px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`

export const ActionCreateSpan = styled.span`
  padding: 0 0 0 10px !important;
  display: inline-block;
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    transform: scale(0.9);
  }
`
