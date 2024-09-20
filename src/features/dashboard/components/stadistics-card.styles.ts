import styled from "styled-components"

export const ContainerCard = styled.div`
  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
  border-radius: 20px;
  background: white;
  padding: 20px 10px 20px 0;
  min-width: 250px;
  min-height: 150px;
`

export const ContainerHeadTitle = styled.div`
  padding-left: 30px;
  margin-bottom: 20px;

  > h4 {
    font-size: 15px;
    font-weight: 400;

    > span {
      font-size: 35px;
      font-weight: 900;
    }
  }
`

export const ContainerDataStats = styled.div`
  position: relative;
`

export const ContainerChart = styled.div``
