import styled from "styled-components"
import { palette } from "../../config/theme/theme"
import { StatusCell } from "../../components/table/table.styles"

export const ContainerVisits = styled.div``
export const ContentStylesSection = styled.div``

export const ContainerListVisits = styled.div``

export const ContainerImageVisit = styled.div`
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

export const StatusCellVisits = styled(StatusCell)<{ status: string }>`
  background: ${p =>
    p.status.toLowerCase() == "Realizada".toLowerCase()
      ? "#CCF0D6"
      : p.status.toLowerCase() == "Aceptada".toLowerCase()
        ? "#FFEDDD"
        : p.status.toLowerCase() == "Rechazada".toLowerCase()
          ? "#FDE1DF"
          : "#E8E8E8"};

  color: ${p =>
    p.status.toLowerCase() == "Realizada".toLowerCase()
      ? "#00B634"
      : p.status.toLowerCase() == "Aceptada".toLowerCase()
        ? "#FFA756"
        : p.status.toLowerCase() == "Rechazada".toLowerCase()
          ? "#EF3826"
          : "#6E6E6E"};
`
