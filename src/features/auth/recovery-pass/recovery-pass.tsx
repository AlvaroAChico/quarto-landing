import React from "react"
import {
  ContainerInputs,
  ContainerSignIn,
  ContentLeftContainer,
  FormContainer,
  LeftContainer,
  RecoveryNavLink,
  RightContainer,
} from "./recovery-pass.styles"
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
import { pathRoutes } from "../../../config/routes/paths"
import Button from "../../../components/button/button"
import { ErrorMessage, WrapperInput } from "../../../config/theme/global-styles"
import { settingsApp } from "../../../config/environment/settings"
import { useAppDispatch } from "../../../app/hooks"
import useDataUser from "../../../utils/use-data-user"
import {
  RecoveryForm,
  RecoverySchema,
} from "../../../core/models/schemas/recovery-schema"
import { MessageResponsedDTO } from "../../../core/models/interfaces/general-model"
import { authRepository } from "../../../api/repositories/auth-repository"
import {
  ContainerBg,
  ContainerFormSignIn,
  ContainerLogo,
  CreateAccountLink,
} from "../sign-in/sign-in.styles"
import BgIMG from "../../../assets/img/bg_geometry.svg"
import LogoWhiteIMG from "../../../assets/img/logo_white.svg"

const RecoveryPass: React.FC = () => {
  const [isSubmitLogin, setIsSubmitLogin] = React.useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const methods = useForm<RecoveryForm>({
    resolver: yupResolver(RecoverySchema),
    defaultValues: {
      email: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
  } = methods

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitLogin(true)
      const response: MessageResponsedDTO =
        (await authRepository.recoveryPassword({
          email: data.email,
        })) as MessageResponsedDTO
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
      <ContainerBg>
        <FormContainer>
          <ContainerLogo>
            <img src={LogoWhiteIMG} />
          </ContainerLogo>
          <ContainerFormSignIn>
            <h2>Recuperar Contraseña</h2>
            <ContainerInputs>
              <WrapperInput>
                <label htmlFor="email-signin">Correo electrónico:</label>
                <Input
                  id="email-signin"
                  placeholder="Correo electrónico"
                  icon={User}
                  register={register("email")}
                />
                {!!(errors.email as any)?.message && (
                  <ErrorMessage>{(errors.email as any)?.message}</ErrorMessage>
                )}
              </WrapperInput>
            </ContainerInputs>
            <Button
              onClick={submitWrapper(handleSubmit)}
              text="Recuperar Contraseña"
              isLoading={isSubmitLogin}
            />
            <CreateAccountLink to={pathRoutes.SIGN_IN.to}>
              Iniciar Sesión
            </CreateAccountLink>
          </ContainerFormSignIn>
        </FormContainer>
      </ContainerBg>
    </ContainerSignIn>
  )
}

export default RecoveryPass
