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
  FooterCopyright,
} from "./empty-layout.styles"
import ImgLogo from "../../assets/img/logo.webp"
// Icons
import { pathRoutes } from "../../config/routes/paths"
import { COOKIES_APP } from "../../constants/app"
import { MeDTO } from "../../core/models/interfaces/user-model"
import Cookies from "js-cookie"
import useDataUser from "../../utils/use-data-user"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getActionTitleApp } from "../../core/store/app-store/appSlice"
import { authRepository } from "../../api/repositories/auth-repository"
import Header from "./header/header"

const EmptyLayout: React.FC = () => {
  const titleApp = useAppSelector(getActionTitleApp)
  const { handleGetToken } = useDataUser()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = React.useCallback(() => {
    navigate(pathRoutes.SIGN_IN.to)
  }, [])

  const handleToCreate = () =>
    navigate(pathRoutes.PROPERTY.otherPaths.CREATE.to)

  return (
    <ContainerDashboardLayout>
      {/* <Header /> */}
      <ContainerOutlet>
        <Outlet />
      </ContainerOutlet>
      <FooterCopyright>
        <span>
          Copyright © 2024, Quarto. RIF J-504967866, Quarto Latam C.A. Todos
          los derechos reservados.
        </span>
      </FooterCopyright>
    </ContainerDashboardLayout>
  )
}

export default EmptyLayout
