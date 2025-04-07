import styled from "styled-components"

export const ContainerComponentNotBuy = styled.div`
  max-width: 800px;
  width: 100%;
  margin: auto;
  padding: 50px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  > div {
    &:nth-child(1) {
      flex-direction: column;
      display: flex;
      gap: 20px;
    }
  }
`
