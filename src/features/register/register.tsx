import { FC, useEffect, useRef, useState } from "react"
import {
  SignInWithEmail,
  ContainerFullComponent,
  OptionsSignIn,
  SignInWithGoogle,
  ContainerOptionsLike,
  ItemOptionLike,
  ContainerFormRegister,
  ItemFormReg,
  OtherOptions,
  ContainerCheckEmail,
  ContainerFormRegisterIdentity,
  ContainerFullComponentComplete,
  ContainerTwoColumns,
} from "./register.styles"
import KeyIMG from "../../assets/img/big_key_step.png"
import HomeIMG from "../../assets/img/big_venta_step.png"
import PublishIMG from "../../assets/img/big_publish_house.png"
import LogoIMG from "../../assets/img/logo.png"
import {
  ErrorMessage,
  minSelectStyles,
  selectStyles,
  WrapperInput,
} from "../../config/theme/global-styles"
import Input from "../../components/input/input"
import Select from "react-select"
import { Form, useNavigate } from "react-router-dom"
import { pathRoutes } from "../../config/routes/paths"
import GoogleIMG from "../../assets/img/icons/icon_google_register.png"
import EmailIMG from "../../assets/img/icons/icon_email_register.png"
import { COOKIES_APP, EStepRegister } from "../../constants/app"
import {
  RegisterForm,
  RegisterSchema,
} from "../../core/models/schemas/register-schema"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAppDispatch } from "../../app/hooks"
import {
  RegisterResponse,
  SignInResponse,
  UserDTO,
} from "../../core/models/interfaces/user-model"
import { authRepository } from "../../api/repositories/auth-repository"
import { setErrResponse } from "../../utils/erros-util"
import { LoaderStyles } from "../../components/button/button.styles"
import Cookies from "js-cookie"
import useDataUser from "../../utils/use-data-user"
import axios from "axios"
import {
  SignInForm,
  SignInSchema,
} from "../../core/models/schemas/signin-schema"
import {
  HeaderWrapper,
  LogoWrapper,
  NavigationItem,
  NavigationList,
} from "../../components/empty-layout/header/header.styles"
import ArrowForwardIconIMG from "../../assets/img/icons/icon_arrow_register.png"
import CheckEmailIMG from "../../assets/img/check_email_send.png"
import { ItemCheckbox } from "../properties/functionalities/create-property/create-property.styles"
import HousePropertyIMG from "../../assets/img/house_create_property.png"
import { palette } from "../../config/theme/theme"
import {
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material"
import { useLoginEmail, useRegister } from "../../apis/hooks/use-auth"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  AuthResponseDTO,
  LoginDTO,
  PreRegisterDTO,
} from "../../core/models/interfaces/auth-model"

const Register: FC = () => {
  const [isSubmitLogin, setIsSubmitLogin] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [activeCheckMode, setActiveCheckMode] = useState<number>(1)
  const [selectedLike, setSelectedLike] = useState(1)
  const [stepForm, setStepForm] = useState<EStepRegister>(EStepRegister.WELCOME)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // Ref para almacenar el cancel token source
  const cancelTokenSource = useRef(axios.CancelToken.source())

  // Cuando el componente se desmonte, cancelamos cualquier petición pendiente
  useEffect(() => {
    return () => {
      cancelTokenSource.current.cancel(
        "Componente desmontado, petición cancelada.",
      )
    }
  }, [])

  const methods = useForm<RegisterForm>({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
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

  const methodsSignIn = useForm<SignInForm>({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      email: "",
    },
  })

  const {
    handleSubmit: submitWrapperSignIn,
    formState: { errors: errorsSignIn },
    register: registerSignIn,
  } = methodsSignIn

  const handleChangeStep = (idStep: EStepRegister) => () => setStepForm(idStep)

  // Select Option Doc
  const [optionsOptionDoc, setOptionsOptionDoc] = useState<any>([])
  const [seleOpOptionDoc, setSeleOpOptionDoc] = useState(null)
  const handleChangeOptionOptionDoc = (value: any) => {
    setSeleOpOptionDoc(value)
  }

  // Select Option Phone
  const [optionsOptionPhone, setOptionsOptionPhone] = useState<any>([])
  const [seleOpOptionPhone, setSeleOpOptionPhone] = useState(null)
  const handleChangeOptionOptionPhone = (value: any) => {
    setSeleOpOptionPhone(value)
  }
  const handleChangePermissions = () => navigate(pathRoutes.PROPERTY.to)

  const { mutateAsync: registerAsync } = useRegister()

  const { clearAllDataAPP } = useDataUser()

  const handleSubmit = async (data: PreRegisterDTO) => {
    try {
      setIsSubmitLogin(true)
      // MANDAR AQUI CORREO CONSULTANDO A LA API REGISTER
      const response: SignInResponse = await registerAsync({
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      })
      if (response) {
        clearAllDataAPP()
        Cookies.set(COOKIES_APP.TOKEN_APP, response.token, { expires: 7 })
        Cookies.set(COOKIES_APP.USER_RES, JSON.stringify(response["0"]), {
          expires: 3,
        })
        setStepForm(EStepRegister.CHECK_EMAIL_CREATE)
      }
    } catch (error: any) {
      // Se captura y se maneja el error (puedes implementar una función para mostrar mensajes o notificaciones)
      // setErrResponse(error)
      console.warn("ERROR INTERCEPTADO EN EL COMPONENTE")
    } finally {
      setIsSubmitLogin(false)
    }
  }

  const { mutateAsync: loginAsync } = useLoginEmail()

  const handleSubmitSignIn = async (data: LoginDTO) => {
    console.log("DataLogin => ", data)
    try {
      setIsSubmitLogin(true)
      const response: SignInResponse = await loginAsync({
        email: data.email,
      })
      if (response) {
        //   Cookies.set(COOKIES_APP.TOKEN_APP, response.token, { expires: 7 })
        //   clearAllDataAPP()
        //   Cookies.set(COOKIES_APP.USER_RES, JSON.stringify(response["0"]), {
        //     expires: 3,
        //   })
        //   navigate(-1)
        setStepForm(EStepRegister.CHECK_EMAIL_SIGNIN)
      }
    } catch (error: any) {
      // Se captura y se maneja el error (puedes implementar una función para mostrar mensajes o notificaciones)
      // setErrResponse(error)
    } finally {
      setIsSubmitLogin(false)
    }
  }

  const handleToHistoryStep = () => {
    if (stepForm == EStepRegister.REGISTER) {
      setStepForm(EStepRegister.WELCOME)
    }
    if (stepForm == EStepRegister.REGISTER_INFO) {
      setStepForm(EStepRegister.REGISTER)
    }
    if (stepForm == EStepRegister.SIGN_IN) {
      setStepForm(EStepRegister.WELCOME)
    }
    if (stepForm == EStepRegister.SIGN_IN_INFO) {
      setStepForm(EStepRegister.SIGN_IN)
    }
    if (
      stepForm == EStepRegister.WELCOME ||
      stepForm == EStepRegister.REGISTER_COMPLETE ||
      stepForm == EStepRegister.CHECK_EMAIL_SIGNIN ||
      stepForm == EStepRegister.CHECK_EMAIL_CREATE
    ) {
      navigate(-1)
    }
  }

  return (
    <>
      <HeaderWrapper>
        <NavigationList>
          <NavigationItem onClick={handleToHistoryStep}>
            <div>
              <img src={ArrowForwardIconIMG} />
            </div>
            Regresar
          </NavigationItem>
        </NavigationList>
        <LogoWrapper>
          {/* <img src={LogoIMG} alt="Logo Quarto" /> */}
        </LogoWrapper>
      </HeaderWrapper>
      {stepForm == EStepRegister.WELCOME && (
        <ContainerFullComponent>
          <img src={LogoIMG} />
          <h2>Comienza tu nueva vida</h2>
          <p>¡Bienvenido a Quarto!</p>
          <OptionsSignIn>
            <SignInWithEmail onClick={handleChangeStep(EStepRegister.SIGN_IN)}>
              Ya tengo cuenta
            </SignInWithEmail>
            <SignInWithGoogle
              onClick={handleChangeStep(EStepRegister.REGISTER)}
            >
              Crear cuenta
            </SignInWithGoogle>
          </OptionsSignIn>
        </ContainerFullComponent>
      )}
      {stepForm == EStepRegister.SELECT_INTEREST && (
        <ContainerFullComponent>
          <h2>Selecciona tus interéses</h2>
          <div>
            <p>¿Eres agente inmobiliario?</p>
            <ContainerTwoColumns>
              <ItemCheckbox
                active={activeCheckMode == 1}
                onClick={() => setActiveCheckMode(1)}
              >
                <div>
                  <span />
                  No soy agente inmobiliario
                </div>
              </ItemCheckbox>
              <ItemCheckbox
                active={activeCheckMode == 2}
                onClick={() => setActiveCheckMode(2)}
              >
                <div>
                  <span />
                  Soy agente inmobiliario
                </div>
              </ItemCheckbox>
            </ContainerTwoColumns>
          </div>
          <div>
            <p>
              ¿Estás interesado en alquilar, comprar o en publicar un inmueble?
              (Puedes elegir más de una opción)
            </p>
          </div>
          <ContainerOptionsLike>
            <ItemOptionLike
              onClick={() => {
                setValue("password", "alquilar")
                setSelectedLike(1)
              }}
              active={selectedLike == 1}
            >
              <img src={KeyIMG} />
              <h4>Alquilar</h4>
            </ItemOptionLike>
            <ItemOptionLike
              onClick={() => {
                setValue("password", "publicar")
                setSelectedLike(2)
              }}
              active={selectedLike == 2}
            >
              <img src={HomeIMG} />
              <h4>Comprar</h4>
            </ItemOptionLike>
            <ItemOptionLike
              onClick={() => {
                setValue("password", "alquilar")
                setSelectedLike(3)
              }}
              active={selectedLike == 3}
            >
              <img src={PublishIMG} />
              <h4>Publicar un inmueble</h4>
            </ItemOptionLike>
          </ContainerOptionsLike>
          <OptionsSignIn>
            <SignInWithGoogle
              onClick={handleChangeStep(EStepRegister.REGISTER_COMPLETE)}
            >
              Completar registro
            </SignInWithGoogle>
          </OptionsSignIn>
        </ContainerFullComponent>
      )}
      {stepForm == EStepRegister.REGISTER && (
        <ContainerFullComponent>
          <img src={LogoIMG} />
          <h2>Crear cuenta</h2>
          <OptionsSignIn>
            <SignInWithEmail
              onClick={handleChangeStep(EStepRegister.REGISTER_INFO)}
            >
              <img src={EmailIMG} />
              Continuar con Email
            </SignInWithEmail>
            <SignInWithGoogle onClick={handleChangeStep(EStepRegister.NONE)}>
              <img src={GoogleIMG} />
              Continuar con Google
            </SignInWithGoogle>
          </OptionsSignIn>
          <OtherOptions>
            <p>
              ¿Ya tienes cuenta?
              <span onClick={handleChangeStep(EStepRegister.SIGN_IN)}>
                {" "}
                Inicia sesión
              </span>
            </p>
          </OtherOptions>
        </ContainerFullComponent>
      )}
      {stepForm == EStepRegister.SIGN_IN && (
        <ContainerFullComponent>
          <img src={LogoIMG} />
          <h2>Iniciar sesión</h2>
          <p>Bienvenido a Quarto</p>
          <OptionsSignIn>
            <SignInWithEmail
              onClick={handleChangeStep(EStepRegister.SIGN_IN_INFO)}
            >
              Continuar con Email
            </SignInWithEmail>
            <SignInWithGoogle onClick={handleChangeStep(EStepRegister.NONE)}>
              Continuar con Google
            </SignInWithGoogle>
          </OptionsSignIn>
          <OtherOptions>
            <p>
              ¿No tienes cuenta?
              <span onClick={handleChangeStep(EStepRegister.SELECT_INTEREST)}>
                {" "}
                Registrate
              </span>
            </p>
          </OtherOptions>
        </ContainerFullComponent>
      )}
      {stepForm == EStepRegister.SIGN_IN_INFO && (
        <ContainerFullComponent>
          <h2>Iniciar sesión en Quarto</h2>
          <p></p>
          <Form onSubmit={submitWrapperSignIn(handleSubmitSignIn)}>
            <ContainerFormRegister>
              <FormControl fullWidth>
                <FormLabel>Correo electronico</FormLabel>
                <TextField
                  placeholder="correo@quarto.com"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={Boolean(errorsSignIn.email)}
                  helperText={
                    errorsSignIn.email ? errorsSignIn.email.message : ""
                  }
                  {...registerSignIn("email")}
                />
              </FormControl>
            </ContainerFormRegister>
            <OptionsSignIn>
              <SignInWithGoogle
                onClick={submitWrapperSignIn(handleSubmitSignIn)}
                disabled={!methodsSignIn.watch("email")}
              >
                {isSubmitLogin ? <LoaderStyles /> : <>Iniciar sesión</>}
              </SignInWithGoogle>
            </OptionsSignIn>
          </Form>
        </ContainerFullComponent>
      )}
      {stepForm == EStepRegister.REGISTER_INFO && (
        <ContainerFullComponent>
          <h2>Regístrate en Quarto</h2>
          <p></p>
          <Form onSubmit={submitWrapper(handleSubmit)}>
            <FormControl fullWidth>
              <FormLabel>Correo electronico</FormLabel>
              <TextField
                placeholder="correo@quarto.com"
                variant="outlined"
                fullWidth
                margin="normal"
                error={Boolean(errors.email)}
                helperText={errors.email ? errors.email.message : ""}
                {...register("email")}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>Contraseña</FormLabel>
              <TextField
                placeholder="Contraseña"
                variant="outlined"
                fullWidth
                margin="normal"
                type={showPassword ? "text" : "password"}
                error={Boolean(errors.password)}
                helperText={errors.password ? errors.password.message : ""}
                {...register("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(prev => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>Confirmar contraseña</FormLabel>
              <TextField
                placeholder="Confirmar contraseña"
                variant="outlined"
                fullWidth
                margin="normal"
                type={showPassword ? "text" : "password"}
                error={Boolean(errors.password_confirmation)}
                helperText={
                  errors.password_confirmation
                    ? errors.password_confirmation.message
                    : ""
                }
                {...register("password_confirmation")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(prev => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <OptionsSignIn>
              <SignInWithEmail
                onClick={submitWrapper(handleSubmit)}
                type="submit"
                disabled={
                  !methods.watch("email") ||
                  !methods.watch("password") ||
                  !methods.watch("password_confirmation")
                }
              >
                {isSubmitLogin ? <LoaderStyles /> : <>Siguiente</>}
              </SignInWithEmail>
            </OptionsSignIn>
          </Form>
        </ContainerFullComponent>
      )}
      {stepForm == EStepRegister.CHECK_EMAIL_CREATE && (
        <ContainerCheckEmail>
          <img
            src={CheckEmailIMG}
            // onClick={handleChangeStep(EStepRegister.REGISTER_INFO_NEXT)}
          />
          <h2>Revisa tu bandeja de entrada</h2>
          <p>
            Acabamos de enviar un correo electrónico a ejemplo@quartorent.com
            con un enlace para verificar la cuenta.
          </p>
          <OtherOptions>
            <p>
              ¿No has recibido el correo?
              <span onClick={() => console.log("Reenviando correo...")}>
                {" "}
                Reenviar aquí
              </span>
            </p>
          </OtherOptions>
        </ContainerCheckEmail>
      )}
      {stepForm == EStepRegister.CHECK_EMAIL_SIGNIN && (
        <ContainerCheckEmail>
          <img src={CheckEmailIMG} />
          <h2>Revisa tu bandeja de entrada</h2>
          <p>
            Acabamos de enviar un correo electrónico
            a ejemplo@quartorent.com con un enlace único y con límite de tiempo
            que te permite iniciar sesión de forma segura.
          </p>
          <OtherOptions>
            <p>
              ¿No has recibido el correo?
              <span onClick={() => console.log("Reenviando correo...")}>
                {" "}
                Reenviar aquí
              </span>
            </p>
          </OtherOptions>
        </ContainerCheckEmail>
      )}
    </>
  )
}

export default Register
