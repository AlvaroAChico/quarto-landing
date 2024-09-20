import React from "react"
import { AssigmentDTO } from "../../core/models/interfaces/assigment-model"
import useDataUser from "../../utils/use-data-user"
import axios from "axios"
import { settingsApp } from "../../config/environment/settings"
import { toast } from "sonner"
import HeaderSection from "../../components/header-section/header-section"
import {
  ContainerAssigment,
  ContainerListAssigment,
  SectionRoute,
} from "./assigments.styles"
import ItemAssigment from "./components/item-assigment/item-assigment"
import { InfoCalendarDTO } from "../../core/models/interfaces/calendar-model"

const Assignments: React.FC = () => {
  const [isLoadingAssigmentList, setIsLoadingAssigmentList] =
    React.useState<boolean>(false)
  const [assigmentsList, setAssigmentsList] = React.useState<InfoCalendarDTO[]>(
    [],
  )

  const { handleGetToken } = useDataUser()

  const fetchListAssigments = React.useCallback(() => {
    setIsLoadingAssigmentList(true)
    const storedToken = handleGetToken()
    if (storedToken) {
      axios
        .get(
          `${settingsApp.api.base}/works?include=apartment,residential,contractor,service,status`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        )
        .then(response => {
          const listData: InfoCalendarDTO[] = response.data as InfoCalendarDTO[]
          setAssigmentsList(listData)
          setIsLoadingAssigmentList(false)
        })
        .catch(err => {
          toast.error("Failed to fetch data")
          setIsLoadingAssigmentList(false)
        })
    }
  }, [handleGetToken])

  React.useEffect(() => {
    fetchListAssigments()
  }, [])

  return (
    <SectionRoute>
      <HeaderSection
        title="Assigments"
        subtitle="Assigments"
        onPrimaryClick={() => console.log}
      />
      <ContainerAssigment>
        <ContainerListAssigment>
          {!!assigmentsList &&
            assigmentsList.map(assig => (
              <ItemAssigment
                assigment={assig}
                onRefresh={fetchListAssigments}
              />
            ))}
        </ContainerListAssigment>
      </ContainerAssigment>
    </SectionRoute>
  )
}

export default Assignments
