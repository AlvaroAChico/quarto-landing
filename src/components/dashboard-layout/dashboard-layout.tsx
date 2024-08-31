import React from "react"
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom"
import {
  AvatarStyles,
  ContainerAvatar,
  ContainerAvatarSide,
  ContainerTitleApp,
  ContainerDashboardLayout,
  ContainerDataProfile,
  ContainerLogo,
  ContainerMenu,
  ContainerOptions,
  ContainerOutlet,
  ContainerProfile,
  ContainerSidebar,
  ContainerUser,
  DataUserStyles,
  ItemMenu,
  ItemNavLink,
  StatusOnline,
} from "./dashboard-layout.styles"
import ImgLogo from "../../assets/img/logo.webp"
// Icons
import { User } from "@styled-icons/boxicons-regular/User"
import { LocalPolice } from "@styled-icons/material/LocalPolice"
import { FolderOpen } from "@styled-icons/fa-regular/FolderOpen"
import { Task } from "@styled-icons/boxicons-regular/Task"
import { Calendar } from "@styled-icons/bootstrap/Calendar"
import { BarChartFill } from "@styled-icons/bootstrap/BarChartFill"
import { Dashboard } from "@styled-icons/boxicons-solid/Dashboard"
import { ExitToApp } from "@styled-icons/material-rounded/ExitToApp"
import { pathRoutes } from "../../config/routes/path"
import { ACTIONS_TITLE_APP, COOKIES_APP } from "../../constants/app"
import {
  FilterPermissionsDTO,
  MeDTO,
  PermissionDTO,
  SignInResponse,
  UserDTO,
} from "../../core/models/interfaces/user-model"
import Cookies from "js-cookie"
import { toast } from "sonner"
import axios from "axios"
import { settingsApp } from "../../config/environment/settings"
import useDataUser from "../../utils/use-data-user"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  getActionTitleApp,
  updateActionTitleApp,
} from "../../core/store/app-store/appSlice"

const DashboardLayout: React.FC = () => {
  const [dataPermissions, setDataPermissions] =
    React.useState<FilterPermissionsDTO>()
  const [dataRoles, setDataRoles] = React.useState<string[]>()
  const [dataUser, setDataUser] = React.useState<UserDTO>()
  const titleApp = useAppSelector(getActionTitleApp)
  const { handleGetToken, clearAllDataAPP, handleGetPermissions } =
    useDataUser()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const refreshDataMe = async () => {
    const storedToken = handleGetToken()

    if (!!storedToken) {
      try {
        const response = await axios
          .get(`${settingsApp.api.base}/auth/me`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(storedToken)}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then(response => {
            const meData: MeDTO = response.data as MeDTO
            if (!!meData && !!meData.id) {
              const expiration = {
                expires: 7,
              }
              const { roles, permisos, ...meUser } = meData
              Cookies.set(
                COOKIES_APP.USER_RES,
                JSON.stringify(meUser),
                expiration,
              )
              Cookies.set(
                COOKIES_APP.ROLES_APP,
                JSON.stringify(roles),
                expiration,
              )
              // Filter data permissions
              const result: FilterPermissionsDTO = {
                user: [],
                category: [],
                client: [],
                contractor: [],
                project: [],
                projectfile: [],
                setting: [],
                task: [],
                calendar: [],
                reports: [],
                role: [],
              }

              permisos
                .map(permission => permission.name)
                .forEach(permission => {
                  const parts = permission.split("-")
                  const type = parts[0]

                  if (type in result) {
                    const action = parts.slice(1).join("-")
                    result[type as keyof FilterPermissionsDTO].push(action)
                  }
                })

              if (!!result) {
                Cookies.set(
                  COOKIES_APP.PERMISSIONS_APP,
                  JSON.stringify(result),
                  expiration,
                )
              }
            }
          })
          .catch(err => {
            toast.error("Failed to fetch data")
          })
      } catch (err) {
        toast.error("Failed to fetch data")
      }
    } else {
      clearAllDataAPP()
      navigate(pathRoutes.SIGN_IN)
    }
  }

  React.useEffect(() => {
    refreshDataMe()
    const intervalId = setInterval(refreshDataMe, 60000)
    return () => clearInterval(intervalId)
  }, [])

  React.useEffect(() => {
    getCookiesDataUser()
    getCookiesDataRole()
    getCookiesDataPermission()
  }, [])

  const getCookiesDataUser = React.useCallback(() => {
    const data = Cookies.get(COOKIES_APP.USER_RES)
    if (!!data) {
      const user: UserDTO = JSON.parse(data) as UserDTO
      setDataUser(user)
    }
  }, [])

  const getCookiesDataRole = React.useCallback(() => {
    const data = Cookies.get(COOKIES_APP.ROLES_APP)
    if (!!data) {
      setDataRoles(JSON.parse(data))
    }
  }, [])

  const getCookiesDataPermission = React.useCallback(() => {
    const data = handleGetPermissions()

    if (!!data) {
      setDataPermissions(data)
    }
  }, [])

  const handleLogout = React.useCallback(() => {
    clearAllDataAPP()
    navigate(pathRoutes.SIGN_IN)
  }, [])

  return (
    <ContainerDashboardLayout>
      <ContainerSidebar>
        <div>
          <ContainerLogo>
            <div>
              <img src={ImgLogo} />
            </div>
          </ContainerLogo>
          <ContainerMenu>
            <ItemNavLink
              to={pathRoutes.DASHBOARD}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <Dashboard />
              <p>Dashboard</p>
            </ItemNavLink>
            {!!dataPermissions &&
              !!dataPermissions.user &&
              dataPermissions?.user.includes("list") && (
                <ItemNavLink
                  onClick={() =>
                    dispatch(updateActionTitleApp(ACTIONS_TITLE_APP.USERS))
                  }
                  to={pathRoutes.USERS.LIST}
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                >
                  <User />
                  <p>Users</p>
                </ItemNavLink>
              )}
            {!!dataPermissions &&
              !!dataPermissions.role &&
              dataPermissions?.role.includes("list") && (
                <ItemNavLink
                  onClick={() =>
                    dispatch(updateActionTitleApp(ACTIONS_TITLE_APP.ROLES))
                  }
                  to={pathRoutes.ROLES.LIST}
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                >
                  <LocalPolice />
                  <p>Roles</p>
                </ItemNavLink>
              )}
            {!!dataPermissions &&
              !!dataPermissions.project &&
              dataPermissions?.project.includes("list") && (
                <ItemNavLink
                  onClick={() =>
                    dispatch(updateActionTitleApp(ACTIONS_TITLE_APP.PROJECTS))
                  }
                  to={pathRoutes.PROJECTS.LIST}
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                >
                  <FolderOpen />
                  <p>Projects</p>
                </ItemNavLink>
              )}
            {!!dataPermissions &&
              !!dataPermissions.task &&
              dataPermissions?.task.includes("list") && (
                <ItemNavLink
                  onClick={() =>
                    dispatch(updateActionTitleApp(ACTIONS_TITLE_APP.TASKS))
                  }
                  to={pathRoutes.TASKS.LIST}
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                >
                  <Task />
                  <p>Tasks</p>
                </ItemNavLink>
              )}
            {!!dataPermissions &&
              !!dataPermissions.calendar &&
              dataPermissions?.calendar.includes("list") && (
                <ItemNavLink
                  onClick={() =>
                    dispatch(updateActionTitleApp(ACTIONS_TITLE_APP.CALENDAR))
                  }
                  to={pathRoutes.CALENDAR.LIST}
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                >
                  <Calendar />
                  <p>Calendar</p>
                </ItemNavLink>
              )}
            {!!dataPermissions &&
              !!dataPermissions.reports &&
              dataPermissions?.reports.includes("list") && (
                <ItemNavLink
                  onClick={() =>
                    dispatch(updateActionTitleApp(ACTIONS_TITLE_APP.REPORTS))
                  }
                  to={pathRoutes.REPORTS.LIST}
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                >
                  <BarChartFill />
                  <p>Reports</p>
                </ItemNavLink>
              )}
          </ContainerMenu>
          <ContainerProfile>
            <ContainerAvatarSide>
              <AvatarStyles>
                {!!dataUser && !!dataUser?.picture ? (
                  <div>
                    <img src={dataUser?.picture} />
                  </div>
                ) : (
                  <div>
                    {!!dataUser?.firstName ? dataUser?.firstName[0] : ""}
                    {!!dataUser?.lastName ? dataUser?.lastName[0] : ""}
                  </div>
                )}
                <StatusOnline />
              </AvatarStyles>
              <DataUserStyles>
                <p>
                  {dataUser?.firstName} {dataUser?.lastName}
                </p>
                <p>{!!dataRoles ? dataRoles[0] : ""}</p>
              </DataUserStyles>
            </ContainerAvatarSide>
            <ContainerOptions>
              <ExitToApp onClick={handleLogout} />
            </ContainerOptions>
          </ContainerProfile>
        </div>
      </ContainerSidebar>
      <ContainerOutlet>
        <div>
          <ContainerTitleApp>
            <h2>{titleApp}</h2>
            <span>
              Hello {(!!dataUser && dataUser?.firstName) || ""}, welcome back
            </span>
          </ContainerTitleApp>
          <ContainerDataProfile>
            <ContainerAvatarSide>
              <DataUserStyles>
                <p>
                  {dataUser?.firstName} {dataUser?.lastName}
                </p>
                <p>{!!dataRoles ? dataRoles[0] : ""}</p>
              </DataUserStyles>
              <AvatarStyles>
                {!!dataUser && !!dataUser?.picture ? (
                  <div>
                    <img src={dataUser?.picture} />
                  </div>
                ) : (
                  <div>
                    {!!dataUser?.firstName ? dataUser?.firstName[0] : ""}
                    {!!dataUser?.lastName ? dataUser?.lastName[0] : ""}
                  </div>
                )}
                <StatusOnline />
              </AvatarStyles>
            </ContainerAvatarSide>
          </ContainerDataProfile>
        </div>
        <div>
          <Outlet />
        </div>
      </ContainerOutlet>
    </ContainerDashboardLayout>
  )
}

export default DashboardLayout
