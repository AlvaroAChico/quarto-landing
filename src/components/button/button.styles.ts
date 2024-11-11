// src/components/ui/Button/Button.styles.ts
import styled, { keyframes } from "styled-components"
import { breakpoints } from "../../constants/breakpoints"
import { palette } from "../../config/theme/theme"

export const StyledButton = styled.button<{ customStyles: string }>`
  background: ${palette.primaryColor};
  outline: none;
  border: none;
  color: white;
  height: 50px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
  padding: 6px 20px;

  &:hover {
    transform: scale(1.05);
  }

  > svg {
    width: 100%;
    max-width: 20px;
  }

  ${breakpoints.phoneSmall} {
    min-width: 150px;
    margin: auto;
  }

  ${p => p.customStyles};
`
const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} `

export const LoaderStyles = styled.button`
  width: 25px;
  height: 25px;
  border: 2px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  background: transparent;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`
