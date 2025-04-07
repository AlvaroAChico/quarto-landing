import React, { useCallback, useEffect, useMemo, useState } from "react"
import HeaderSection from "../../../../components/header-section/header-section"
import {
  ActionCreateSpan,
  ButtonCreatePropertyForm,
  ButtonCreatePropertyFormFinal,
  ContainerBenefits,
  ContainerButton,
  ContainerButtonCenter,
  ContainerButtonsCreate,
  ContainerCheckTypeProperty,
  ContainerInputsSteps,
  ContainerInputsTwoStep,
  ContainerListFiles,
  ContainerOneInputs,
  ContainerOperationForm,
  ContainerOperationFormCondition,
  ContainerOperationPrice,
  ContainerResFormStyles,
  ContainerStepperCreate,
  ContainerSwitchs,
  ContainerSwitchTwo,
  ContainerThreeInputs,
  ContainerTwoInputs,
  ContainerUpInputs,
  ContainerUploadFiles,
  CustomDetailCard,
  CustomOptionTF,
  GridPropertyCreate,
  ItemBenefit,
  ItemBoxDescription,
  ItemBoxOptions,
  ItemCheckbox,
  ItemStepper,
  ResidentialFormStyles,
  SteppersStyles,
  StyckyContainer,
  WhatsAppButtonFloat,
  WrapperEstimatedAmount,
} from "./create-property.styles"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios"
import { matchPath, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { CreateUserResponseDTO } from "../../../../core/models/interfaces/user-model"
import { pathRoutes } from "../../../../config/routes/paths"
import {
  ContainerDragAndDropAvatar,
  ContainerDragAndDropFiles,
  ContainerImageAvatar,
  CustomWrapperInputAvatar,
  CustomWrapperInputFiles,
  ErrorMessage,
  selectStyles,
  WrapperInput,
} from "../../../../config/theme/global-styles"
import Input from "../../../../components/input/input"
import {
  FormControl,
  FormLabel,
  Input as InputMaterial,
  Select,
  TextField,
} from "@mui/material"
import Button from "../../../../components/button/button"
import useDataUser from "../../../../utils/use-data-user"
import {
  CreatePropStep03Form,
  CreatePropStep03Schema,
  CreatePropStep04Form,
  CreatePropStep04Schema,
  CreatePropStep05Form,
  CreatePropStep05Schema,
} from "../../../../core/models/schemas/property-schema"
import Textarea from "../../../../components/textarea/textarea"
import { setErrResponse } from "../../../../utils/erros-util"
import { CategoryDTO } from "../../../../core/models/interfaces/category-model"
// import CardFile from "../../../../components/card-file/card-file"
import Switch from "../../../../components/switch/switch"
import {
  getInitValues,
  InitValuesProperty,
} from "../../../../core/models/interfaces/property-model"
import { categoryRepository } from "../../../../api/repositories/category-repository"
import { ownerRepository } from "../../../../api/repositories/owner-repository"
import { validateErrorSchema } from "../../../../utils/validations-util"
import { parameterRepository } from "../../../../api/repositories/parameter-repository"
import { ParameterDTO } from "../../../../core/models/interfaces/parameter-model"
import { ETypeParam, listSteppersProperty } from "../../../../constants/app"
import { propertyRepository } from "../../../../api/repositories/property-repository"
import ModalAddOwner from "../../../../components/modal/variants/modal-add-owner/modal-add-owner"
import {
  CityDTO,
  MunicipalityDTO,
  StateDTO,
} from "../../../../core/models/interfaces/city-model"
import MultipleFileUpload from "../../../../components/multi-file-upload/multi-file-upload"
import {
  HeaderWrapper,
  LogoWrapper,
  NavigationItem,
  NavigationList,
} from "../../../../components/empty-layout/header/header.styles"
import ArrowForwardIconIMG from "../../../../assets/img/icons/icon_arrow_register.png"
import DetailCard from "../../../../components/detail-card/detail-card"
import LogoIMG from "../../../../assets/img/logo.webp"
import WhatsappIMG from "../../../../assets/img/icons/icon_whatsapp.png"
import HousePropertyIMG from "../../../../assets/img/house_create_property.png"
import BigKeyIMG from "../../../../assets/img/big_key_step.png"
import BigVentaIMG from "../../../../assets/img/big_venta_step.png"
import BigCheckIMG from "../../../../assets/img/select_check_box_step.png"
import { LoaderStyles } from "../../../../components/button/button.styles"
import RegisterOperation from "./register-operation/register-operation"
import InfoProperty from "./info-property/info-property"
import { useCreatePropertyFromFormData } from "../../../../apis/hooks/use-properties"
import { MessageResponsedDTO } from "../../../../core/models/interfaces/general-model"
import FileUpload from "../../../../components/file-upload/file-upload"

const CreateProperty: React.FC = () => {
  const [stepActive, setStepActive] = React.useState<number>(1)
  const [openAddOwner, setOpenAddOwner] = React.useState<boolean>(false)
  const [isSubmitPropertyCreate, setIsSubmitPropertyCreate] =
    React.useState<boolean>(false)
  const { handleGetToken } = useDataUser()
  const navigate = useNavigate()

  // Schemas Methods

  // ********** Step 03 **********
  const methodsStep03 = useForm<CreatePropStep03Form>({
    resolver: yupResolver(CreatePropStep03Schema),
    defaultValues: {
      price: "0.00",
      price_sell: "0.00",
      initial: "30s",
      checkMode: "1",
      initial_payment: "",
      number_quotes: "18",
      percentage_initial_payment: "30",
      quota_payment: "0.00",
    },
  })

  const {
    handleSubmit: submitWrapperStep03,
    formState: { errors: errorsStep03 },
    register: registerStep03,
    setValue: setValueStep03,
    getValues: getValuesStep03,
    reset: resetStep03,
    watch,
  } = methodsStep03

  // ********** Step 04 **********
  const methodsStep04 = useForm<CreatePropStep04Form>({
    resolver: yupResolver(CreatePropStep04Schema),
    defaultValues: {
      description: "",
      parameters: [],
    },
  })

  const {
    handleSubmit: submitWrapperStep04,
    formState: { errors: errorsStep04 },
    register: registerStep04,
    setValue: setValueStep04,
    getValues: getValuesStep04,
    reset: resetStep04,
  } = methodsStep04

  // ********** Step 05 **********
  const methodsStep05 = useForm<CreatePropStep05Form>({
    resolver: yupResolver(CreatePropStep05Schema),
    defaultValues: {
      title_image: "",
      gallery_images: [],
    },
  })

  const {
    handleSubmit: submitWrapperStep05,
    formState: { errors: errorsStep05 },
    register: registerStep05,
    setValue: setValueStep05,
    getValues: getValuesStep05,
    reset: resetStep05,
  } = methodsStep05

  // Type Property
  const [typeProperty, setTypeProperty] = React.useState<any>(1)
  const [listParams, setListParams] = React.useState<ParameterDTO[]>([])

  const fetchDataParameters = async () => {
    try {
      const response: ParameterDTO[] =
        (await parameterRepository.getAll()) as ParameterDTO[]
      if (!!response) {
        const listParams: ParameterDTO[] = response.map(it => {
          const newIt = { ...it }
          if (it.type.toLowerCase() == ETypeParam.CHECKBOX) {
            newIt.value = false
          }
          if (it.type.toLowerCase() == ETypeParam.NUMBER) {
            newIt.value = ""
          }
          return newIt
        })
        // setValue("parameters", JSON.stringify(listParams))
        setListParams(listParams)
      }
    } finally {
    }
  }

  React.useEffect(() => {
    const fetchDataAsync = async () => {
      await Promise.all([fetchDataParameters()])
    }

    fetchDataAsync()
  }, [])

  const [isSubmitUserCreate, setIsSubmitUserCreate] = React.useState(false)

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [formSteps, setFormSteps] = React.useState({})

  const handleSubmit01 = (data: any) => {
    setFormSteps({ ...formSteps, ...data })
    setStepActive(2)
  }

  const handleSubmit02 = (data: any) => {
    setFormSteps({ ...formSteps, ...data })
    setStepActive(3)
  }

  const handleSubmit03 = (data: any) => {
    setFormSteps({ ...formSteps, ...data })
    setStepActive(4)
  }
  const handleSubmit04 = (data: any) => {
    setFormSteps({ ...formSteps, ...data })
    setStepActive(5)
  }
  const [listFiles, setListFiles] = React.useState<File[]>([])

  const { mutateAsync: createPropertyFromFD } = useCreatePropertyFromFormData()

  const handleSubmit05 = React.useCallback(
    async (data: any) => {
      const finalData = { ...formSteps, ...data }
      finalData.price = parseFloat(finalData.price).toFixed(2)
      finalData.price_sell = parseFloat(finalData.price_sell).toFixed(2)

      if (isSubmitting) return
      setIsSubmitting(true)
      setIsSubmitUserCreate(true)
      try {
        const formData = new FormData()
        for (const key in finalData) {
          if (
            finalData.hasOwnProperty(key) &&
            finalData[key] !== undefined &&
            finalData[key] !== null &&
            finalData[key] !== "" &&
            key != "parameters" &&
            key != "gallery_images"
          ) {
            formData.append(key, finalData[key])
          }
        }

        listParams.forEach((param, index) => {
          if (
            param.value !== null &&
            param.value !== undefined &&
            param.value !== ""
          ) {
            formData.append(`parameters[${index}][id]`, `${param.id}`)
            formData.append(`parameters[${index}][value]`, `${param.value}`)
          }
        })

        console.log("Imageeeees => ", listFiles)
        listFiles.forEach((file, index) => {
          if (file && file instanceof File) {
            formData.append(`gallery_images[${index}]`, file)
          }
        })

        if (formData.entries().next().done) {
          false
          toast.warning("No se encontraron registros")
          return
        }

        const response: MessageResponsedDTO =
          await createPropertyFromFD(formData)

        setStepActive(6)
        console.log("response02 => ", response)

        if (!!response) {
          toast.success(response.message)
          resetStep03()
          resetStep04()
          resetStep05()
          setInfoPicture(null)
          setInfoCedula(null)
          setInfoRifOwner(null)
          setInfoTitleProp(null)
          // navigate(pathRoutes.PROPERTY.to)
        }
      } finally {
        setIsSubmitUserCreate(false)
        setIsSubmitting(false)
      }
    },
    [formSteps, listFiles],
  )

  const [titleImage, setTitleImage] = React.useState<any>()
  const [infoPicture, setInfoPicture] = React.useState<any>()
  const [infoTitleProp, setInfoTitleProp] = React.useState<any>()
  const [infoCedula, setInfoCedula] = React.useState<any>()
  const [infoRifOwner, setInfoRifOwner] = React.useState<any>()

  const [listOtherDocuments, setListOtherDocuments] = React.useState<File[]>([])

  React.useEffect(() => {
    console.log("Images useEffect => ", listFiles)
    setValueStep05("gallery_images", listFiles)
  }, [listFiles])

  const handleChangeToggle = (id: number) => () => {
    const newListParams = listParams.map(param => {
      if (param.id == id) {
        return {
          ...param,
          value: !param.value,
        }
      }
      return param
    })
    setListParams(newListParams)
  }

  const handleToHistoryStep = () => {
    if (stepActive > 1) {
      setStepActive(stepActive - 1)
    }
    if (stepActive <= 1) {
      navigate(-1)
    }
  }

  const [activeCheckMode, setActiveCheckMode] = useState<number>(1)

  useEffect(() => {
    const canonVenta = Number(watch("price_sell") || 0)
    const initial = parseFloat(watch("initial") || "30")
    const ini = ((canonVenta * initial) / 100).toFixed(2)
    setValueStep03("initial_payment", ini)
  }, [watch("price_sell"), watch("initial")])

  const [activeInitialQuota, setActiveInitialQuota] = useState<number>(1)

  const calculatePaymentInitial = useCallback(() => {
    const canonVenta = parseFloat(watch("price_sell") || "0.00")
    const initial = parseFloat(watch("initial") || "30")
    const result = ((canonVenta * initial) / 100).toFixed(2)
    return result
  }, [watch])

  return (
    <>
      <HeaderWrapper>
        <NavigationList>
          {stepActive != 5 && (
            <NavigationItem onClick={handleToHistoryStep}>
              <div>
                <img src={ArrowForwardIconIMG} />
              </div>
              Regresar
            </NavigationItem>
          )}
        </NavigationList>
        <LogoWrapper>
          <img
            src={LogoIMG}
            alt="Logo Quarto"
            onClick={() => navigate(pathRoutes.HOME.to)}
          />
        </LogoWrapper>
      </HeaderWrapper>
      {stepActive != 6 && (
        <>
          <ContainerStepperCreate>
            <SteppersStyles lenghtList={listSteppersProperty.length}>
              {listSteppersProperty.map(stp => (
                <ItemStepper isActive={stepActive == stp.step}>
                  <div>
                    <span
                    // onClick={() => {
                    //   setStepActive(stp.step)
                    // }}
                    >
                      {stp.step}
                    </span>
                  </div>
                  <span>{stp.name}</span>
                </ItemStepper>
              ))}
            </SteppersStyles>
            {stepActive == 1 && (
              <RegisterOperation
                setValue03={setValueStep03}
                handleSubmit={handleSubmit01}
                handleActiveCheck={setActiveCheckMode}
              />
            )}
            {stepActive == 2 && <InfoProperty handleSubmit={handleSubmit02} />}
            {stepActive == 3 && (
              <ContainerOperationPrice>
                {(activeCheckMode == 1 || activeCheckMode == 3) && (
                  <ContainerOperationFormCondition>
                    <ItemBoxOptions>
                      <h3>Condiciones de pago</h3>
                      <DetailCard>
                        Los pagos del condominio son responsabilidad directa del
                        propietario. este costo debe incluirse en el precio del
                        inmueble.
                      </DetailCard>
                      <WrapperInput>
                        <FormControl>
                          <FormLabel>Canon mensual (Alquiler)</FormLabel>
                          <TextField
                            placeholder="Alquiler"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={Boolean(errorsStep03.price)}
                            helperText={
                              errorsStep03.price
                                ? errorsStep03.price.message
                                : ""
                            }
                            {...registerStep03("price")}
                          />
                        </FormControl>
                      </WrapperInput>
                      {activeCheckMode == 1 && (
                        <ContainerButtonCenter>
                          <Button
                            onClick={submitWrapperStep03(handleSubmit03)}
                            text={"Siguiente"}
                            isLoading={isSubmitPropertyCreate}
                            customStyles={"max-width: none !important;"}
                          />
                        </ContainerButtonCenter>
                      )}
                    </ItemBoxOptions>
                    <ItemBoxDescription>
                      <CustomDetailCard>
                        <ContainerBenefits>
                          <ItemBenefit>
                            <img src={BigCheckIMG} />{" "}
                            <p>
                              <strong>0% de comisión a Quarto</strong>
                            </p>
                            <span></span>
                          </ItemBenefit>
                          <ItemBenefit>
                            <img src={BigCheckIMG} />{" "}
                            <p>
                              <strong>
                                4 meses de alquiler por adelantado
                              </strong>
                              <span>
                                *Un mes será para su agente inmobiliario, en
                                caso que no aplique recibirás 3 meses.
                              </span>
                            </p>
                          </ItemBenefit>
                          <ItemBenefit>
                            <img src={BigCheckIMG} />{" "}
                            <p>
                              <strong>
                                Garantía de pagos de mensuales por la completa
                                duración del contrato
                              </strong>
                              <span>
                                *incluso si el inquilino incumple con sus pagos
                              </span>
                            </p>
                          </ItemBenefit>
                          <ItemBenefit>
                            <img src={BigCheckIMG} />{" "}
                            <p>
                              <strong>
                                Póliza de daños contra el inmueble y apoyo legal
                                en cualquier situación
                              </strong>
                              <span>
                                *Cobertura hasta 12 veces el canon mensual
                              </span>
                            </p>
                          </ItemBenefit>
                          <ItemBenefit>
                            <img src={BigCheckIMG} />{" "}
                            <p>
                              <strong>
                                Quarto añadirá un 15% adicional al precio de la
                                propiedad (Por servicios operativos).
                              </strong>
                            </p>
                          </ItemBenefit>
                        </ContainerBenefits>
                      </CustomDetailCard>
                    </ItemBoxDescription>
                  </ContainerOperationFormCondition>
                )}
                {(activeCheckMode == 2 || activeCheckMode == 3) && (
                  <ContainerOperationFormCondition>
                    <ItemBoxOptions>
                      <h3>Condiciones de pago</h3>
                      <WrapperInput>
                        <FormControl>
                          <FormLabel>Precio del inmueble (Venta)</FormLabel>
                          <TextField
                            placeholder="Precio del inmueble"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={Boolean(errorsStep03.price_sell)}
                            helperText={
                              errorsStep03.price_sell
                                ? errorsStep03.price_sell.message
                                : ""
                            }
                            {...registerStep03("price_sell")}
                          />
                        </FormControl>
                      </WrapperInput>
                      <WrapperInput>
                        <FormControl>
                          <FormLabel>Inicial</FormLabel>
                          <ItemBoxOptions>
                            {[
                              {
                                id: 1,
                                name: "30% inicial y 18 cuotas",
                                initial: "30",
                                quota: "18",
                              },
                              {
                                id: 2,
                                name: "40% inicial y 20 cuotas",
                                initial: "40",
                                quota: "20",
                              },
                              {
                                id: 3,
                                name: "50% inicial y 22 cuotas",
                                initial: "50",
                                quota: "22",
                              },
                              {
                                id: 4,
                                name: "60% inicial y 24 cuotas",
                                initial: "60",
                                quota: "24",
                              },
                            ].map(mp => (
                              <ItemCheckbox
                                active={activeInitialQuota == mp.id}
                                onClick={() => {
                                  const canonVenta = Number(
                                    watch("price_sell") || 0,
                                  )
                                  const initial = parseFloat(
                                    watch("initial") || "30",
                                  )
                                  const ini = (
                                    (canonVenta * initial) /
                                    100
                                  ).toFixed(2)
                                  setValueStep03("initial_payment", ini)
                                  // --------------------
                                  const quotaPayment = (
                                    (Number(watch("price_sell") || 0) -
                                      Number(watch("price_sell") || 0) *
                                        (parseFloat(watch("initial") || "30") /
                                          100)) /
                                    24
                                  ).toFixed(2)
                                  setValueStep03("quota_payment", quotaPayment)
                                  // --------------------
                                  setValueStep03(
                                    "percentage_initial_payment",
                                    mp.initial,
                                  )
                                  setValueStep03("number_quotes", mp.quota)
                                  setValueStep03("initial", mp.initial)
                                  setActiveInitialQuota(mp.id)
                                }}
                              >
                                <div>
                                  <span />
                                  {mp.name}
                                </div>
                              </ItemCheckbox>
                            ))}
                          </ItemBoxOptions>
                        </FormControl>
                      </WrapperInput>
                      <WrapperEstimatedAmount>
                        <p>Por parte del comprador, recibirás</p>
                        <div>
                          <div>
                            <p>
                              <strong>${calculatePaymentInitial()}</strong>
                              <span>De inicial</span>
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>
                                $
                                {(
                                  (Number(watch("price_sell") || 0) -
                                    Number(watch("price_sell") || 0) *
                                      (parseFloat(watch("initial") || "30") /
                                        100)) /
                                  24
                                ).toFixed(2)}
                              </strong>
                              <span>
                                en {watch("number_quotes")} cuotas mensuales
                              </span>
                            </p>
                          </div>
                        </div>
                      </WrapperEstimatedAmount>
                      <ContainerButtonCenter>
                        <Button
                          onClick={submitWrapperStep03(handleSubmit03)}
                          text={"Siguiente"}
                          isLoading={isSubmitPropertyCreate}
                          customStyles={"max-width: none !important;"}
                        />
                      </ContainerButtonCenter>
                    </ItemBoxOptions>
                    <ItemBoxDescription>
                      <CustomDetailCard>
                        <img src={BigVentaIMG} />
                        <h2>Venta</h2>
                        <ContainerBenefits>
                          <ItemBenefit>
                            <img src={BigCheckIMG} />{" "}
                            <p>
                              <strong>5% de comisión inmobiliaria.</strong>
                              <span>
                                *Distribuida entre el representante del
                                inquilino y el representante del propietario.
                              </span>
                            </p>
                            <span></span>
                          </ItemBenefit>
                          <ItemBenefit>
                            <img src={BigCheckIMG} />{" "}
                            <p>
                              <strong>
                                Con el pago de la inicial el inquilino se muda
                                la propiedad.
                              </strong>
                            </p>
                          </ItemBenefit>
                          <ItemBenefit>
                            <img src={BigCheckIMG} />{" "}
                            <p>
                              <strong>
                                Con el pago de la última cuota se inicia el
                                trámite para traspasar la titularidad del
                                inmueble.
                              </strong>
                            </p>
                          </ItemBenefit>
                          <ItemBenefit>
                            <img src={BigCheckIMG} />{" "}
                            <p>
                              <strong>
                                Póliza de seguridad que apoya a cualquiera de
                                las partes en caso de conflicto legal o
                                seguimiento de indemnización.
                              </strong>
                            </p>
                          </ItemBenefit>
                        </ContainerBenefits>
                      </CustomDetailCard>
                    </ItemBoxDescription>
                  </ContainerOperationFormCondition>
                )}
              </ContainerOperationPrice>
            )}
            {stepActive == 4 && (
              <>
                <ContainerInputsSteps>
                  <h2>Características del inmueble</h2>
                  <Textarea
                    placeholder="Descripción"
                    register={registerStep04("description")}
                  />
                  {!!(errorsStep04.description as any)?.message && (
                    <ErrorMessage>
                      {(errorsStep04.description as any)?.message}
                    </ErrorMessage>
                  )}
                  <ContainerSwitchs>
                    {listParams.map(param => {
                      if (param.type.toLowerCase() == ETypeParam.CHECKBOX) {
                        return (
                          <Switch
                            isActive={!!param.value}
                            isEnabled={true}
                            onToggle={handleChangeToggle(param.id)}
                            label={param.name}
                          />
                        )
                      }
                      return (
                        <WrapperInput>
                          <label htmlFor={`${param.name}_create`}>
                            {param.name}
                          </label>
                          <Input
                            id={`${param.name}_create`}
                            placeholder={`${param.name}`}
                            type={
                              param.type.toLowerCase() == ETypeParam.NUMBER
                                ? "number"
                                : "text"
                            }
                            onChange={(e: any) => {
                              const newListParams = listParams.map(it => {
                                if (it.id == param.id) {
                                  return {
                                    ...it,
                                    value: e.target.value,
                                  }
                                }
                                return it
                              })
                              setListParams(newListParams)
                            }}
                          />
                        </WrapperInput>
                      )
                    })}
                  </ContainerSwitchs>
                </ContainerInputsSteps>
                <ContainerButtonCenter>
                  <Button
                    // onClick={() => {
                    //   if (stepActive < 6) {
                    //     setStepActive(stepActive + 1)
                    //   }
                    // }}
                    onClick={() => {
                      if (stepActive == 4) {
                        submitWrapperStep04(handleSubmit04)()
                      }
                    }}
                    text={"Siguiente"}
                    isLoading={isSubmitPropertyCreate}
                    customStyles={"margin-top: 40px;"}
                  />
                </ContainerButtonCenter>
              </>
            )}
            {stepActive == 5 && (
              <ResidentialFormStyles>
                <ContainerUploadFiles>
                  <FileUpload
                    title={"Foto Principal"}
                    setImageUrl={setTitleImage}
                    imageUrl={titleImage}
                    setValueBinary={(key, file) =>
                      setValueStep05(
                        key as "title_image" | "gallery_images",
                        file,
                      )
                    }
                    keyValue="title_image"
                  />
                  <MultipleFileUpload
                    title={"Fotos del inmueble"}
                    files={listFiles}
                    setFiles={setListFiles}
                  />
                </ContainerUploadFiles>
                <ButtonCreatePropertyFormFinal
                  // onClick={() => setStepActive(6)}
                  onClick={submitWrapperStep05(handleSubmit05)}
                >
                  {isSubmitUserCreate ? <LoaderStyles /> : "Crear propiedad"}
                </ButtonCreatePropertyFormFinal>
              </ResidentialFormStyles>
            )}
          </ContainerStepperCreate>
          <WhatsAppButtonFloat>
            <img src={WhatsappIMG} />
            Whatsapp
          </WhatsAppButtonFloat>
        </>
      )}
      {stepActive == 6 && (
        <GridPropertyCreate>
          <div>
            <div>
              <h2>Tu solicitud ha sido creada exitosamente</h2>
              <span>
                En breve nuestro equipo te estará contactando por Whatsapp para
                la publicación de tu inmueble.
              </span>
            </div>
            <ContainerButtonsCreate>
              <Button
                onClick={() => navigate(-1)}
                text={"Volver al inicio"}
                isLoading={false}
              />
              <ButtonCreatePropertyForm onClick={() => setStepActive(1)}>
                Cargar otra propiedad
              </ButtonCreatePropertyForm>
            </ContainerButtonsCreate>
          </div>
          <div>
            <img src={HousePropertyIMG} />
          </div>
        </GridPropertyCreate>
      )}
    </>
  )
}

export default CreateProperty
