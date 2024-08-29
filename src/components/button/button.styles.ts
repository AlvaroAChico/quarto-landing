// src/components/ui/Button/Button.styles.ts
import styled, { keyframes } from "styled-components"
import { breakpoints } from "../../constants/breakpoints"

export const StyledButton = styled.button`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) -40%,
    rgba(249, 174, 54, 1) 0%,
    rgba(245, 134, 52, 1) 100%
  );
  outline: none;
  border: none;
  color: white;
  height: 50px;
  border-radius: 10px;
  box-shadow: 5px 5px 30px 2px rgba(245, 134, 52, 0.5);
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
  border: 2px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  background: transparent;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
  }
`
