import styled from "styled-components"
import { palette } from "../../config/theme/theme"

export const ContainerDashboardLayout = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  background: #f0f2f5;
`

export const ContainerSidebar = styled.div`
  padding: 10px;
  width: 30%;
  transition: 0.5s;
  max-width: 300px;
  box-sizing: border-box;

  > div {
    background: ${palette.blackColor};
    height: 100%;
    padding: 25px 15px;
    border-radius: 15px;
    border-left: 4px ${palette.primaryColor} solid;
  }
`

export const ContainerOutlet = styled.div`
  width: 100%;
  padding: 10px 20px 10px 10px;
  box-sizing: border-box;

  > div:nth-child(1) {
    box-sizing: border-box;
    height: 80px;
    display: flex;
    flex-direction: row;
    jusfity-content: space-between;
    width: 100%;
    padding: 10px;
  }

  > div:nth-child(2) {
    background: white;
    box-shadow:
      rgba(17, 17, 26, 0.1) 0px 4px 16px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px,
      rgba(17, 17, 26, 0.1) 0px 16px 56px;
    border-radius: 20px;
    width: 100%;
    height: calc(100% - 80px);
    box-sizing: border-box;
    padding: 30px;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
`

export const ContainerLogo = styled.div`
  > img {
    max-width: 60px;
  }
`

export const ContainerMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  gap: 10px;
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

export const ContainerBreadcrumb = styled.div`
  width: 50%;
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
