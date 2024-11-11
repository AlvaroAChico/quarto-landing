import React from "react"
import {
  StyledBodyRow,
  StyledHeaderRow,
  StyledTable,
  StyledTableCell,
  StyledTableRow,
  TableContainer,
} from "./table.styles"

interface TableProps {
  children: React.ReactNode
}

interface THeaderProps {
  children: React.ReactNode
}

interface TBodyProps {
  children: React.ReactNode
}

interface TRowProps {
  sticky?: boolean
  onClick?: () => void
  children: React.ReactNode
}

interface TCellProps {
  children: React.ReactNode
}

const Table: React.FC<TableProps> & {
  Header: typeof TableHeader
  Body: typeof TableBody
  Row: typeof TableRow
  Cell: typeof TableCell
} = ({ children }) => {
  return (
    <TableContainer>
      <StyledTable>{children}</StyledTable>
    </TableContainer>
  )
}

// Definición de los subcomponentes
const TableHeader: React.FC<THeaderProps> = ({ children }) => (
  <StyledHeaderRow>{children}</StyledHeaderRow>
)

const TableBody: React.FC<TBodyProps> = ({ children }) => (
  <StyledBodyRow>{children}</StyledBodyRow>
)

const TableRow: React.FC<TRowProps> = ({ sticky, onClick, children }) => (
  <StyledTableRow onClick={onClick} sticky={sticky}>
    {children}
  </StyledTableRow>
)

const TableCell: React.FC<TCellProps> = ({ children }) => (
  <StyledTableCell>{children}</StyledTableCell>
)

Table.Header = TableHeader
Table.Body = TableBody
Table.Row = TableRow
Table.Cell = TableCell

export default Table
