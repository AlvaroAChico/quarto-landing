import styled from "styled-components"
import { KeyboardArrowUp } from "@styled-icons/material-twotone/KeyboardArrowUp"
import ApexCharts from "react-apexcharts"

// Contenedor principal
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`

// Contenedor de tarjetas
export const CardsContainer = styled.div`
  display: flex;
  gap: 50px;
`

// Estilo para las tarjetas
export const CardComponent = styled.div`
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  height: 180px;
  max-width: 270px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`

// Título de la tarjeta
export const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #7a86a1;
  font-weight: normal;
`
export const CardSubTitle = styled.h3`
  margin: 0;
  font-size: 25px;
  color: black;
  font-weight: bold;
`
// Contenedor del ícono y texto en la tarjeta
export const CardInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  color: black;
  background: #eff1f6;
  padding: 3px 10px;
  border-radius: 13px;
`

// Estilo para el ícono de flecha
export const ArrowIcon = styled(KeyboardArrowUp)`
  witdh: 100%;
  color: white;
`
export const ArrowContainer = styled.div`
  width: 20px;
  height: 20px;
  background: #f58732;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  margin-right: 6px;
`

// Estilo para el texto dentro de la tarjeta
export const CardText = styled.p`
  margin: 0;
  font-size: 16px;
`

// Estilo para el gráfico circular
export const CircularChartContainer = styled.div`
  width: 160px;
  height: 100px;
  display: flex;
  right: -25px;
  bottom: 10px;
  justify-content: right;
  position: absolute;
`

// Estilo para el porcentaje dentro del gráfico
export const PercentageText = styled.p`
  position: absolute;
  right: 57px;
  bottom: 34px;
  font-size: 20px;
  color: #333;
  z-index: 1;
  font-weight: bold;
`

// Componente ApexCharts estilizado
export const StyledApexCharts = styled(ApexCharts)`
  width: 100%;
`

// Nuevo contenedor para gráfico adicional
export const CardContainerGraphic = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  height: 370px;
`

// Estilo para el gráfico dentro del contenedor gráfico
export const CardGraphic = styled.div`
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  height: 100%; // Asegura que el gráfico se ajuste al contenedor
`

// Título del gráfico
export const GraphicTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  color: #7a86a1;
  font-weight: normal;
`

// Subtítulo del gráfico
export const GraphicSubtitle = styled.p`
  margin: 5px 0 20px;
  font-size: 24px;
  color: #333;
  font-weight: bold;
`
