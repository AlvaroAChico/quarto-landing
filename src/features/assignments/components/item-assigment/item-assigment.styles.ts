import styled, { keyframes } from "styled-components"
import { palette } from "../../../../config/theme/theme"
import { breakpoints } from "../../../../constants/breakpoints"

export const ItemAssigmentStyles = styled.div`
  box-shadow: 8px 10px 30px 4px rgb(189 189 189 / 13%);
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
  padding: 10px 20px;
  display: flex;
  gap: 20px;

  ${breakpoints.tabletMediumMax} {
    flex-direction: column;
  }
`

export const InfoAssig = styled.div`
  flex-direction: row;
  align-items: center;
  display: flex;
  width: 70%;
  gap: 10px;

  > div {
    flex-direction: column;
    display: flex;

    > img {
      border-radius: 10px;
      width: 80px;
      height: 80px;
      object-fit: cover;
    }

    > span {
      &:nth-child(1) {
        color: #bebebe;
      }
      &:nth-child(2) {
        color: #737373;
        font-size: 22px;
        font-weight: 900;
      }
      &:nth-child(3) {
        color: ${palette.secondaryColor};
        font-weight: 500;
        font-size: 15px;
      }
      &:nth-child(4) {
        color: #bebebe;
        font-size: 12px;
      }
      &:nth-child(5) {
        color: #000;
        font-size: 12px;
      }
    }
  }

  ${breakpoints.tabletMediumMax} {
    width: 100%;
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
  border: 2px solid ${palette.primaryColor};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  background: transparent;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
  }
`

export const ActionsAssig = styled.div`
  flex-direction: column;
  position: relative;
  display: flex;
  height: 100%;
  width: 30%;
  gap: 10px;

  > button {
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s;
    outline: none;
    border: none;
    color: white;
    width: 100%;

    &:nth-child(1) {
      background: ${palette.successColor};
      height: 60px;

      &:hover {
        background: ${palette.successColorHover};
      }

      ${breakpoints.tabletMediumMax} {
        height: 40px;
      }
    }

    &:nth-child(2) {
      background: ${palette.errorColor};
      height: 40px;

      &:hover {
        background: ${palette.errorColorHover};
      }
    }

    > svg {
      max-width: 20px;
      width: 100%;
    }
  }

  > div {
    background: #ffffffad;
    place-items: center;
    border-radius: 10px;
    position: absolute;
    display: grid;
    height: 100%;
    width: 100%;
  }

  ${breakpoints.tabletMediumMax} {
    width: 100%;
    flex-direction: row;
  }
`
