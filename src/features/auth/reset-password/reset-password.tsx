import React from "react"
import {
  ContainerInputs,
  ContainerSignIn,
  ContentLeftContainer,
  FormContainer,
  LeftContainer,
  RecoveryNavLink,
  RightContainer,
} from "./reset-password.styles"
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
import { pathRoutes } from "../../../config/routes/paths"
import Button from "../../../components/button/button"
import { ErrorMessage, WrapperInput } from "../../../config/theme/global-styles"
import { settingsApp } from "../../../config/environment/settings"
import { useAppDispatch } from "../../../app/hooks"
import useDataUser from "../../../utils/use-data-user"
import {
  ResetPasswordForm,
  ResetPasswordSchema,
} from "../../../core/models/schemas/reset-schema"
import { MessageResponsedDTO } from "../../../core/models/interfaces/general-model"
import { authRepository } from "../../../api/repositories/auth-repository"

const ResetPassword: React.FC = () => {
  const [isSubmitLogin, setIsSubmitLogin] = React.useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const queryParams = window.location.search
  const splitParams = new URLSearchParams(queryParams)

  const methods = useForm<ResetPasswordForm>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: {
      token: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    setValue,
  } = methods

  React.useEffect(() => {
    if (queryParams && splitParams.size > 0) {
      const queryPa = queryParams.split("=")
      if (queryPa[0] == "?token" && !!queryPa[1]) {
        window.history.pushState({}, document.title, "/")
        setValue("token", queryPa[1])
      }
    }
  }, [])

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitLogin(true)
      const response: MessageResponsedDTO = (await authRepository.resetPassword(
        {
          token: data.token,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
        },
      )) as MessageResponsedDTO
      if (!!response) {
        toast.success(response.message)
        navigate(pathRoutes.SIGN_IN.to)
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
          {/* <div>Bienvenido</div> */}
          {/* <div>Copyright</div> */}
        </ContentLeftContainer>
      </LeftContainer>
      <RightContainer>
        <FormContainer>
          <h1>Reset Password</h1>
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
                Your new password
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
            <WrapperInput>
              <label className="label" htmlFor="password-signin">
                Repeat password
              </label>
              <Input
                placeholder="Your Password"
                icon={Password}
                type="password"
                toggleIcon={{ Show: EyeFill, Hide: EyeSlashFill }}
                register={register("password_confirmation")}
              />
              {!!(errors.password_confirmation as any)?.message && (
                <ErrorMessage>
                  {(errors.password_confirmation as any)?.message}
                </ErrorMessage>
              )}
            </WrapperInput>
          </ContainerInputs>
          <Button
            onClick={submitWrapper(handleSubmit)}
            text="Reset password"
            isLoading={isSubmitLogin}
          />
          <RecoveryNavLink to={pathRoutes.SIGN_IN.to}>Sign in</RecoveryNavLink>
        </FormContainer>
      </RightContainer>
    </ContainerSignIn>
  )
}

export default ResetPassword
