import React from "react"
import HeaderSection from "../../components/header-section/header-section"
import {
  ContainerCalendar,
  ContainerDaysStyles,
  ContainerListData,
  InfoTextStyles,
  ItemDay,
  ItemGeneralInfo,
} from "./calendar.styles"
import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline"
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline"
import useDataUser from "../../utils/use-data-user"
import axios from "axios"
import { settingsApp } from "../../config/environment/settings"
import { InfoCalendarDTO } from "../../core/models/interfaces/calendar-model"
import { toast } from "sonner"
import { compareEqualsDate, formatToDDMMYYYY } from "../../utils/date-util"

const Calendar: React.FC = () => {
  const [isLoadingFilterCalendar, setIsLoadingFilterCalendar] =
    React.useState<boolean>(false)
  const [infoCalendar, setInfoCalendar] = React.useState<InfoCalendarDTO[]>([])
  const [daySelected, setDaySelected] = React.useState(new Date())

  const handleDayClick = (day: any) => {
    setDaySelected(day)
  }

  const handleNextDay = () => {
    const nextDay = new Date(daySelected)
    nextDay.setDate(daySelected.getDate() + 1)
    setDaySelected(nextDay)
  }

  const handlePrevDay = () => {
    const prevDay = new Date(daySelected)
    prevDay.setDate(daySelected.getDate() - 1)
    setDaySelected(prevDay)
  }

  const days = []
  for (let i = -2; i <= 2; i++) {
    const day = new Date(daySelected)
    day.setDate(day.getDate() + i)
    days.push(day)
  }

  const { handleGetToken } = useDataUser()

  const fetchListFilterCalendar = React.useCallback(() => {
    setIsLoadingFilterCalendar(true)
    const storedToken = handleGetToken()
    if (storedToken) {
      axios
        .get(`${settingsApp.api.base}/service/day`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          const listData: InfoCalendarDTO[] = response.data as InfoCalendarDTO[]
          setInfoCalendar(listData)
          setIsLoadingFilterCalendar(false)
        })
        .catch(err => {
          toast.error("Failed to fetch data")
          setIsLoadingFilterCalendar(false)
        })
    }
  }, [handleGetToken])

  React.useEffect(() => {
    fetchListFilterCalendar()
  }, [])

  return (
    <div>
      <HeaderSection title="Calendar" subtitle="Calendar" />
      <ContainerCalendar>
        <ContainerDaysStyles>
          <div>
            <span>
              <ArrowIosBackOutline onClick={handlePrevDay} />
            </span>
          </div>
          {days.map((day, index) => (
            <ItemDay
              isActiveDay={daySelected.toDateString() === day.toDateString()}
              key={index}
              onClick={() => handleDayClick(day)}
            >
              <span>
                {day
                  .toLocaleDateString("en-US", { weekday: "long" })
                  .substring(0, 3)}
              </span>
              <span>{day.getDate()}</span>
            </ItemDay>
          ))}
          <div>
            <span>
              <ArrowIosForwardOutline onClick={handleNextDay} />
            </span>
          </div>
        </ContainerDaysStyles>
        <ContainerListData>
          {(infoCalendar || []).map(info => {
            if (
              compareEqualsDate(
                formatToDDMMYYYY(info.date),
                daySelected.toLocaleDateString(),
              )
            ) {
              return (
                <ItemGeneralInfo service={info.service}>
                  <div>
                    <img src={info.picture} />
                  </div>
                  <InfoTextStyles>
                    <div>
                      <span>{info.residential.name}</span>
                      <span>{info.apartment.name}</span>
                    </div>
                    <div>
                      <span>{info.contractor.name}</span>
                      <span>{info.status}</span>
                    </div>
                  </InfoTextStyles>
                </ItemGeneralInfo>
              )
            }
          })}
        </ContainerListData>
      </ContainerCalendar>
    </div>
  )
}

export default Calendar
