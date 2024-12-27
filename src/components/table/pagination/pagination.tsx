import React from "react"
import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline"
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline"
import { ArrowheadLeft } from "@styled-icons/evaicons-solid/ArrowheadLeft"
import { ArrowheadRight } from "@styled-icons/evaicons-solid/ArrowheadRight"
import {
  BtnFirst,
  BtnLast,
  BtnNext,
  BtnPrevious,
  ContainerPaginated,
  CountPagesTotal,
} from "./pagination.styles"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <ContainerPaginated>
      <BtnFirst onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        <ArrowheadLeft />
      </BtnFirst>
      <BtnPrevious
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowIosBackOutline />
      </BtnPrevious>
      <CountPagesTotal>{`Page ${currentPage} de ${totalPages}`}</CountPagesTotal>
      <BtnNext
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowIosForwardOutline />
      </BtnNext>
      <BtnLast
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <ArrowheadRight />
      </BtnLast>
    </ContainerPaginated>
  )
}

export default Pagination
