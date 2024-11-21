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

export const StatusCellVisits = styled(StatusCell)`
  background: ${p =>
    p.status.toLowerCase() == "realizada".toLowerCase()
      ? palette.successColor
      : p.status.toLowerCase() == "aceptada".toLowerCase()
        ? palette.infoColor
        : palette.errorColor};

  color: ${p =>
    p.status.toLowerCase() == "realizada".toLowerCase()
      ? "white"
      : p.status == "aceptada"
        ? palette.infoColorHover
        : palette.errorColorHover};

  text-transform: capitalize;
  border-radius: 6 px;
  place-items: center;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 0.8rem;
  font-weight: 600;
  display: grid;
`
