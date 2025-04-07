import styled from "styled-components"
import { breakpoints } from "../../../../constants/breakpoints"
import { NavLink } from "react-router-dom"
import { palette } from "../../../../config/theme/theme"

export const HeaderWrapper = styled.header`
  grid-template-columns: fit-content(100%) 1fr fit-content(100%);
  border-bottom: 1px solid #e1e1e1;
  background-color: #fff;
  display: grid;
  padding: 25px;
  width: 100%;
  max-height: 100px;
  height: 100%;
  position: relative;
  z-index: 1;
  gap: 20px;

  ${breakpoints.tabletLargeMax} {
    grid-template-columns: 1fr fit-content(100%);
  }
`

export const LogoWrapper = styled(NavLink)`
  > img {
    max-width: 150px;
    width: 100%;
  }
`

export const NavigationList = styled.nav`
  justify-content: flex-end;
  align-items: center;
  margin: auto 0;
  display: flex;
  width: 100%;
  gap: 15px;

  @media (max-width: 991px) {
    max-width: 100%;
    white-space: initial;
  }

  ${breakpoints.tabletLargeMax} {
    display: none;
  }
`

export const NavigationItem = styled(NavLink)`
  text-decoration: none;
  padding: 5px 10px;
  font-size: 1rem;
  color: black;

  @media (max-width: 991px) {
    white-space: initial;
  }
`

export const RegisterButton = styled.button`
  background-color: #f6f6f6;
  border: 1px solid #e1e1e1;
  border-radius: 20px;
  align-items: center;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  gap: 5px;

  @media (max-width: 991px) {
    white-space: initial;
    padding: 0 20px;
  }

  ${breakpoints.tabletLargeMax} {
    display: none;
  }
`
export const ContainerBar = styled.div`
  display: none;
  width: 25px;

  ${breakpoints.tabletLargeMax} {
    display: flex;
  }
`

export const ContainerDropdownNavbar = styled.div<{
  isDropdownVisible: boolean
}>`
padding: 0 !important;
place-items: center;
display: grid;
width: 108px;
gap: 10px;

  > div {
    position: relative;
    max-width 20px;
    width 100%;

    > div:nth-child(1) {
      align-items: center;
      width: fit-content;
      min-width: 108px;
      display: flex;
      height: 100%;
      width: 100%;
      gap: 5px;

      > svg {
        color: ${p => (p.isDropdownVisible ? palette.whiteColor : "#242424")};
        background: ${p => (p.isDropdownVisible ? palette.blueColor : "transparent")};
        border-radius: 10px;
        padding: 6px 8px;
        max-width: 36px;
        width: 100%;  
      }

      &:nth-child(1) {
        color: ${palette.grayColor};
        transition: 0.2s;
        cursor: pointer;
      }

      > span {
       font-size: 1rem;
       color: black;
      }
    }
  }
`

export const ItemPublishInmueble = styled(NavLink)`
  background: linear-gradient(90deg, #52e1c3, rgb(41, 188, 156));
  text-decoration: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  color: black;
`
