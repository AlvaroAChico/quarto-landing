import styled from "styled-components"
import { Circle } from "@styled-icons/boxicons-solid/Circle"
import { CalendarWeekFill } from "@styled-icons/bootstrap/CalendarWeekFill"
import { KeyboardArrowDown } from "@styled-icons/material-outlined/KeyboardArrowDown"
import { NavLink } from "react-router-dom"

export const CalendarIcon = styled(CalendarWeekFill)`
  width: 100%;
  max-width: 16px;
  margin-right: 8px;
`

export const ArrowDownIcon = styled(KeyboardArrowDown)`
  width: 100%;
  max-width: 16px;
  margin-right: 8px;
`

// Ajusta DataBlock con un ancho del 100% y altura de aproximadamente 120px
export const DataBlock = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin-bottom: 25px;
  @media (max-width: 768px) {
    height: auto; /* Ajusta la altura en pantallas pequeñas */
    flex-direction: column;
  }
`

export const ImageContainer = styled.div`
  width: 80px;
  height: 70px;
  min-width: 80px;
  border-radius: 20px;
  background-color: #e0e0e0; /* Fondo gris claro como placeholder */
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LeftSideDataBlock = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
`

export const RightSideDataBlock = styled.div`
  width: 30%;
  display: flex;
  align-items: left;
  flex-direction: column;
  padding: 30px 40px;
`

export const InfoBlock = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-left: 25px;
`

export const InfoBlockUp = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
`

export const InfoBlockDown = styled.div`
  width: 100%;
  display: flex;
  gap: 2%;
  min-width: 600px;
  max-gap: 25px;
`
export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  color: #7a86a1;
  .calendar-icon,
  .person-icon,
  .arrow-icon {
    margin-right: 5px;
    width: 20px;
    height: 20px;
    color: #333; /* Cambia el color del icono según sea necesario */
  }

  width: 200px;
`
export const ButtonDown = styled.button`
  width: 20px;
  margin-left: 4px;
  border: none;
  cursor: pointer;
  background: transparent;
`

export const ContractorSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  flex-wrap: wrap; /* Asegura que los íconos se ajusten en pantallas pequeñas */
`

export const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-right: -10px;
  border: 3px solid white;
`

export const AddButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  margin-left: 40px;
`

export const Text = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: bold;
  color: #7a86a1;
`

export const ClientNameProject = styled.span`
  margin: 0;
  font-size: 15px;
  font-weight: bold;
  color: #f58732;
  .highlight {
    color: #007bff; /* Cambia el color según sea necesario */
  }
`

export const NameProject = styled.p`
  margin: 0;
  font-size: 30px;
  font-weight: bold;
  .highlight {
    color: #007bff; /* Cambia el color según sea necesario */
  }
`
export const DetailsContainer = styled.div`
  width: 100%;
  display: block;
  height: 100%;
`

export const TaskList = styled.div`
  margin-top: 20px;
  padding-left: 3%;
`

// Estilo para los iconos
export const Icon = styled.div`
  width: 20px;
  height: 20px;
  color: #333; /* Color de los iconos */
  display: flex;
  align-items: center;
  justify-content: center;

  &.calendar-icon {
    /* Estilos específicos para el icono de calendario si es necesario */
  }

  &.person-icon {
    /* Estilos específicos para el icono de persona si es necesario */
  }

  &.arrow-icon {
    /* Estilos específicos para el icono de flecha si es necesario */
  }
`
export const ProjectMenu = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
`
export const MenuItem = styled(NavLink)`
  color: #7a86a1;
  border-radius: 10px;
  padding: 10px 20px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;

  &.active {
    background: #f58732;
    color: white;
  }

  &:hover {
    background: #f58732;
    color: white;
  }
`

export const ContainerOutletProjectDetails = styled.div`
  width: 100%;
  height: 670px;
  display: flex;
  flex-direction: column;

  & > div:nth-child(1) {
    flex: 1;
    border-bottom: 6px solid #eff1f6;
  }

  & > div:nth-child(2) {
    height: 60px;
    flex-shrink: 0;
    border-top: 6px solid #eff1f6;
    background: #fff;
  }
`
