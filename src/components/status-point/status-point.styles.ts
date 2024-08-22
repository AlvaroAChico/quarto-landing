import styled from "styled-components"
import { palette } from "../../config/theme/theme"

export const PointStyles = styled.div<{ isActive: boolean }>`
  background: ${p => (p.isActive ? palette.successColor : palette.errorColor)};
  border-radius: 50%;
  height: 12px;
  width: 12px;
`
