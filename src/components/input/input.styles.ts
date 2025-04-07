import styled from "styled-components"
import { breakpoints } from "../../constants/breakpoints"
import { palette } from "../../config/theme/theme"

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${palette.inputBorderolor};
  border-radius: 8px;
  padding: 4px 14px;
  width: 100%;
  background: white;
  height: 58px;

  &:focus-within {
    border-color: ${palette.primaryColor};
    // box-shadow: 0 0 8px ${palette.primaryColor};
  }

  > input {
    color: black;
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
  background: white;
  color: ${palette.inputTextrolor};

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
  color: ${palette.inputTextrolor};
`
