import React from "react"
import {
  ContainerBg,
  ContainerFormSignIn,
  ContainerInputs,
  ContainerLogo,
  ContainerCreateAccount,
  ContainerSignIn,
  FormContainer,
  CreateAccountLink,
  RecoveryNavLink,
  CustomPassWrapperInput,
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
import LogoWhiteIMG from "../../../assets/img/logo_white.svg"

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
      <ContainerBg>
        <FormContainer>
          <ContainerLogo>
            <img src={LogoWhiteIMG} />
          </ContainerLogo>
          <ContainerFormSignIn>
            <h1>Iniciar Sesión</h1>
            <p>Introduce tu correo electrónico y contraseña para continuar</p>
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
              <CustomPassWrapperInput>
                <div>
                  <label className="label" htmlFor="password-signin">
                    Contraseña:
                  </label>
                  <RecoveryNavLink to={pathRoutes.RECOVERY_PASS.to}>
                    ¿Olvidaste tu contraseña?
                  </RecoveryNavLink>
                </div>
                <Input
                  placeholder="Contraseña"
                  icon={Password}
                  type="password"
                  toggleIcon={{ Show: EyeFill, Hide: EyeSlashFill }}
                  register={register("password")}
                />
                {!!(errors.password as any)?.message && (
                  <ErrorMessage>
                    {(errors.password as any)?.message}
                  </ErrorMessage>
                )}
              </CustomPassWrapperInput>
            </ContainerInputs>
            <Button
              onClick={submitWrapper(handleSubmit)}
              text="Iniciar sesión"
              isLoading={isSubmitLogin}
            />
            <ContainerCreateAccount>
              <span>¿Aún no tienes una cuenta?</span>
              <CreateAccountLink to={pathRoutes.RECOVERY_PASS.to}>
                Crear Cuenta
              </CreateAccountLink>
            </ContainerCreateAccount>
          </ContainerFormSignIn>
        </FormContainer>
      </ContainerBg>
    </ContainerSignIn>
  )
}

export default SignIn

// import React from 'react';
// import styled from 'styled-components';
// import Header from './Header';
// import PropertySearch from './PropertySearch';
// import FeatureSection from './FeatureSection';
// import PublishProperty from './PublishProperty';
// import AppDownload from './AppDownload';
// import Footer from './Footer';
// import FAQ from './FAQ';

// const HomeAlquilerWrapper = styled.div`
//   background-color: #fff;
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   overflow: hidden;
//   justify-content: start;
// `;

// const SignIn: React.FC = () => {
//   return (
//     <HomeAlquilerWrapper>
//       <Header />
//       <PropertySearch />
//       <FeatureSection />
//       <PublishProperty />
//       <FAQ />
//       <AppDownload />
//       <Footer />
//     </HomeAlquilerWrapper>
//   );
// };

// export default SignIn;
