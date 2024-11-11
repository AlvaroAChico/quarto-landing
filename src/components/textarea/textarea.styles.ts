import styled from "styled-components"
import { breakpoints } from "../../constants/breakpoints"
import { palette } from "../../config/theme/theme"

export const InputWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  border: 1px solid ${palette.inputBorderolor};
  border-radius: 10px; // Radio del borde
  padding: 14px;
  width: 100%;
  background: ${palette.inputBgColor};

  &:focus-within {
    border-color: ${palette.primaryColor};
    // box-shadow: 0 0 8px rgba(245, 158, 54, 0.5); // Sombra cuando está enfocado
  }

  ${breakpoints.phoneSmall} {
    max-width: 200px;
  }
`
export const StyledInput = styled.textarea`
  background: ${palette.inputBgColor};
  color: ${palette.inputTextrolor};
  font-size: 15px;
  resize: none;
  outline: none;
  border: none;
  flex: 1;

  &::placeholder {
    color: ${palette.inputTextrolor};
  }

  ${breakpoints.phoneSmall} {
    width: 100%;
  }
`
export const IconContainer = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${palette.grayColor};
`
