import React from "react"
import useDataUser from "../../utils/use-data-user"
import axios from "axios"
import { settingsApp } from "../../config/environment/settings"
import { InfoCalendarDTO } from "../../core/models/interfaces/calendar-model"
import { setErrResponse } from "../../utils/erros-util"

const DailyCalendar: React.FC = () => {
  const [infoCalendar, setInfoCalendar] = React.useState<InfoCalendarDTO[]>([])
  const [allDataCalendar, setAllDataCalendar] = React.useState<
    InfoCalendarDTO[]
  >([])

  const { handleGetToken } = useDataUser()

  const getDataCalendar = () => {
    const storedToken = handleGetToken()
    if (storedToken) {
      axios
        .get(
          `${settingsApp.api.base}/works?include=apartment,residential,contractor,service,status`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              ContentType: "application/json",
              Accept: "application/json",
            },
          },
        )
        .then(response => {
          const listData: InfoCalendarDTO[] = response.data as InfoCalendarDTO[]
          setInfoCalendar(listData)
          setAllDataCalendar(listData)
        })
        .catch(err => {
          setErrResponse(err)
        })
    }
  }

  React.useEffect(() => {
    getDataCalendar()
  }, [])

  return (
    <div>
      {infoCalendar.map(cal => (
        <p>
          {cal.service.name} - {cal.apartment.name}
        </p>
      ))}
    </div>
  )
}

export default DailyCalendar
