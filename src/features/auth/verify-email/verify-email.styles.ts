import styled from "styled-components"
import { palette } from "../../../config/theme/theme"

export const ContainerFullVerify = styled.div`
  place-items: center;
  display: grid;
  height: 100%;
  width: 100%;
`

export const ContainerLoaderStyle = styled.div`
  > button {
    border: 2px solid ${palette.primaryColor};
    border-bottom-color: transparent;
  }
`
