import React from "react"
import {
  ContainerInputs,
  ContainerSignIn,
  ContentLeftContainer,
  FormContainer,
  LeftContainer,
  RightContainer,
} from "./sign-in.styles"
import Input from "../../../components/input/input"
import ImgHeader from "../../../assets/img/img_signin.webp"
import ImgLogo from "../../../assets/img/logo.webp"
import { useNavigate } from "react-router-dom"
import { User } from "@styled-icons/boxicons-solid/User"
import { Password } from "@styled-icons/material-twotone/Password"
import { EyeFill, EyeSlashFill } from "@styled-icons/bootstrap"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { pathRoutes } from "../../../config/routes/path"
import Button from "../../../components/button/button"
import { COOKIES_APP } from "../../../constants/app"
import { SignInResponse } from "../../../core/models/interfaces/user-model"
import {
  SignInForm,
  SignInSchema,
} from "../../../core/models/schemas/signin-schema"
import { ErrorMessage, WrapperInput } from "../../../config/theme/global-styles"

const SignIn: React.FC = () => {
  const [isSubmitLogin, setIsSubmitLogin] = React.useState<boolean>(false)
  const navigate = useNavigate()

  const methods = useForm<SignInForm>({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
  } = methods

  const handleSubmit = React.useCallback((data: any) => {
    setIsSubmitLogin(true)
    axios
      .post("http://localhost:3000/auth/login", {
        email: data.email,
        password: data.password,
      })
      .then(response => {
        setIsSubmitLogin(false)
        // Expiración expresada en dias
        const data: SignInResponse = response.data as SignInResponse
        Cookies.set(COOKIES_APP.USER_RES, JSON.stringify(data.user), {
          expires: 7,
        })
        Cookies.set(
          COOKIES_APP.TOKEN_APP,
          JSON.stringify(data.token.access_token),
          {
            expires: 7,
          },
        )
        navigate(pathRoutes.DASHBOARD)
      })
      .catch(err => {
        setIsSubmitLogin(false)
        toast.error("Failed to authenticate")
      })
  }, [])

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
          <ContainerInputs>
            <WrapperInput>
              <label htmlFor="email-signin">Your email</label>
              <Input
                id="email-signin"
                placeholder="Your Email"
                icon={User}
                props={register("email")}
              />
              {!!(errors.email as any)?.message && (
                <ErrorMessage>{(errors.email as any)?.message}</ErrorMessage>
              )}
            </WrapperInput>
            <WrapperInput>
              <label className="label" htmlFor="password-signin">
                Your password
              </label>
              <Input
                placeholder="Your Password"
                icon={Password}
                type="password"
                toggleIcon={{ Show: EyeFill, Hide: EyeSlashFill }}
                props={register("password")}
              />
              {!!(errors.password as any)?.message && (
                <ErrorMessage>{(errors.password as any)?.message}</ErrorMessage>
              )}
            </WrapperInput>
          </ContainerInputs>
          <Button
            onClick={submitWrapper(handleSubmit)}
            text="Sign In"
            isLoading={isSubmitLogin}
          />
        </FormContainer>
      </RightContainer>
    </ContainerSignIn>
  )
}

export default SignIn
