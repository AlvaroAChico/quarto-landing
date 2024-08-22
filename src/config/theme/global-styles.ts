import styled, { createGlobalStyle } from "styled-components"
import { palette } from "./theme"

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
