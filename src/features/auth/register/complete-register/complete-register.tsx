import { FC, useEffect, useState } from "react"
import { COOKIES_APP, EStepRegister } from "../../../../constants/app"
import { useAppDispatch } from "../../../../app/hooks"
import { useNavigate, useParams } from "react-router-dom"
import useDataUser from "../../../../utils/use-data-user"
import { useVerifyLoginEmail } from "../../../../apis/hooks/use-auth"
import {
  RegisterForm,
  RegisterSchema,
  RegisterStep01Form,
  RegisterStep01Schema,
  RegisterStep02Form,
  RegisterStep02Schema,
} from "../../../../core/models/schemas/register-schema"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { pathRoutes } from "../../../../config/routes/paths"
import {
  RegisterDTO,
  Step01RegisterDTO,
  Step02RegisterDTO,
} from "../../../../core/models/interfaces/auth-model"
import {
  HeaderWrapper,
  LogoWrapper,
  NavigationItem,
  NavigationList,
} from "../../../../components/empty-layout/header/header.styles"
import ArrowForwardIconIMG from "../../../../assets/img/icons/icon_arrow_register.png"
import KeyIMG from "../../../../assets/img/big_key_step.png"
import HomeIMG from "../../../../assets/img/big_venta_step.png"
import PublishIMG from "../../../../assets/img/big_publish_house.png"
import HousePropertyIMG from "../../../../assets/img/house_create_property.png"
import LogoIMG from "../../../../assets/img/logo.png"
import {
  ContainerFormRegister,
  ContainerFormRegisterIdentity,
  ContainerFullComponent,
  ContainerFullComponentComplete,
  ContainerOptionsLike,
  ContainerTwoColumns,
  ItemFormReg,
  ItemOptionLike,
  OptionsSignIn,
  SignInWithEmail,
  SignInWithGoogle,
} from "../../../register/register.styles"
import {
  MenuItem,
  FormControl,
  FormLabel,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material"
import { ItemCheckbox } from "../../../properties/functionalities/create-property/create-property.styles"
// import Select from "react-select"
import { minSelectStyles } from "../../../../config/theme/global-styles"
import Input from "../../../../components/input/input"
import {
  ContainerFullHeightComponent,
  ItemFormMaterial,
} from "./complete-register.styles"
import { LoaderStyles } from "../../../../components/button/button.styles"
import {
  useCompleteRegister,
  useUpdateUser,
} from "../../../../apis/hooks/use-user"
import { SignInResponse } from "../../../../core/models/interfaces/user-model"
import Cookies from "js-cookie"

const CompleteRegister: FC = () => {
  const [isSubmitLogin, setIsSubmitLogin] = useState<boolean>(false)
  const [activeCheckMode, setActiveCheckMode] = useState<number>(1)
  const [tokenRegister, setTokenRegister] = useState<string>("")
  const [selectedLike, setSelectedLike] = useState<number[]>([1])
  const [stepForm, setStepForm] = useState<EStepRegister>(
    EStepRegister.REGISTER_INFO_NEXT,
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const { clearAllDataAPP } = useDataUser()
  const { mutateAsync: verifyLoginAsync } = useVerifyLoginEmail()

  const saveLocalToken = async () => {
    try {
      setIsSubmitLogin(true)
      //   const response: SignInResponse = await verifyLoginAsync({
      //     token: `${id}`,
      //   })
      //   if (response) {
      //     Cookies.set(COOKIES_APP.TOKEN_APP, response.token, { expires: 7 })
      //     clearAllDataAPP()
      //     Cookies.set(COOKIES_APP.USER_RES, JSON.stringify(response["0"]), {
      //       expires: 3,
      //     })
      // navigate(pathRoutes.HOME.to)
      //   }
      //   setStepForm(EStepRegister.CHECK_EMAIL_SIGNIN)
    } catch (error: any) {
      // Se captura y se maneja el error (puedes implementar una función para mostrar mensajes o notificaciones)
      //   setErrResponse(error)
    } finally {
      //   navigate(pathRoutes.HOME.to)
      setIsSubmitLogin(false)
    }
  }

  useEffect(() => {
    const cleanUrl = () => {
      const currentPath = window.location.pathname.split("/")[1]
      // console.log("ID from useParams:", id)
      setValueStep02("token", id ?? "")
      window.history.replaceState(null, "", `/${currentPath}`)
    }

    saveLocalToken()
    cleanUrl()
  }, [])

  const [opDocumentType, setOpDocumentType] = useState("")
  const [opPhoneCode, setOpPhoneCode] = useState("")

  const handleChangeDocumentType = (event: SelectChangeEvent) => {
    setValueStep01("document_type", event.target.value as string)
    setOpDocumentType(event.target.value as string)
  }

  const handleChangePhoneCode = (event: SelectChangeEvent) => {
    setValueStep01("code_phone", event.target.value as string)
    setOpPhoneCode(event.target.value as string)
  }

  //   return (
  //     <ContainerCompleteRegister>
  //       <LoaderStyles />
  //     </ContainerCompleteRegister>
  //   )

  const methodsStep01 = useForm<RegisterStep01Form>({
    resolver: yupResolver(RegisterStep01Schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      document_type: "",
      document_number: "",
      code_phone: "",
      // phone: 0,
    },
  })

  const {
    handleSubmit: submitWrapperStep01,
    formState: { errors: errorsStep01 },
    register,
    setValue: setValueStep01,
  } = methodsStep01

  const methodsStep02 = useForm<RegisterStep02Form>({
    resolver: yupResolver(RegisterStep02Schema),
    defaultValues: {
      realtor: 0,
      interest: ["Alquilar"],
      token: "",
    },
  })

  const {
    handleSubmit: submitWrapperStep02,
    formState: { errors: errorsStep02 },
    setValue: setValueStep02,
  } = methodsStep02

  const [formSteps, setFormSteps] = useState({})

  const handleSubmitStep01 = async (data: Step01RegisterDTO) => {
    console.log("formSteps => ", data)
    setFormSteps({ ...formSteps, ...data })
    setStepForm(EStepRegister.SELECT_INTEREST)
  }

  const { mutateAsync: completeRegisterAsync } = useCompleteRegister()

  const handleSubmitStep02 = async (data: Step02RegisterDTO) => {
    try {
      setIsSubmitLogin(true)
      const finalData = { ...formSteps, ...data }
      console.log("FinalData => ", finalData)
      // MANDAR AQUI CORREO CONSULTANDO A LA API REGISTER
      const response: SignInResponse = await completeRegisterAsync({
        id: `${10}`,
        updateData: finalData,
      })
      clearAllDataAPP()
      Cookies.set(COOKIES_APP.TOKEN_APP, response.token, { expires: 7 })
      Cookies.set(COOKIES_APP.USER_RES, JSON.stringify(response["0"]), {
        expires: 3,
      })
      setStepForm(EStepRegister.REGISTER_COMPLETE)
    } catch (error: any) {
      // Se captura y se maneja el error (puedes implementar una función para mostrar mensajes o notificaciones)
      // setErrResponse(error)
    } finally {
      setIsSubmitLogin(false)
    }
  }

  useEffect(() => {
    const interestMapping: Record<number, string> = {
      1: "alquilar",
      2: "comprar",
      3: "publicar",
    }
    setValueStep02(
      "interest",
      selectedLike.filter(Boolean).map(item => interestMapping[item]),
    )
  }, [selectedLike])

  const handleToHistoryStep = () => {
    if (stepForm == EStepRegister.REGISTER_INFO_NEXT) {
      navigate(pathRoutes.HOME.to)
    }
    if (stepForm == EStepRegister.SELECT_INTEREST) {
      setStepForm(EStepRegister.REGISTER_INFO_NEXT)
    }
    if (
      stepForm == EStepRegister.REGISTER_COMPLETE ||
      stepForm == EStepRegister.CHECK_EMAIL_CREATE
    ) {
      navigate(pathRoutes.HOME.to)
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
          <img src={LogoIMG} alt="Logo Quarto" />
        </LogoWrapper>
      </HeaderWrapper>
      <ContainerFullHeightComponent>
        {stepForm == EStepRegister.REGISTER_INFO_NEXT && (
          <ContainerFullComponent>
            <h2>Información de contacto</h2>
            <p>
              Verifica que la información sea correcto, ya que nos comunicaremos
              por esta vía.
            </p>
            <FormControl
              component="form"
              onSubmit={submitWrapperStep01(handleSubmitStep01)}
            >
              <ContainerFormRegister>
                <ContainerTwoColumns>
                  <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <TextField
                      id="name-register"
                      placeholder="Nombre"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={Boolean(errorsStep01.first_name)}
                      helperText={
                        errorsStep01.first_name
                          ? errorsStep01.first_name.message
                          : ""
                      }
                      {...register("first_name")}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Apelllido</FormLabel>
                    <TextField
                      id="lastname-register"
                      placeholder="Apellido"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={Boolean(errorsStep01.last_name)}
                      helperText={
                        errorsStep01.last_name
                          ? errorsStep01.last_name.message
                          : ""
                      }
                      {...register("last_name")}
                    />
                  </FormControl>
                </ContainerTwoColumns>
                <ContainerFormRegisterIdentity>
                  <ItemFormReg>
                    <label>Documento de identidad</label>
                    {/* http://localhost:5173/register/verify/01399d9c-21bf-4472-a778-c0f13ff52c5a */}
                    <ItemFormMaterial>
                      {/* <Select
                    id="duration-create-project"
                    defaultValue={seleOpOptionDoc}
                    onChange={handleChangeOptionOptionDoc}
                    options={optionsOptionDoc}
                    isSearchable={true}
                    styles={minSelectStyles}
                    placeholder="V"
                  /> */}
                      <Select
                        id="documenttype-register"
                        value={opDocumentType}
                        onChange={handleChangeDocumentType}
                        style={{ height: 55, width: 100 }}
                      >
                        <MenuItem value={1}>V</MenuItem>
                        <MenuItem value={2}>P</MenuItem>
                      </Select>
                      {/* <Input
                    id="address-create-project"
                    placeholder="Enter address"
                    register={register("document_number")}
                  /> */}
                      <TextField
                        id="documentnumber-register"
                        placeholder="Numero de documento"
                        variant="outlined"
                        fullWidth
                        type="number"
                        margin="normal"
                        error={Boolean(errorsStep01.document_number)}
                        helperText={
                          errorsStep01.document_number
                            ? errorsStep01.document_number.message
                            : ""
                        }
                        {...register("document_number")}
                        style={{ margin: 0 }}
                      />
                    </ItemFormMaterial>
                  </ItemFormReg>
                  <ItemFormReg>
                    <label>Número de teléfono</label>
                    <div>
                      {/* <Select
                    id="duration-create-project"
                    defaultValue={seleOpOptionDoc}
                    onChange={handleChangeOptionOptionDoc}
                    options={optionsOptionDoc}
                    isSearchable={true}
                    styles={minSelectStyles}
                    placeholder="+56"
                  /> */}
                      <Select
                        id="phonecode-register"
                        value={opPhoneCode}
                        onChange={handleChangePhoneCode}
                        style={{ height: 55, width: 100 }}
                      >
                        <MenuItem value={1}>+58</MenuItem>
                      </Select>
                      {/* <Input
                    id="address-create-project"
                    placeholder="Enter address"
                    register={register("phone")}
                    /> */}
                      <TextField
                        placeholder="Numero de telefono"
                        variant="outlined"
                        fullWidth
                        type="number"
                        margin="normal"
                        error={Boolean(errorsStep01.phone)}
                        helperText={
                          errorsStep01.phone ? errorsStep01.phone.message : ""
                        }
                        {...register("phone")}
                        style={{ margin: 0 }}
                      />
                    </div>
                  </ItemFormReg>
                </ContainerFormRegisterIdentity>
                <OptionsSignIn>
                  <SignInWithEmail
                    onClick={submitWrapperStep01(handleSubmitStep01)}
                    disabled={
                      !methodsStep01.formState.isValid ||
                      !methodsStep01.getValues("first_name") ||
                      !methodsStep01.getValues("last_name") ||
                      !methodsStep01.getValues("document_type") ||
                      !methodsStep01.getValues("document_number") ||
                      !methodsStep01.getValues("code_phone") ||
                      !methodsStep01.getValues("phone")
                    }
                  >
                    {isSubmitLogin ? <LoaderStyles /> : <>Siguiente</>}
                  </SignInWithEmail>
                </OptionsSignIn>
              </ContainerFormRegister>
            </FormControl>
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
                  onClick={() => {
                    setValueStep02("realtor", 0)
                    setActiveCheckMode(1)
                  }}
                >
                  <div>
                    <span />
                    No soy agente inmobiliario
                  </div>
                </ItemCheckbox>
                <ItemCheckbox
                  active={activeCheckMode == 2}
                  onClick={() => {
                    setValueStep02("realtor", 1)
                    setActiveCheckMode(2)
                  }}
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
                ¿Estás interesado en alquilar, comprar o en publicar un
                inmueble? (Puedes elegir más de una opción)
              </p>
            </div>
            <ContainerOptionsLike>
              <ItemOptionLike
                onClick={() => {
                  if (selectedLike.includes(1)) {
                    setSelectedLike(prev => prev.filter(item => item !== 1))
                  } else {
                    setSelectedLike(prev => [...prev, 1])
                  }
                }}
                active={selectedLike.includes(1)}
              >
                <img src={KeyIMG} />
                <h4>Alquilar</h4>
              </ItemOptionLike>
              <ItemOptionLike
                onClick={() => {
                  if (selectedLike.includes(2)) {
                    setSelectedLike(prev => prev.filter(item => item !== 2))
                  } else {
                    setSelectedLike(prev => [...prev, 2])
                  }
                }}
                active={selectedLike.includes(2)}
              >
                <img src={HomeIMG} />
                <h4>Comprar</h4>
              </ItemOptionLike>
              <ItemOptionLike
                onClick={() => {
                  if (selectedLike.includes(3)) {
                    setSelectedLike(prev => prev.filter(item => item !== 3))
                  } else {
                    setSelectedLike(prev => [...prev, 3])
                  }
                }}
                active={selectedLike.includes(3)}
              >
                <img src={PublishIMG} />
                <h4>Publicar un inmueble</h4>
              </ItemOptionLike>
            </ContainerOptionsLike>
            <OptionsSignIn>
              <SignInWithGoogle
                onClick={submitWrapperStep02(data => {
                  const sanitizedData: Step02RegisterDTO = {
                    ...data,
                    interest: data.interest.filter(
                      (item): item is string => !!item,
                    ),
                  }
                  return handleSubmitStep02(sanitizedData)
                })}
              >
                Completar registro
              </SignInWithGoogle>
            </OptionsSignIn>
          </ContainerFullComponent>
        )}
        {stepForm == EStepRegister.REGISTER_COMPLETE && (
          <ContainerFullComponentComplete>
            <img src={HousePropertyIMG} />
            <h2>Bienvenido a Quarto</h2>
            <p>Estás un paso más cerca de comenzar tu nueva vida.</p>
            <OptionsSignIn>
              <SignInWithEmail
                onClick={() =>
                  navigate(pathRoutes.PROPERTY.otherPaths.CREATE.to)
                }
              >
                Cargar Inmueble
              </SignInWithEmail>
              <SignInWithGoogle
                onClick={() => navigate(pathRoutes.PROPERTY.to)}
              >
                Ver inmuebles
              </SignInWithGoogle>
            </OptionsSignIn>
          </ContainerFullComponentComplete>
        )}
      </ContainerFullHeightComponent>
    </>
  )
}

export default CompleteRegister
