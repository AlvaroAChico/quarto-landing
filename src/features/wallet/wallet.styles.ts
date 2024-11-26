import styled from "styled-components"

export const ContainerWallet = styled.div`
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  display: flex;
  width: 100%;
  gap: 20px;
`

export const ContainerListInfoStats = styled.div`
  grid-template-columns: repeat(3, 1fr);
  display: grid;
  width: 100%;
  gap: 20px;
`

export const ContainerWinningsStats = styled.div`
  background: white;
  padding: 40px;
  width: 100%;

  > h2 {
    margin-bottom: 30px;
  }
`

export const ContainerMovements = styled.div`
  width: 100%;
`
