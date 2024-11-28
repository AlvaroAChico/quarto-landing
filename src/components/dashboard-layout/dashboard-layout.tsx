import React from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
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
  ContainerOutletStyles,
} from "./dashboard-layout.styles"
import ImgLogo from "../../assets/img/logo.webp"
// Icons
import { ExitToApp } from "@styled-icons/material-rounded/ExitToApp"
import { getRoutes, pathRoutes } from "../../config/routes/paths"
import { COOKIES_APP } from "../../constants/app"
import { MeDTO, UserDTO } from "../../core/models/interfaces/user-model"
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
import { Bars } from "@styled-icons/fa-solid/Bars"
import { Close } from "styled-icons/evaicons-solid"
import Button from "../button/button"
import LogoutIMG from "../../assets/img/icons/logout.svg"
import { authRepository } from "../../api/repositories/auth-repository"

const DashboardLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isHiddenMenu, setIsHiddenMenu] = React.useState(true)
  const [dataRoles, setDataRoles] = React.useState<string[]>()
  const [dataUser, setDataUser] = React.useState<UserDTO>()
  const titleApp = useAppSelector(getActionTitleApp)
  const { handleGetToken } = useDataUser()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleMenuLarge = () => {
    setIsHiddenMenu(!isHiddenMenu)
  }

  const refreshDataMe = async () => {
    try {
      const response: MeDTO = (await authRepository.getMe()) as MeDTO
      if (!!response && !!response.id) {
        const expiration = {
          expires: 7,
        }
        const { roles, ...meUser } = response
        Cookies.set(COOKIES_APP.USER_RES, JSON.stringify(meUser), expiration)
        Cookies.set(COOKIES_APP.ROLES_APP, JSON.stringify(roles), expiration)
      }
    } finally {
    }
  }

  React.useEffect(() => {
    refreshDataMe()
    const intervalId = setInterval(refreshDataMe, 60000)
    return () => clearInterval(intervalId)
  }, [])

  const handleLogout = React.useCallback(() => {
    navigate(pathRoutes.SIGN_IN.to)
  }, [])

  const handleClickItemMenu = (itemNav: string) => () => {
    dispatch(updateActionTitleApp(itemNav))
    setIsMenuOpen(false)
  }

  const handleToCreate = () =>
    navigate(pathRoutes.PROPERTY.otherPaths.CREATE.to)

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
                <img src={route.icon} />
                <p>{route.label}</p>
              </ItemNavLink>
            ))}
            <ItemNavLink to="" onClick={handleLogout}>
              <img src={LogoutIMG} />
              <p>Cerrar Sesión</p>
            </ItemNavLink>
          </ContainerMenu>
        </div>
      </ContainerSidebar>
      <ContainerOutlet isOpen={isMenuOpen}>
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
              onClick={handleToCreate}
              text="Subir propiedad"
              isLoading={false}
            />
          </ContainerUploadProperty>
        </div>
        <ContainerOutletStyles isOpen={isMenuOpen}>
          <Outlet />
        </ContainerOutletStyles>
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
                  <img src={LogoutIMG} />
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
