import styled from "styled-components"
import { palette } from "../../config/theme/theme"

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  > div:nth-child(1) {
    > h2 {
      font-size: 45px;
      color: ${palette.primaryColor};
      font-weight: 800;
    }
    > p {
      font-size: 18px;
      color: black;
      font-weight: 800;
    }
  }

  > div:nth-child(2) {
  }
`
