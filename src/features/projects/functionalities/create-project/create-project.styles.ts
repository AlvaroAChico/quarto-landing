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
  display: grid;
  place-items: center;

  > button {
    margin-top: 20px;
    width: 100%;
    max-width: 800px;
  }
`

export const ContainerDragAndDrop = styled.div<{ isDragActive: boolean }>`
  display: flex;
  align-items: center;
  border: 1px solid ${p => (p.isDragActive ? palette.successColor : "#ebebeb")}; // Color del borde
  border-radius: 10px; // Radio del borde
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
