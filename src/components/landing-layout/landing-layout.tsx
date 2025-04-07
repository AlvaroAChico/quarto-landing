import React from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import {
  AvatarStyles,
  ContainerAvatar,
  ContainerAvatarSide,
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
} from "./landing-layout.styles"
import ImgLogo from "../../assets/img/logo.webp"
// Icons
import { ExitToApp } from "@styled-icons/material-rounded/ExitToApp"
import { getRoutes, pathRoutes } from "../../config/routes/paths"
import { COOKIES_APP } from "../../constants/app"
import { MeDTO, UserDTO } from "../../core/models/interfaces/user-model"
import axios from "axios"
import { settingsApp } from "../../config/environment/settings"
import useDataUser from "../../utils/use-data-user"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  getActionTitleApp,
  updateActionTitleApp,
} from "../../core/store/app-store/appSlice"
import { Close } from "styled-icons/evaicons-solid"
import Button from "../button/button"
import LogoutIMG from "../../assets/img/icons/logout.svg"
import { authRepository } from "../../api/repositories/auth-repository"
import Header from "./sections/header/header"
import Footer from "./sections/footer/footer"

const LandingLayout: React.FC = () => {
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
      <Header />
      <ContainerOutlet isOpen={isMenuOpen}>
        <Outlet />
      </ContainerOutlet>
      <Footer />
    </ContainerDashboardLayout>
  )
}

export default LandingLayout
