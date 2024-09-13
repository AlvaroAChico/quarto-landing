import styled from "styled-components"

export const ContainerDashboard = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 20px;
`

export const ContainerDashboardHeader = styled.div`
  height: 25%;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 50px;
  box-sizing: border-box;
`

export const ContainerDashboardBody = styled.div`
  height: 60%;
  width: 80%;
  display: flex;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
`
