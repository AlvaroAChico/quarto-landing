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
import { pathRoutes } from "../../config/routes/paths"
import { useNavigate } from "react-router-dom"
import { FilterPermissionsDTO } from "../../core/models/interfaces/user-model"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { NotFoundStyles } from "../../config/theme/global-styles"
import ForbiddenAction from "../../components/forbidden-action/forbidden-action"

const Assignments: React.FC = () => {
  const [dataPermissions, setDataPermissions] =
    React.useState<FilterPermissionsDTO>()
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
    setDataPermissions(data)
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
    const storedToken = handleGetToken()
    const data = handleGetPermissions()
    if (
      storedToken &&
      (!!data?.assignment.includes(APP_MENU.LIST) ||
        !!data?.assignment.includes(APP_MENU.READ_OWN))
    ) {
      setIsLoadingAssigmentList(true)
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
          {isLoadingAssigmentList && <Skeleton count={4} height={80} />}
          {!isLoadingAssigmentList &&
            !!assigmentsList &&
            assigmentsList.filter(
              ass => ass.status.name.toLowerCase() == "pending",
            ).length <= 0 &&
            (dataPermissions?.assignment.includes(APP_MENU.LIST) ||
              dataPermissions?.assignment.includes(APP_MENU.READ_OWN)) && (
              <NotFoundStyles>
                <span>No assigments found</span>
              </NotFoundStyles>
            )}
          {!isLoadingAssigmentList &&
            !!assigmentsList &&
            assigmentsList
              .filter(ass => ass.status.name.toLowerCase() == "pending")
              .map(assig => (
                <ItemAssigment
                  assigment={assig}
                  onRefresh={fetchListAssigments}
                  permissions={dataPermissions || ({} as FilterPermissionsDTO)}
                />
              ))}
          {!dataPermissions?.assignment.includes(APP_MENU.LIST) &&
            !dataPermissions?.assignment.includes(APP_MENU.READ_OWN) && (
              <ForbiddenAction />
            )}
        </ContainerListAssigment>
      </ContainerAssigment>
    </SectionRoute>
  )
}

export default Assignments
