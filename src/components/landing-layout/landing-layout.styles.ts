import styled from "styled-components"
import { palette } from "../../config/theme/theme"
import { NavLink } from "react-router-dom"
import { CircleSmall } from "@styled-icons/fluentui-system-filled/CircleSmall"
import { breakpoints } from "../../constants/breakpoints"

export const CircleSmallIcon = styled(CircleSmall)`
  width: 100%;
  max-width: 20px;
`

export const ContainerDashboardLayout = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  display: grid;
  grid-template-rows: fit-content(100%) 1fr fit-content(100%);
`

export const ContainerSidebar = styled.div<{ open: boolean }>`
  transition: 0.5s;
  max-width: 300px;
  box-sizing: border-box;
  width: ${p => (p.open ? "30%" : "0%")};

  > div {
    background: ${palette.whiteColor};
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${breakpoints.tabletLargeMax} {
      display: none;
    }
  }

  ${breakpoints.tabletLargeMax} {
    width: 0%;
  }
`

export const ContainerOutlet = styled.div<{ isOpen: boolean }>`
  width: 100%;
  padding: 60px 30px;
`

export const ContainerLogo = styled.div`
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  padding: 10px 15px;
  display: flex;
  height: 120px;

  > div img {
    max-width: 200px;
  }
`

export const ContainerMenu = styled.div`
  flex-direction: column;
  padding: 10px 15px;
  min-width: 250px;
  margin: 10px 0;
  overflow: auto;
  display: flex;
  height: 100%;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 0px;
  }

  > a {
    text-decoration: none;
    border-radius: 10px;
    padding: 15px 20px;
    color: #7a86a1;

    > svg {
      width: 100%;
      max-width: 20px;
    }

    &:hover {
      color: ${palette.primaryColor};
    }
  }

  .active {
    background: ${palette.blackColor} !important;
    color: white;

    &:hover {
      color: white;
    }
  }
  .inactive {
    > p {
      color: ${palette.blackColor};
    }
  }
`

export const ItemNavLink = styled(NavLink)`
  flex-direction: row;
  display: flex;
  gap: 10px;

  > span {
    > svg {
      max-width: 20px;
      width: 100%;
    }
  }

  > img {
    max-width: 20px;
    width: 100%;
  }
`

export const ContainerProfile = styled.div`
  border-top: 4px solid #7a86a1;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  display: flex;
  height: 100px;
  color: white;
`

export const ItemMenu = styled.div`
  padding: 10px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;

  &:hover {
    color: ${palette.primaryColor};
  }

  > span {
    svg {
      width: 100%;
      max-width: 20px;
    }
  }
`

export const SubMenu = styled.div<{ open: boolean }>`
  display: ${({ open }: { open: boolean }) => (open ? "block" : "none")};
  gap: 10px;
  flex-direction: column;
`

export const SubMenuItem = styled(NavLink)`
  text-decoration: none;
  padding: 10px;
  color: #7a86a1;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;

  span {
    color: #7a86a1;
  }

  &:hover {
    color: white;
    span {
      color: white;
    }
  }

  &.active {
    background: transparent !important;
    color: white;

    > span {
      color: ${palette.primaryColor};
    }

    > img {
      color: ${palette.primaryColor};
      filter: invert(1);
    }
  }
`

export const ContainerBar = styled.div`
  flex-direction: row;
  justify-content: start;
  align-items: start;
  font-size: 20px;
  display: flex;
  width: 50%;
  gap: 10px;

  ${breakpoints.tabletMediumMax} {
    width: 70%;
  }

  > div {
    &:nth-child(1) {
      height: 100%;
      width: 0px;

      > svg {
        margin-top: 10px;
        cursor: pointer;
        display: none;
        height: 20px;
        width: 20px;

        ${breakpoints.tabletLargeMax} {
          display: block;
        }
      }

      ${breakpoints.tabletLargeMax} {
        display: block;
        width: 50px;
      }
    }
    &:nth-child(2) {
      height: 100%;
      width: 0px;

      > svg {
        margin-top: 10px;
        cursor: pointer;
        display: block;
        height: 20px;
        width: 20px;

        ${breakpoints.tabletLargeMax} {
          display: none;
        }
      }

      ${breakpoints.tabletLargeMax} {
        display: block;
        width: 50px;
      }
    }
  }
`

export const ContainerUploadProperty = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  > div {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  ${breakpoints.tabletMediumMax} {
    width: 30%;
  }
`

export const ContainerUser = styled.div`
  > h2 {
    margin: 0;
    padding: 0;
  }

  > span {
    font-size: 12px;
  }
`

export const ContainerAvatar = styled.div`
  width: 50px;
  height: 50px;
  background: ${palette.blackColor};
  border-radius: 50%;
  display: grid;
  place-content: center;
  color: white;
`

export const ContainerAvatarSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding-right: 10px;

  ${breakpoints.tabletMediumMax} {
    align-items: start;
    margin-top: 5px;
  }
`

export const AvatarStyles = styled.div`
  position: relative;

  > div:nth-child(1) {
    display: grid;
    background: red;
    place-items: center;
    width: 45px;
    height: 45px;
    background: #7a86a1;
    border-radius: 16px;

    > img {
      width: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
  }

  ${breakpoints.tabletLargeMax} {
    display: none;
  }
`

export const DataUserStyles = styled.div<{ isOpen: boolean }>`
  > p:nth-child(1) {
    font-size: 14px;
  }
  > p:nth-child(2) {
    font-size: 11px;
    color: ${palette.primaryColor};
  }
`

export const StatusOnline = styled.div`
  background: ${palette.successColor};
  border: 3px solid white;
  position: absolute;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  right: -5px;
  top: 0;
`

export const ContainerOptions = styled.div`
  > svg {
    color: ${palette.primaryColor};
    max-width: 30px;
    cursor: pointer;
    width: 100%;
  }
`

export const BurguerMenuStyles = styled.div``

export const ContainerFullMenu = styled.div<{ isOpen: boolean }>`
  visibility: ${p => (p.isOpen ? "visible" : "hidden")};
  width: ${p => (p.isOpen ? "80%" : "0%")};
  background: ${palette.whiteColor};
  justify-content: space-between;
  box-sizing: border-box;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  transition: 0.5s;
  transition: 0.4s;
  display: flex;
  height: 100%;
  z-index: 2;
  left: 0;
  top: 0;

  > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  > svg:last-child {
    color: ${palette.blackColor};
    position: absolute;
    cursor: pointer;
    height: 40px;
    right: 20px;
    width: 40px;
    top: 20px;
  }

  ${breakpoints.tabletLargeMax} {
    > div {
      display: ${p => (p.isOpen ? "flex" : "none")};
    }
  }

  ${breakpoints.phoneLargeMax} {
    width: 100%;
  }

  ${breakpoints.laptopMin} {
    visibility: hidden;
    width: 0%;
  }
`

export const ContainerOverlay = styled.div<{ isOpen: boolean }>`
  visibility: ${p => (p.isOpen ? "visible" : "hidden")};
  width: ${p => (p.isOpen ? "100%" : "0%")};
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  flex-direction: column;
  position: absolute;
  transition: 0.6s;
  display: flex;
  height: 100%;
  left: 0;
  top: 0;

  ${breakpoints.laptopMin} {
    visibility: hidden;
    width: 0%;
  }
`

export const ContainerOutletStyles = styled.div<{ isOpen: boolean }>`
  background: ${palette.inputBgColor};
  box-sizing: border-box;
  // overflow: auto;
  padding: 30px;
  width: 100%;
  margin: 0;
`
