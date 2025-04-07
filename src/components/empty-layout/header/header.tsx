import { FC } from "react"
import {
  HeaderWrapper,
  LogoWrapper,
  NavigationItem,
  NavigationList,
} from "./header.styles"
import LogoIMG from "../../../assets/img/logo.png"
import ArrowForwardIconIMG from "../../../assets/img/icons/icon_arrow_register.png"
import { pathRoutes } from "../../../config/routes/paths"

const Header: FC = () => {
  return (
    <HeaderWrapper>
      <NavigationList>
        <NavigationItem to={pathRoutes.HOME.to}>
          <div>
            <img src={ArrowForwardIconIMG} />
          </div>
          Regresar
        </NavigationItem>
      </NavigationList>
      <LogoWrapper>{/* <img src={LogoIMG} alt="Logo Quarto" /> */}</LogoWrapper>
    </HeaderWrapper>
  )
}

export default Header
