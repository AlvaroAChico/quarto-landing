import styled from "styled-components"
import { breakpoints } from "../../../../constants/breakpoints"
import { palette } from "../../../../config/theme/theme"

export const ContainerCard = styled.div`
  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
  border-radius: 20px;
  position: relative;
  background: white;
  transition: 0.3s;
  max-width: 350px;
  cursor: pointer;
  width: 100%;

  &:hover {
    transform: scale(0.95);
  }

  ${breakpoints.tabletMediumMax} {
    max-width: none;
  }
`

export const ContainerHeadImage = styled.div<{ image: string }>`
  background-image: url(${p => p.image});
  border-radius: 20px 20px 0 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 200px;
`

export const ContainerInfo = styled.div<{ status: string; type: string }>`
  padding: 20px;

  > p {
    font-weight: 600;

    &:nth-child(2) {
      flex-direction: row;
      align-items: center;
      margin-top: 10px;
      display: flex;

      > span {
        margin-left: 20px;
        background: ${p =>
          p.status == "aceptado"
            ? palette.successColor
            : p.status == "en proceso"
              ? palette.infoColor
              : palette.errorColor};

        color: ${p =>
          p.status == "aceptado"
            ? "white"
            : p.status == "aceptada"
              ? palette.infoColorHover
              : palette.errorColorHover};

        text-transform: capitalize;
        border-radius: 6px;
        place-items: center;
        font-size: 0.8rem;
        font-weight: 600;
        width: fit-content;
        display: grid;
        padding: 5px 15px;
      }
    }

    &:nth-last-child(1) {
      background: ${p =>
        p.type == "quarto"
          ? palette.primaryColor
          : p.type == "estándar"
            ? "#D9F6F0"
            : "#1E68BF"};

      color: ${p => (p.type == "estándar" ? "#00C494" : "white")};

      position: absolute;
      top: 20px;
      left: 20px;
      font-weight: 600;
      font-size: 0.8rem;
      padding: 2px 10px;
      border-radius: 5px;
    }
  }

  > div {
    margin-top: 20px;
  }
`
