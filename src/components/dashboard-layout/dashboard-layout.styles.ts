import styled from "styled-components"
import { palette } from "../../config/theme/theme"

export const ContainerDashboardLayout = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
`

export const ContainerSidebar = styled.div`
  background: ${palette.blackColor};
  width: 30%;
  transition: 0.5s;
  max-width: 300px;
  padding: 10px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: ${palette.primaryColor};
    width: 4px;
    height: 100%;
  }
`

export const ContainerOutlet = styled.div`
  width: 100%;

  > div:nth-child(1) {
    background: #cfcfcf;
    height: 60px;
  }

  > div:nth-child(2) {
    background: white;
    width: 100%;
    height: calc(100% - 60px);
    box-sizing: border-box;
    padding: 20px;
    margin: 0;
    overflow-x: hidden;
    overflow-y: scroll;
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
