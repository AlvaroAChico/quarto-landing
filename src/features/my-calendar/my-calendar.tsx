import React from "react"
import { Calendar, momentLocalizer, Event } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { ContainerCalendar } from "./my-calendar.styles"
import "moment/locale/es"
import Tooltip from "../../components/tooltip/tooltip"

const MyEvent = ({ event }: { event: any }) => {
  const [tooltipVisible, setTooltipVisible] = React.useState(false)
  const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 })

  const handleMouseEnter = (e: React.MouseEvent) => {
    setTooltipVisible(true)
    setTooltipPosition({ x: e.clientX, y: e.clientY })
  }

  const handleMouseLeave = () => {
    setTooltipVisible(false)
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }}
    >
      <strong>{event.title}</strong>
      <br />
      <span>{moment(event.start).format("HH:mm")}</span>
      <br />
      <p>Nota: Ir con zapatillas verdes</p>
      {/* <Tooltip
        visible={tooltipVisible}
        content={`aaaaaaaa`}
        x={tooltipPosition.x}
        y={tooltipPosition.y}
      /> */}
    </div>
  )
}

const MyCalendar: React.FC = () => {
  const localizer = momentLocalizer(moment)
  moment.locale("es")

  const events = [
    {
      title: "Evento de prueba 01",
      start: moment("2024-12-24 14:00").toDate(),
      end: moment("2024-12-24 15:00").toDate(),
    },
    {
      title: "Evento de prueba 02",
      start: moment("2024-12-24 14:00").toDate(),
      end: moment("2024-12-24 15:00").toDate(),
    },
  ]

  return (
    <ContainerCalendar>
      <Calendar
        localizer={localizer}
        events={events}
        components={{
          event: MyEvent,
        }}
        style={{ height: "100%" }}
        messages={{
          allDay: "Todo el día",
          previous: "<",
          next: ">",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Evento",
          noEventsInRange: "No hay eventos en este rango",
        }}
      />
    </ContainerCalendar>
  )
}

export default MyCalendar
