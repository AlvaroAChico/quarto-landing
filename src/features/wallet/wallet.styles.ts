import styled from "styled-components"
import { StatusCell } from "../../components/table/table.styles"

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

export const StatusCellMovement = styled(StatusCell)<{ status: string }>`
  background: ${p =>
    p.status.toLowerCase() == "Pagado".toLowerCase() ? "#CCF0EB" : "#FFEDDD"};

  color: ${p =>
    p.status.toLowerCase() == "Pagado".toLowerCase() ? "#00B69B" : "#FFA756"};
`
