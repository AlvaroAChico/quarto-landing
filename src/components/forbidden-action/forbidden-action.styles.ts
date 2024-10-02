import styled from "styled-components"
import { palette } from "../../config/theme/theme"

export const ContainerForbiddenAction = styled.div`
  color: ${palette.errorColor};
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  display: flex;
  gap: 20px;
`
export const LogoForbidden = styled.span`
  > svg {
    width: 100%;
    max-width: 140px;
  }
`
export const TextForbidden = styled.span`
  text-align: center;
  max-width: 500px;
  font-size: 20px;
  width: 100%;
`
