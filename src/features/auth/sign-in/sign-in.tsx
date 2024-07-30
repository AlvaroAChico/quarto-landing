import React from "react"
import {
  ContainerSignIn,
  ContentLeftContainer,
  FormContainer,
  LeftContainer,
  RightContainer,
  SignInButton,
} from "./sign-in.styles"
import ImgHeader from "../../../assets/img/img_signin.webp"
import ImgLogo from "../../../assets/img/logo.webp"
import { useNavigate } from "react-router-dom"

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
            <div>
              <label htmlFor="email-signin">Your email</label>
              <input id="email-signin" type="email" />
            </div>
            <div>
              <label htmlFor="password-signin">Your password</label>
              <input id="password-signin" type="password" />
            </div>
          </div>
          <SignInButton onClick={handleSingIn}>Sign in</SignInButton>
        </FormContainer>
      </RightContainer>
    </ContainerSignIn>
  )
}

export default SignIn
