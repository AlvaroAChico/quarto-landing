import React from "react"
import {
  ContainerSignIn,
  ContentLeftContainer,
  FormContainer,
  LeftContainer,
  RightContainer,
} from "./sign-in.styles"
import CustomButton from "../../../components/custom-button/custom-button"
import Input from "../../../components/custom-input/custom-input"
import ImgHeader from "../../../assets/img/img_signin.webp"
import ImgLogo from "../../../assets/img/logo.webp"
import { useNavigate } from "react-router-dom"
import { User } from "@styled-icons/boxicons-solid/User"
import { Password } from "@styled-icons/material-twotone/Password"
import { EyeFill, EyeSlashFill } from "@styled-icons/bootstrap"

const SignIn: React.FC = () => {
  const navigate = useNavigate()

  const handleSingIn = () => navigate("/dashboard")

  return (
    <ContainerSignIn>
      <LeftContainer imgHeader={ImgHeader}>
        <ContentLeftContainer>
          <div>
            <img src={ImgLogo} />
          </div>
          {/* <div>Bienvenido</div> */}
          {/* <div>Copyright</div> */}
        </ContentLeftContainer>
      </LeftContainer>
      <RightContainer>
        <FormContainer>
          <h1>Sign In</h1>
          <div>
            <div className="div-with-margin">
              <label className="label" htmlFor="email-signin">
                Your email
              </label>
              <Input placeholder="Your Email" icon={User} />
            </div>
            <div className="div-without-margin">
              <label className="label" htmlFor="password-signin">
                Your password
              </label>
              <Input
                placeholder="Your Password"
                icon={Password}
                type="password"
                toggleIcon={{ Show: EyeFill, Hide: EyeSlashFill }}
              />
            </div>
          </div>
          <CustomButton onClick={handleSingIn}>Sign In</CustomButton>
        </FormContainer>
      </RightContainer>
    </ContainerSignIn>
  )
}

export default SignIn
