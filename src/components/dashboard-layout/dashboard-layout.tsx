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
  PermissionDTO,
  UserDTO,
} from "../../core/models/interfaces/user-model"
import Cookies from "js-cookie"
import { toast } from "sonner"
import axios from "axios"
import { settingsApp } from "../../config/environment/settings"

const DashboardLayout: React.FC = () => {
  const [dataPermissions, setDataPermissions] =
    React.useState<FilterPermissionsDTO>()
  const [dataRoles, setDataRoles] = React.useState<string[]>()
  const [dataUser, setDataUser] = React.useState<UserDTO>()
  const navigate = useNavigate()

  const refreshDataMe = async () => {
    const storedToken = Cookies.get(COOKIES_APP.TOKEN_APP)

    if (storedToken) {
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
            const meData: UserDTO[] = response.data as UserDTO[]
            // setListUsers(listData)
            console.log("meData -> ", meData)
          })
          .catch(err => {
            toast.error("Failed to fetch data")
          })
      } catch (err) {
        toast.error("Failed to fetch data")
      }
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
                <div>
                  {!!dataUser?.firstName ? dataUser?.firstName[0] : ""}
                  {!!dataUser?.lastName ? dataUser?.lastName[0] : ""}
                </div>
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
              <ExitToApp />
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
