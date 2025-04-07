import styled from "styled-components"
import { palette } from "../../config/theme/theme"
import { breakpoints } from "../../constants/breakpoints"

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  > div:nth-child(1) {
    > h2 {
      font-size: 3rem;
      color: ${palette.blackColor};
      font-weight: 800;

      ${breakpoints.tabletMediumMax} {
        font-size: 2.2rem;
      }

      ${breakpoints.tabletSmallMax} {
        font-size: 1.8rem;
      }
    }
    > p {
      font-weight: 800;
      font-size: 18px;
      color: black;
    }
  }

  > div:nth-child(2) {
  }
`
