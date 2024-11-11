import React from "react"
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom"
import {
  AvatarStyles,
  ContainerAvatar,
  ContainerAvatarSide,
  ContainerBar,
  ContainerDashboardLayout,
  ContainerUploadProperty,
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
  SubMenu,
  SubMenuItem,
  CircleSmallIcon,
  ContainerOverlay,
  BurguerMenuStyles,
  ContainerFullMenu,
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
import { getRoutes, pathRoutes } from "../../config/routes/paths"
import { ACTIONS_TITLE_APP, APP_MENU, COOKIES_APP } from "../../constants/app"
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
import {
  createEmptyFilterPermissions,
  saveJsonCookiesWithSplit,
} from "../../utils/cookie-util"
import { Bars } from "@styled-icons/fa-solid/Bars"
import { Close } from "styled-icons/evaicons-solid"
import Button from "../button/button"

const DashboardLayout: React.FC = () => {
  // const [dataPermissions, setDataPermissions] =
  //   React.useState<FilterPermissionsDTO>()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isHiddenMenu, setIsHiddenMenu] = React.useState(true)
  const [dataRoles, setDataRoles] = React.useState<string[]>()
  const [dataUser, setDataUser] = React.useState<UserDTO>()
  const titleApp = useAppSelector(getActionTitleApp)
  const { handleGetToken, clearAllDataAPP, handleGetPermissions } =
    useDataUser()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [isReportsOpen, setIsReportsOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleMenuLarge = () => {
    setIsHiddenMenu(!isHiddenMenu)
  }

  const handleReportsClick = () => {
    setIsReportsOpen(!isReportsOpen)
  }

  const refreshDataMe = async () => {
    const storedToken = handleGetToken()

    if (!!storedToken) {
      try {
        const response = await axios
          .get(`${settingsApp.api.base}/auth/me`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              ContentType: "application/json",
              Accept: "application/json",
            },
          })
          .then(response => {
            const meData: MeDTO = response.data as MeDTO
            if (!!meData && !!meData.id) {
              const expiration = {
                expires: 7,
              }
              const { roles, ...meUser } = meData
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
      navigate(pathRoutes.SIGN_IN.to)
    }
  }

  React.useEffect(() => {
    refreshDataMe()
    const intervalId = setInterval(refreshDataMe, 60000)
    return () => clearInterval(intervalId)
  }, [])

  React.useEffect(() => {
    // getCookiesDataUser()
    // getCookiesDataRole()
    // getCookiesDataPermission()
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
    // const data = handleGetPermissions()
    // if (!!data) {
    //   setDataPermissions(data)
    // }
  }, [])

  const handleLogout = React.useCallback(() => {
    clearAllDataAPP()
    navigate(pathRoutes.SIGN_IN.to)
  }, [])

  const handleClickItemMenu = (itemNav: string) => () => {
    dispatch(updateActionTitleApp(itemNav))
    setIsMenuOpen(false)
  }

  return (
    <ContainerDashboardLayout>
      <ContainerSidebar open={isHiddenMenu}>
        <div>
          <ContainerLogo>
            <div>
              <img src={ImgLogo} />
            </div>
          </ContainerLogo>
          <ContainerMenu>
            {getRoutes().map(route => (
              <ItemNavLink
                to={route.to}
                onClick={handleClickItemMenu(route.label)}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                {<route.icon />}
                <p>{route.label}</p>
              </ItemNavLink>
            ))}
            <ItemNavLink to="" onClick={handleLogout}>
              {<ExitToApp />}
              <p>Cerrar Sesión</p>
            </ItemNavLink>
          </ContainerMenu>
        </div>
      </ContainerSidebar>
      <ContainerOutlet>
        <div>
          <ContainerBar>
            <div onClick={toggleMenu}>
              <Bars />
            </div>
            <div onClick={toggleMenuLarge}>
              <Bars />
            </div>
          </ContainerBar>
          <ContainerUploadProperty>
            <Button
              onClick={() => console.log}
              text="Subir propiedad"
              isLoading={false}
            />
          </ContainerUploadProperty>
        </div>
        <div>
          <Outlet />
        </div>
      </ContainerOutlet>
      <BurguerMenuStyles>
        <ContainerOverlay isOpen={isMenuOpen} />
        <ContainerFullMenu isOpen={isMenuOpen}>
          <div>
            <ContainerLogo>
              <div>
                <img src={ImgLogo} />
              </div>
            </ContainerLogo>
            <ContainerMenu>
              {getRoutes().map(route => (
                <ItemNavLink
                  to={route.to}
                  onClick={handleClickItemMenu(route.label)}
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                >
                  {<route.icon />}
                  <p>{route.label}</p>
                </ItemNavLink>
              ))}
              <ItemNavLink to="" onClick={handleLogout}>
                {<ExitToApp />}
                <p>Cerrar Sesión</p>
              </ItemNavLink>
            </ContainerMenu>
          </div>
          <Close onClick={() => setIsMenuOpen(false)} />
        </ContainerFullMenu>
      </BurguerMenuStyles>
    </ContainerDashboardLayout>
  )
}

export default DashboardLayout
