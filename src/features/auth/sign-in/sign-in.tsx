import React from "react"
import {
  ContainerInputs,
  ContainerSignIn,
  ContentLeftContainer,
  FormContainer,
  LeftContainer,
  RecoveryNavLink,
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
import Button from "../../../components/button/button"
import { ACTIONS_TITLE_APP, COOKIES_APP } from "../../../constants/app"
import { SignInResponse } from "../../../core/models/interfaces/user-model"
import {
  SignInForm,
  SignInSchema,
} from "../../../core/models/schemas/signin-schema"
import { ErrorMessage, WrapperInput } from "../../../config/theme/global-styles"
import { settingsApp } from "../../../config/environment/settings"
import { useAppDispatch } from "../../../app/hooks"
import { updateActionTitleApp } from "../../../core/store/app-store/appSlice"
import useDataUser from "../../../utils/use-data-user"
import { pathRoutes } from "../../../config/routes/paths"

const SignIn: React.FC = () => {
  const [isSubmitLogin, setIsSubmitLogin] = React.useState<boolean>(false)
  const dispatch = useAppDispatch()
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

  const { clearAllDataAPP } = useDataUser()

  const handleSubmit = (data: any) => {
    setIsSubmitLogin(true)
    axios
      .post(
        `${settingsApp.api.base}/auth/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            ContentType: "application/json",
            Accept: "application/json",
            CacheControl: "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
      )
      .then(response => {
        setIsSubmitLogin(false)
        // Expiración expresada en dias
        clearAllDataAPP()
        // localStorage.setItem(COOKIES_APP.PERMISSIONS_APP, "_@")
        const data: SignInResponse = response.data as SignInResponse
        const expiration = {
          expires: 7,
        }
        Cookies.set(COOKIES_APP.USER_RES, JSON.stringify(data["0"]), expiration)
        Cookies.set(
          COOKIES_APP.TOKEN_APP,
          JSON.stringify(data.token),
          expiration,
        )
        // Cookies.set(
        //   COOKIES_APP.ROLES_APP,
        //   JSON.stringify(data.roles),
        //   expiration,
        // )

        dispatch(updateActionTitleApp(ACTIONS_TITLE_APP.PROPERTIES))
        setTimeout(() => {
          dispatch(updateActionTitleApp(pathRoutes.PROPERTY.label))
          navigate(pathRoutes.PROPERTY.to)
        }, 300)
      })
      .catch(err => {
        setIsSubmitLogin(false)
        toast.error(err.response.data.message)
      })
  }

  return (
    <ContainerSignIn>
      <LeftContainer imgHeader={ImgHeader}>
        <ContentLeftContainer>
          <div>
            <img src={ImgLogo} />
          </div>
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
                register={register("email")}
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
                register={register("password")}
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
          {/* <RecoveryNavLink to={pathRoutes.RECOVERY_PASS.LIST}>
            I forgot my password
          </RecoveryNavLink> */}
        </FormContainer>
      </RightContainer>
    </ContainerSignIn>
  )
}

export default SignIn
