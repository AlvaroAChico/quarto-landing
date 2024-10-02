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
import { APP_MENU } from "../../constants/app"
import { pathRoutes } from "../../config/routes/path"
import { useNavigate } from "react-router-dom"

const Assignments: React.FC = () => {
  const { handleGetToken, clearAllDataAPP, handleGetPermissions } =
    useDataUser()
  const navigate = useNavigate()

  React.useEffect(() => {
    // Verify Token
    const storedToken = handleGetToken()
    if (!storedToken) {
      clearAllDataAPP()
      navigate(pathRoutes.SIGN_IN)
    }
    // Verify Permissions
    const data = handleGetPermissions()
    if (
      !!data &&
      !Object.values(APP_MENU).some(permission =>
        data?.assignment.includes(permission),
      )
    ) {
      return
    }
  }, [])
  const [isLoadingAssigmentList, setIsLoadingAssigmentList] =
    React.useState<boolean>(false)
  const [assigmentsList, setAssigmentsList] = React.useState<InfoCalendarDTO[]>(
    [],
  )

  const fetchListAssigments = () => {
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
  }

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
            assigmentsList
              .filter(ass => ass.status.name.toLowerCase() == "pending")
              .map(assig => (
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
