import styled from "styled-components"
import { palette } from "../../../../config/theme/theme"

export const ContainerModal = styled.div`
  > div {
    &:nth-child(1) {
      margin-bottom: 20px;

      > p span {
        color: ${palette.errorColor};
      }
    }

    &:nth-child(2) {
    }

    &:nth-child(3) {
      justify-content: center;
      align-items: center;
      flex-direction: row;
      margin-top: 20px;
      display: flex;
      gap: 20px;

      > button:nth-child(1) {
        background: #ff8d87;
        color: white;
      }
      > button:nth-child(2) {
        background: ${palette.primaryColor};
        color: white;

        &:hover {
          background: ${palette.successColorHover};
        }
      }
    }
  }
`
