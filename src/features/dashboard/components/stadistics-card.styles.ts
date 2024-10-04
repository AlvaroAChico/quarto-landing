import styled from "styled-components"

export const ContainerCard = styled.div`
  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
  border-radius: 20px;
  background: white;
  padding: 40px;
`

export const ContainerHeadTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  > span {
    &:nth-child(1) {
      font-size: 35px;
      font-weight: 900;
    }
    &:nth-child(2) {
      font-size: 18px;
      font-weight: 450;
    }
  }
`
