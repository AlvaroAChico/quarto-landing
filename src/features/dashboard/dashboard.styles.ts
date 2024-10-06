import styled from "styled-components"
import { breakpoints } from "../../constants/breakpoints"

export const ContainerDashboard = styled.div`
  flex-direction: row;
  padding: 16px;
  display: flex;
  width: 100%;
  gap: 20px;

  ${breakpoints.tabletMediumMax} {
    flex-direction: column;
  }
`

export const ContainerDashboardBody = styled.div`
  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  display: flex;
  height: 60%;
  width: 80%;
`
