import styled from "styled-components"

export const ContainerResidentialReport = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
`
export const ContainerResidentialReportHeader = styled.div`
  height: 20%;
  width: 100%;
  display: flex;
  flex-direction: arrow;
  padding: 16px 0px;
  gap: 20px;
`
export const CardInfoReport = styled.div`
  height: 100%;
  max-height: 100px;
  max-width: 250px;
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: arrow;
  padding: 40px 30px;
  align-items: center;
  gap: 10px;
  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
  h1 {
    font-size: 36px;
  }
  span {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 500;
  }
`

export const ContainerResidentialReportBody = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 0px;
  border-radius: 20px;
`
export const ContainerTopList = styled.div`
  justify-content: space-between;
  flex-direction: arrow;
  margin-bottom: 30px;
  border-radius: 20px;
  display: flex;
  width: 100%;
`

export const ContainerFilterBody = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  border-radius: 20px;
`
export const ContainerBodyScrool = styled.tbody`
  overflow-y: auto;
  max-height: 500px;
  width: 100%;
  max-width: 1300px;
  height: 100%;
  display: column;
  padding: 5px 0px;
  text-align: center;

  > tr {
    transition: 0.5s;

    td {
      padding: 10px;

      &:nth-child(1) {
        text-align: left;
      }
    }

    &:hover {
      box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
      border-radius: 10px;
    }
  }

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
