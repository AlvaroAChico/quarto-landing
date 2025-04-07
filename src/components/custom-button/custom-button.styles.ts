import styled, { keyframes } from "styled-components"
import { palette } from "../../config/theme/theme"

export const ContainerButton = styled.button<{
  $isLoading: boolean
  $style: string
  $customStyle: string
}>`
  border: 1px solid
    ${p =>
      p.$isLoading
        ? "rgb(227,227,227)"
        : p.$style.toLowerCase() == "secondary"
          ? palette.primaryColor
          : palette.primaryColor};
  background: ${p =>
    p.$isLoading
      ? "#e6e6e6"
      : p.$style.toLowerCase() == "secondary"
        ? "white"
        : palette.primaryColor};
  color: ${p =>
    p.$isLoading
      ? "#e6e6e6"
      : p.$style.toLowerCase() == "secondary"
        ? palette.primaryColor
        : "white"};
  justify-content: center;
  place-items: center;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  padding: 12px 20px;
  width: fit-content;
  min-width: 160px;
  max-width: 250px;
  min-height: 50px;
  transition: 0.2s;
  cursor: pointer;
  display: flex;
  gap: 10px;

  &:hover {
    background: ${p =>
      p.$isLoading
        ? "#e6e6e6"
        : p.$style.toLowerCase() == "secondary"
          ? "#ededed"
          : palette.primaryColorDark};
  }

  > svg {
    max-width: 20px;
    width: 100%;
  }

  ${p => p.$customStyle}
`

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} `

export const ButtonLoader = styled.div`
  height: 25px;
  width: 25px;
  border: 3px solid #b0b0b0;
  border-bottom-color: transparent;
  margin: auto;
  border-radius: 50%;
  display: inline-block;
  background: transparent;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`
