import styled from "styled-components"
import { breakpoints } from "../../../../constants/breakpoints"

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: fit-content;
  min-width: 400px;
  margin: auto;

  ${breakpoints.tabletMediumMax} {
    min-width: 200px;
  }
`
