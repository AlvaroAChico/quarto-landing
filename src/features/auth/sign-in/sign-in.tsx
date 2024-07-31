import React from "react"
import {
  ContainerSignIn,
  ContentLeftContainer,
  FormContainer,
  LeftContainer,
  RightContainer
} from "./sign-in.styles"
import Button from "../../../components/custom-button/Button"
import Input from "../../../components/custom-input/Input"
import ImgHeader from "../../../assets/img/img_signin.webp"
import ImgLogo from "../../../assets/img/logo.webp"
import { useNavigate } from "react-router-dom"
import { User } from "@styled-icons/boxicons-solid/User"
import { Password } from "@styled-icons/material-twotone/Password"
import { EyeFill, EyeSlashFill } from "@styled-icons/bootstrap"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup'

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const handleSingIn = () => navigate("/dashboard");

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
            <label className="label" htmlFor="email-signin">Your email</label>
              <Input placeholder="Your Email" icon={User}/>
            </div>
            <div>
            <label className="label" htmlFor="password-signin">Your password</label>
              <Input placeholder="Your Password" icon={Password} type="password" toggleIcon={{ Show: EyeFill, Hide: EyeSlashFill }}/>
            </div>
          </div>
          <Button onClick={handleSingIn}>Sign In</Button>
        </FormContainer>
      </RightContainer>
    </ContainerSignIn>
  );
};

export default SignIn;
