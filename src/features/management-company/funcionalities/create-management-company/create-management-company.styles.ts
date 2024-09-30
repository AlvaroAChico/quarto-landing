import styled from "styled-components"
import { palette } from "../../../../config/theme/theme"
import { WrapperInput } from "../../../../config/theme/global-styles"

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
    border-color: #f59e36; // Color del borde cuando está enfocado
    box-shadow: 0 0 8px rgba(245, 158, 54, 0.5); // Sombra cuando está enfocado
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
`

export const ResidentialFormStyles = styled.div``

export const ContainerResFormStyles = styled.div`
  width: 100%;
`

export const ContainerUpInputs = styled.div`
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`

export const ContainerDownInputs = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;

  > div {
    width: 45%;
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
      color: ${p => (p.isActive ? palette.orangeColor : "#7A86A1")};
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
