import styled from "styled-components"
import { breakpoints } from "../../constants/breakpoints"

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ebebeb; // Color del borde
  border-radius: 10px; // Radio del borde
  padding: 4px 14px;
  width: 100%;
  max-width: 400px;

  &:focus-within {
    border-color: #f59e36; // Color del borde cuando está enfocado
    box-shadow: 0 0 8px rgba(245, 158, 54, 0.5); // Sombra cuando está enfocado
  }

  ${breakpoints.phoneSmall} {
    max-width: 200px;
  }
`
export const StyledInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 8px;
  font-size: 15px;

  ${breakpoints.phoneSmall} {
    width: 100%;
  }
`
export const IconContainer = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`