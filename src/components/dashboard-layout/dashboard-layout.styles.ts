import styled from "styled-components"
import { palette } from "../../config/theme/theme"
import { NavLink } from "react-router-dom"
import { CircleSmall } from "@styled-icons/fluentui-system-filled/CircleSmall"

export const CircleSmallIcon = styled(CircleSmall)`
  width: 100%;
  max-width: 20px;
`

export const ContainerDashboardLayout = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  position: fixed;
`

export const ContainerSidebar = styled.div`
  width: 30%;
  transition: 0.5s;
  max-width: 300px;
  box-sizing: border-box;

  > div {
    border-right: 6px ${palette.primaryColor} solid;
    background: ${palette.blackColor};
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

export const ContainerOutlet = styled.div`
  box-sizing: border-box;
  width: 100%;

  > div:nth-child(1) {
    jusfity-content: space-between;
    box-sizing: border-box;
    flex-direction: row;
    background: #eff1f6;
    padding: 10px;
    display: flex;
    height: 90px;
    width: 100%;
  }

  > div:nth-child(2) {
    background: white;
    width: 100%;
    height: calc(100% - 90px);
    box-sizing: border-box;
    overflow-y: auto;
    padding: 30px;
    margin: 0;
  }
`

export const ContainerLogo = styled.div`
  justify-content: flex-start;
  border-bottom: 4px solid #7a86a1;
  box-sizing: border-box;
  align-items: center;
  padding: 10px 15px;
  display: flex;
  height: 120px;

  > div img {
    max-width: 50px;
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
      color: white;
    }
  }

  .active {
    background: ${palette.primaryColor} !important;
    color: white;
  }
  .inactive {
    > p {
      color: green;
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
    span {
      color: ${palette.primaryColor};
    }
  }
`

export const ContainerTitleApp = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding-left: 10px;
  font-size: 20px;
  display: flex;
  width: 50%;

  > h2 {
    font-weight: 900;
  }

  > span {
    color: ${palette.grayColor};
    font-size: 14px;
  }
`

export const ContainerDataProfile = styled.div`
  width: 50%;
  text-align: right;
  display: flex;
  justify-content: flex-end;

  > div {
    display: flex;
    flex-direction: row;
    gap: 10px;
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
`

export const DataUserStyles = styled.div`
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
