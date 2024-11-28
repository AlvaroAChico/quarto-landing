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
import { authRepository } from "../../../api/repositories/auth-repository"

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

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitLogin(true)
      const response: SignInResponse = (await authRepository.signIn({
        email: data.email,
        password: data.password,
      })) as SignInResponse

      if (!!response) {
        setIsSubmitLogin(false)
        clearAllDataAPP()
        Cookies.set(COOKIES_APP.USER_RES, JSON.stringify(response["0"]), {
          expires: 3,
        })
        Cookies.set(COOKIES_APP.TOKEN_APP, JSON.stringify(response.token), {
          expires: 7,
        })

        setTimeout(() => {
          navigate(pathRoutes.DASHBOARD.to)
        }, 300)
      }
    } finally {
      setIsSubmitLogin(false)
    }
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
