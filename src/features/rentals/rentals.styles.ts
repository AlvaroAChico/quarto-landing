import styled from "styled-components"
import { palette } from "../../config/theme/theme"
import { StatusCell } from "../../components/table/table.styles"

export const ContainerRentals = styled.div``
export const ContentStylesSection = styled.div``

export const ContainerListRentals = styled.div``

export const ContainerImageRental = styled.div`
  border-radius: 10px;
  height: 60px;
  width: 60px;

  > img {
    border-radius: 10px;
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`

export const StatusCellRentals = styled(StatusCell)<{ status: string }>`
  background: ${p =>
    p.status.toLowerCase() == "Pagado".toLowerCase() ? "#CCF0D6" : "#FFEDDD"};

  color: ${p =>
    p.status.toLowerCase() == "Pagado".toLowerCase() ? "#00B634" : "#FFA756"};
`
