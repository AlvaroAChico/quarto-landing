import styled from "styled-components"
import { CalendarToday } from "@styled-icons/material-outlined/CalendarToday"
import { Search } from "@styled-icons/material-outlined/Search"
import { FilterList } from "@styled-icons/material-outlined/FilterList"
import { ArrowDropDown as ArrowDropDownIcon } from "@styled-icons/material-outlined/ArrowDropDown"
import { Delete as TrashIcon } from "@styled-icons/material-outlined/Delete"
import { GetApp as DownloadIcon } from "@styled-icons/material-outlined/GetApp"
import { palette } from "../../../../../config/theme/theme"
import { ClasicStylesTD } from "../../../../../config/theme/global-styles"

// Contenedor principal
export const ContainerTasks = styled.div`
  width: 100%;
  height: 100%; // Ocupa todo el alto disponible
  display: flex;
  flex-direction: column;
`

// Contenedor del header
export const HeaderTask = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 80px;
`

// Título de la tarea
export const TaskTitle = styled.div`
  font-size: 20px;
  color: #333;
  font-weight: bold;
`

// Botón para nueva tarea
export const NewTaskButton = styled.button`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  svg {
    margin-right: 5px;
  }

  span {
    font-size: 16px;
  }
`

// Contenedor de filtros
export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 400px;
  box-sizing: border-box;
  overflow-y: auto;
`

// Fila de filtros
export const FilterRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;\
`

// Botón de fecha
export const DateButton = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 5px 10px;
  cursor: pointer;
  width: 200px;
  height: 40px;
  font-weight: bold;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  svg {
    margin-right: 5px;
    color: #ff6600; // Color naranja
  }

  span {
    font-size: 16px;
    margin-right: 5px;
  }
`

// Botones de filtro
export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 5px 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  svg {
    margin-right: 5px;
  }

  span {
    font-size: 16px;
    margin-right: 5px;
  }
`
// Contenedor del filtro
export const ContainerFilterTask = styled.div`
  width: 100%;
  height: 500px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: white;
  border-radius: 20px;
`

export const FilterRowLeft = styled.div`
  width: 20%;
`
export const FilterRowRight = styled.div`
  width: 80%;
  justify-content: right;

  gap: 4px;
  display: flex;
`

// Iconos importados y estilizados
export const CalendarIconStyled = styled(CalendarToday)`
  color: #ff6600; // Color naranja para el ícono de calendario
`

export const SearchIconStyled = styled(Search)`
  color: #000; // Color negro para el ícono de búsqueda
`

export const FilterIconStyled = styled(FilterList)`
  color: #000; // Color negro para el ícono de filtro
`

export const ArrowDropDownIconStyled = styled(ArrowDropDownIcon)`
  color: #000; // Color negro para el ícono de flecha hacia abajo
`

export const TrashIconStyled = styled(TrashIcon)`
  color: #ff6600; // Color naranja para el ícono de basura
`

export const DownloadIconStyled = styled(DownloadIcon)`
  color: #888; // Color gris para el ícono de descarga
`

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid transparent;
`

export const TaskContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
`

export const TaskRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background: #fff;

  &:last-child {
    border-bottom: none;
  }
`

export const ContainerStatusTask = styled(ClasicStylesTD)`
  > div {
    align-items: center;
    flex-direction: row;
    display: flex;
    gap: 10px;
  }
`

export const StatusPointTasks = styled.div<{ progress: number }>`
  border-radius: 50%;
  height: 10px;
  width: 10px;
  background: ${p =>
    p.progress < 30
      ? palette.errorColor
      : p.progress > 30 && p.progress < 70
        ? palette.orangeColor
        : palette.successColor};
`

export const ContainerTaskProgress = styled.td<{ progress: number }>`
  width: auto;

  > div {
    background: ${palette.grayLightColor};
    border-radius: 20px;
    position: relative;
    width: 100%;
    height: 5px;

    &:before {
      background: ${p =>
        p.progress < 30
          ? palette.errorColor
          : p.progress > 30 && p.progress < 70
            ? palette.orangeColor
            : palette.successColor};
      border-radius: 20px;
      position: absolute;
      content: "";
      width: ${p => p.progress}%;
      height: 5px;
      top: 0;
      left: 0;
    }
  }
`

export const ContainerFilters = styled.div`
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  padding: 20px 10px 30px;
`
