import styled from "styled-components"

export const ContainerResidentialReport = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 20px;
`
export const ContainerResidentialReportHeader = styled.div`
  height: 25%;
  width: 100%;
  display: flex;
  flex-direction: arrow;
  padding: 16px;
  gap: 20px;
`
export const CardInfoReport = styled.div`
  height: 100%;
  max-height: 150px;
  max-width: 250px;
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: arrow;

  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
`

export const ContainerResidentialReportBody = styled.div`
  height: 75%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 20px;
`
export const ContainerTopList = styled.div`
  height: 15%;
  width: 100%;
  display: flex;
  flex-direction: arrow;
  justify-content: space-between;
  border-radius: 20px;
`

export const ContainerFilterBody = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  border-radius: 20px;
`
export const ContainerBodyScrool = styled.div`
  overflow-y: auto;
  max-height: 400px;
  width: 100%;
  max-width: 1300px;
  height: 100%;
  display: column;
  padding: 5px 0px;
   div {
    width: 100%;
    display: flex;
    flex-direction: arrow;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    &:hover {
      box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
      border-radius: 10px;
    }
  }
  span {
    width: 300px;
  }
`
