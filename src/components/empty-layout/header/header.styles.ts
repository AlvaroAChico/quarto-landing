import { NavLink } from "react-router-dom"
import styled from "styled-components"

export const HeaderWrapper = styled.header`
  grid-template-columns: 1fr fit-content(100%);
  border-bottom: 1px solid #e1e1e1;
  background-color: #fff;
  display: grid;
  padding: 30px;
  width: 100%;
  height: 100px;
`

export const LogoWrapper = styled.div`
  > img {
    max-width: 150px;
    width: 100%;
  }
`

export const NavigationList = styled.nav`
  align-self: stretch;
  z-index: 0;
  display: flex;
  min-width: 240px;
  align-items: center;
  gap: 16px;
  white-space: nowrap;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex: 1;
  flex-basis: 48px;
  margin: auto 0;

  @media (max-width: 991px) {
    max-width: 100%;
    white-space: initial;
  }
`

export const NavigationItem = styled.div`
  text-decoration: none;
  align-items: center;
  flex-direction: row;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  color: black;
  gap: 10px;

  > div {
    background: #f6f6f6;
    place-items: center;
    border-radius: 50%;
    display: grid;
    padding: 10px;
    height: 40px;
    width: 40px;

    > img {
      max-width: 12px;
      width: 100%;
    }
  }
`

export const RegisterButton = styled.button`
  align-self: stretch;
  border-radius: 9999px;
  background-color: #f6f6f6;
  gap: 8px;
  overflow: hidden;
  font-weight: 500;
  white-space: nowrap;
  margin: auto 0;
  padding: 12px 24px;
  border: 1px solid #e1e1e1;
  cursor: pointer;

  @media (max-width: 991px) {
    white-space: initial;
    padding: 0 20px;
  }
`
