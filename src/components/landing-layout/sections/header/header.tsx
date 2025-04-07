import { FC, useState } from "react"
import {
  ContainerBar,
  ContainerDropdownNavbar,
  HeaderWrapper,
  ItemPublishInmueble,
  LogoWrapper,
  NavigationItem,
  NavigationList,
  RegisterButton,
} from "./header.styles"
import LogoIMG from "../../../../assets/img/logo.png"
import { useNavigate } from "react-router-dom"
import { pathRoutes } from "../../../../config/routes/paths"
import { Bars } from "@styled-icons/fa-solid/Bars"
import SignInIconIMG from "../../../../assets/img/icons/icon_login_navbar.png"
import ForwardIconIMG from "../../../../assets/img/icons/icon_forward_navbar.png"
import { ContainerDropdown } from "../../../../config/theme/global-styles"
import useDataUser from "../../../../utils/use-data-user"

const Header: FC = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<string>("")
  const navigate = useNavigate()

  const { handleGetUser, clearAllDataAPP } = useDataUser()

  const handleToSignIn = () => navigate(pathRoutes.REGISTER.to)

  const toggleDropdown = (dataId: string) => {
    setIsOpenDropdown(dataId)
    setTimeout(() => {
      const dropOv = document.getElementById(`dropdown_ov1`)
      if (!!dropOv) {
        dropOv.focus()
      }
    }, 100)
  }

  const handleCleanDropdown = () => toggleDropdown("")

  const handleLogout = () => clearAllDataAPP()

  return (
    <HeaderWrapper>
      <LogoWrapper to={pathRoutes.HOME.to}>
        <img src={LogoIMG} alt="Logo Quarto" />
      </LogoWrapper>
      <NavigationList>
        <NavigationItem to={pathRoutes.HOME.to}>Inicio</NavigationItem>
        <NavigationItem to="#">Alquiler</NavigationItem>
        <NavigationItem to="#">Venta</NavigationItem>
        <ItemPublishInmueble to={pathRoutes.PROPERTY.otherPaths.CREATE.to}>
          Publica tu inmueble
        </ItemPublishInmueble>
        {/* <ContainerDropdownNavbar
          isDropdownVisible={isOpenDropdown == "dropdown_ov1"}
        >
          <div>
            <div
              onClick={() => toggleDropdown(`dropdown_ov1`)}
              onMouseOver={() => toggleDropdown(`dropdown_ov1`)}
              onMouseLeave={handleCleanDropdown}
            >
              <span>Tu inmueble</span>
              <img src={ForwardIconIMG} />
            </div>
            {isOpenDropdown == `dropdown_ov1` && (
              <ContainerDropdown
                id={`dropdown_ov1`}
                tabIndex={0}
                onMouseOver={() => toggleDropdown(`dropdown_ov1`)}
                onMouseLeave={handleCleanDropdown}
                onBlur={handleCleanDropdown}
              >
                <span onClick={() => console.log}>Publica tu inmueble</span>
                <span onClick={() => console.log}>Calculadora m2</span>
              </ContainerDropdown>
            )}
          </div>
        </ContainerDropdownNavbar> */}
      </NavigationList>
      {(handleGetUser().firstName == "" ||
        handleGetUser().firstName == undefined) && (
        <RegisterButton onClick={handleToSignIn}>
          <img src={SignInIconIMG} />
          Ingresar
        </RegisterButton>
      )}
      {!!handleGetUser().firstName && (
        <ContainerDropdownNavbar
          isDropdownVisible={isOpenDropdown == "dropdown_signin1"}
        >
          <div>
            <RegisterButton
              onClick={() => toggleDropdown(`dropdown_signin1`)}
              onMouseOver={() => toggleDropdown(`dropdown_signin1`)}
              onMouseLeave={handleCleanDropdown}
            >
              <img src={SignInIconIMG} />
              {handleGetUser().firstName}
            </RegisterButton>

            {isOpenDropdown == `dropdown_signin1` && (
              <ContainerDropdown
                id={`dropdown_signin1`}
                tabIndex={0}
                onMouseOver={() => toggleDropdown(`dropdown_signin1`)}
                onMouseLeave={handleCleanDropdown}
                onBlur={handleCleanDropdown}
              >
                <span onClick={handleLogout}>Cerrar sesión</span>
              </ContainerDropdown>
            )}
          </div>
        </ContainerDropdownNavbar>
      )}
      <ContainerBar>
        <Bars />
      </ContainerBar>
    </HeaderWrapper>
  )
}

export default Header
