import styled from "styled-components"
import { palette } from "../../config/theme/theme"

export const TableContainer = styled.div`
  overflow-x: auto;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const StyledTable = styled.table`
  border-collapse: collapse;
  // table-layout: auto;
  border-radius: 15px;
  overflow: hidden;
  width: 100%;
`

export const StyledHeaderRow = styled.thead`
  background-color: #fcfdfd;
  border: 1px solid #d5d5d5;
  font-weight: 800;

  > tr {
    background: ${palette.whiteColor};

    > td {
      &:nth-child(1) {
        border-left: 1px solid #d5d5d5;
        border-radius: 15px 0 0 0;
      }
      &:nth-last-child(1) {
        border-radius: 0 15px 0 0;
      }
    }
  }
`

export const StyledBodyRow = styled.tbody`
  background: ${palette.whiteColor};
  border-radius: 0 0 15px 15px;
  border: 1px solid #d5d5d5;
`

export const StyledTableRow = styled.tr<{ sticky?: boolean }>`
  border: 1px solid #d5d5d5;
  transition: 0.5s;
  cursor: pointer;

  &:hover {
    background-color: #00c49a2b;
  }

  &:nth-last-child(1) {
    border-radius: 0 0 15px 15px;

    > td {
      border-radius: 0 0 15px 15px;
    }
  }

  ${({ sticky }) =>
    sticky &&
    `
    position: sticky;
    bottom: 0;
    z-index: 1;
  `}
`

export const StyledTableCell = styled.td`
  padding: 8px;
  text-align: left;
  padding: 10px 20px;
`

export const StatusCell = styled.div<{ status: string }>`
  text-transform: capitalize;
  border-radius: 6px;
  place-items: center;
  font-size: 0.8rem;
  font-weight: 600;
  display: grid;
  padding: 5px;
`

export const StatusCellReferrals = styled(StatusCell)<{ status: string }>`
  background: ${p =>
    p.status.toLowerCase() == "Aceptada".toLowerCase()
      ? "#CCF0D6"
      : p.status.toLowerCase() == "En proceso".toLowerCase()
        ? "#FFEDDD"
        : "#FDE1DF"};

  color: ${p =>
    p.status.toLowerCase() == "Aceptada".toLowerCase()
      ? "#00B634"
      : p.status.toLowerCase() == "En proceso".toLowerCase()
        ? "#FFA756"
        : "#EF3826"};
`
