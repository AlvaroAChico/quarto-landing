import { FC } from "react"
import {
  HeaderWrapper,
  LogoWrapper,
  NavigationItem,
  NavigationList,
  RegisterButton,
} from "./header.styles"
import LogoIMG from "../../../../assets/img/logo.png"

const Header: FC = () => {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <img src={LogoIMG} alt="Logo Quarto" />
      </LogoWrapper>
      <NavigationList>
        <NavigationItem href="#">Inicio</NavigationItem>
        <NavigationItem href="#">Alquilar</NavigationItem>
        <NavigationItem href="#">Comprar</NavigationItem>
        <NavigationItem href="#">Propietarios/Corredores</NavigationItem>
      </NavigationList>
      <RegisterButton>Regístrate</RegisterButton>
    </HeaderWrapper>
  )
}

export default Header
