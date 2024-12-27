import styled from "styled-components"
import { palette } from "../../../config/theme/theme"
import { NavLink } from "react-router-dom"
import { WrapperInput } from "../../../config/theme/global-styles"
import BgIMG from "../../../assets/img/bg_geometry.svg"

export const ContainerSignIn = styled.div`
  height: 100vh;
  width: 100vw;
`
export const ContainerBg = styled.div`
  background-image: url(${BgIMG});
  background-position: center;
  background-repeat: no-repeat;
  justify-content: center;
  background-size: cover;
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
`

export const ContainerLogo = styled.div`
  justify-content: center;
  display: flex;

  > img {
    margin-bottom: 20px;
    max-width: 200px;
    width: 100%;
  }
`

export const FormContainer = styled.div``

export const ContainerFormSignIn = styled.div`
  width: 100%;
  height: 100%;
  min-width: 400px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 60px 40px;
  border-radius: 20px;
  gap: 20px;

  > h1,
  h2 {
    text-align: center;
  }

  > p {
    font-size: 0.8rem;
  }
`

export const ContainerInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const SignInButton = styled.button`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) -40%,
    rgba(249, 174, 54, 1) 0%,
    rgba(245, 134, 52, 1) 100%
  );
  outline: none;
  border: none;
  color: white;
  padding: 10px 30px;
  border-radius: 10px;
  box-shadow: 5px 5px 30px 2px rgba(245, 134, 52, 0.5);
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`

export const ContainerCreateAccount = styled.div`
  font-size: 0.8rem;
  text-align: center;

  > span {
    margin-right: 10px;
  }
`

export const CreateAccountLink = styled(NavLink)`
  font-weight: 800;
  color: #00b69b;
  margin: auto;

  &:hover {
    color: ${palette.primaryColor};
  }
`

export const RecoveryNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 400;
  color: #797a7c;
  margin: 0;

  &:hover {
    color: ${palette.primaryColor};
  }
`

export const CustomPassWrapperInput = styled(WrapperInput)`
  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > label {
      color: black;
      font-weight: 600;
      font-size: 0.9rem;
    }
  }
`
