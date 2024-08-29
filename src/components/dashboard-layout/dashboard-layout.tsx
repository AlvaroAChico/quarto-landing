import React from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import {
  ContainerAvatar,
  ContainerAvatarSide,
  ContainerBreadcrumb,
  ContainerDashboardLayout,
  ContainerDataProfile,
  ContainerLogo,
  ContainerMenu,
  ContainerOptions,
  ContainerOutlet,
  ContainerProfile,
  ContainerSidebar,
  ContainerUser,
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
import { COOKIES_APP } from "../../constants/app"
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

const DashboardLayout: React.FC = () => {
  const [dataPermissions, setDataPermissions] =
    React.useState<FilterPermissionsDTO>()
  const [dataRoles, setDataRoles] = React.useState<string[]>()
  const [dataUser, setDataUser] = React.useState<UserDTO>()
  const navigate = useNavigate()

  const { handleGetToken, clearAllDataAPP } = useDataUser()

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
                role: []
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
    const data = Cookies.get(COOKIES_APP.PERMISSIONS_APP)
    if (!!data) {
      const permissions: FilterPermissionsDTO = JSON.parse(
        data,
      ) as FilterPermissionsDTO
      setDataPermissions(permissions)
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
            {dataPermissions?.user.includes("list") && (
            <ItemNavLink
                to={pathRoutes.USERS.LIST}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <User />
                <p>Users</p>
              </ItemNavLink>
            )}
            <ItemNavLink
              to={pathRoutes.ROLES.LIST}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <LocalPolice />
              <p>Roles</p>
            </ItemNavLink>
            {dataPermissions?.project.includes("list") && (
              <ItemNavLink
                to={pathRoutes.PROJECTS.LIST}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <FolderOpen />
                <p>Projects</p>
              </ItemNavLink>
            )}
            <ItemNavLink
              to={pathRoutes.TASKS.LIST}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <Task />
              <p>Tasks</p>
            </ItemNavLink>
            <ItemNavLink
              to={pathRoutes.CALENDAR.LIST}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <Calendar />
              <p>Calendar</p>
            </ItemNavLink>
            <ItemNavLink
              to={pathRoutes.REPORTS.LIST}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <BarChartFill />
              <p>Reports</p>
            </ItemNavLink>
          </ContainerMenu>
          <ContainerProfile>
            <ContainerAvatarSide>
              <div>
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
              </div>
              <div>
                <p>
                  {dataUser?.firstName} {dataUser?.lastName}
                </p>
                <p>{!!dataRoles ? dataRoles[0] : ""}</p>
              </div>
            </ContainerAvatarSide>
            <ContainerOptions>
              <ExitToApp onClick={handleLogout} />
            </ContainerOptions>
          </ContainerProfile>
        </div>
      </ContainerSidebar>
      <ContainerOutlet>
        <div>
          <ContainerBreadcrumb>Breadcrumb</ContainerBreadcrumb>
          <ContainerDataProfile>
            <div>
              <ContainerUser>
                <h4>Alvaro Chico</h4>
                <span>Admin</span>
              </ContainerUser>
              <ContainerAvatar>
                <div>AC</div>
              </ContainerAvatar>
            </div>
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
