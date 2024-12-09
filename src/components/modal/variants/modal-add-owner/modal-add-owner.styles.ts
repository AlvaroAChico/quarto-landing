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
      display: flex;
      flex-direction: row;
      gap: 20px;
      justify-content: center;
      align-items: center;

      > button:nth-child(1) {
        box-shadow: 5px 5px 30px 2px #e0e0e0;
        background: white;
        color: black;
      }
      > button:nth-child(2) {
        box-shadow: 5px 5px 30px 2px #ff8d87;
        background: ${palette.errorColor};
        color: white;

        &:hover {
          background: ${palette.errorColorHover};
        }
      }
    }
  }
`
