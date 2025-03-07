import React from "react"
import HeaderSection from "../../../../components/header-section/header-section"
import {
  ActionCreateSpan,
  ContainerButton,
  ContainerCheckTypeProperty,
  ContainerListFiles,
  ContainerOneInputs,
  ContainerResFormStyles,
  ContainerStepperCreate,
  ContainerSwitchs,
  ContainerSwitchTwo,
  ContainerThreeInputs,
  ContainerTwoInputs,
  ContainerUpInputs,
  ContainerUploadFiles,
  ItemStepper,
  ResidentialFormStyles,
  SteppersStyles,
} from "./create-property.styles"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
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
import Button from "../../../../components/button/button"
import { FolderOpen } from "@styled-icons/fa-regular/FolderOpen"
import { TextDescription } from "@styled-icons/fluentui-system-filled/TextDescription"
import { CardImage } from "@styled-icons/bootstrap/CardImage"
import { useDropzone } from "react-dropzone"
import { settingsApp } from "../../../../config/environment/settings"
import useDataUser from "../../../../utils/use-data-user"
import { Trash } from "@styled-icons/ionicons-solid/Trash"
import { Files } from "@styled-icons/simple-icons/Files"
import Select from "react-select"
import {
  CreatePropertySchema,
  CreatePropStep01Form,
  CreatePropStep01Schema,
  CreatePropStep02Form,
  CreatePropStep02Schema,
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
import CardFile from "../../../../components/card-file/card-file"
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
  UrbanizationDTO,
} from "../../../../core/models/interfaces/city-model"
import { OwnerDTO } from "../../../../core/models/interfaces/visits-model"
import { planRepository } from "../../../../api/repositories/plan-repository"
import { PlanDTO } from "../../../../core/models/interfaces/plan-model"
import FileUpload from "../../../../components/file-upload/file-upload"
import MultiFileUpload from "../../../../components/multi-file-upload/multi-file-upload"
import MultipleFileUpload from "../../../../components/multi-file-upload/multi-file-upload"

const CreateProperty: React.FC = () => {
  const [stepActive, setStepActive] = React.useState<number>(1)
  const [openAddOwner, setOpenAddOwner] = React.useState<boolean>(false)
  const [isSubmitPropertyCreate, setIsSubmitPropertyCreate] =
    React.useState<boolean>(false)
  const { handleGetToken } = useDataUser()
  const navigate = useNavigate()
  // Category
  const [optionsCategory, setOptionsCategory] = React.useState<any>([])
  const [seleOpCategory, setSeleOpCategory] = React.useState(null)
  const handleChangeOptionCategory = (value: any) => {
    setValueStep01("category_id", value.value)
    setSeleOpCategory(value)
  }
  // Owner
  const [optionsOwner, setOptionsOwner] = React.useState<any>([])
  const [seleOpOwner, setSeleOpOwner] = React.useState(null)
  const handleChangeOptionOwner = (value: any) => {
    setValueStep01("owner_id", value.value)
    setSeleOpOwner(value)
  }
  // Owner
  const [optionsPlan, setOptionsPlan] = React.useState<any>([])
  const [seleOpPlan, setSeleOpPlan] = React.useState(null)
  const handleChangeOptionPlan = (value: any) => {
    setValueStep02("plan_id", value.value)
    setSeleOpPlan(value)
  }
  // Rent Duration
  const [optionsRentDurations, setOptionsRentDurations] = React.useState<any>([
    {
      value: 1,
      label: "Diario",
    },
    {
      value: 2,
      label: "Mensual",
    },
    {
      value: 3,
      label: "Anual",
    },
    {
      value: 4,
      label: "Trimestral",
    },
  ])

  // Schemas Methods
  // ********** Step 01 **********
  const methodsStep01 = useForm<CreatePropStep01Form>({
    resolver: yupResolver(CreatePropStep01Schema),
    defaultValues: {
      category_id: "",
      title: "",
      description: "",
      type_id: "1",
      price: 0,
      owner_id: "",
    },
  })

  const {
    handleSubmit: submitWrapperStep01,
    formState: { errors: errorsStep01 },
    register: registerStep01,
    setValue: setValueStep01,
    getValues: getValuesStep01,
    reset: resetStep01,
  } = methodsStep01

  // ********** Step 02 **********
  const methodsStep02 = useForm<CreatePropStep02Form>({
    resolver: yupResolver(CreatePropStep02Schema),
    defaultValues: {
      state: "",
      city: "",
      municipality: "",
      full_address: "",
      plan_id: "",
      rent_duration: "",
    },
  })

  const {
    handleSubmit: submitWrapperStep02,
    formState: { errors: errorsStep02 },
    register: registerStep02,
    setValue: setValueStep02,
    getValues: getValuesStep02,
    reset: resetStep02,
  } = methodsStep02

  // ********** Step 03 **********
  const methodsStep03 = useForm<CreatePropStep03Form>({
    resolver: yupResolver(CreatePropStep03Schema),
    defaultValues: {
      title_image: "",
      gallery_images: [],
    },
  })

  const {
    handleSubmit: submitWrapperStep03,
    formState: { errors: errorsStep03 },
    register: registerStep03,
    setValue: setValueStep03,
    getValues: getValuesStep03,
    reset: resetStep03,
  } = methodsStep03

  // ********** Step 04 **********
  const methodsStep04 = useForm<CreatePropStep04Form>({
    resolver: yupResolver(CreatePropStep04Schema),
    defaultValues: {
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
      img_property: "",
      img_cedula: "",
      img_rif: "",
      other_images: [],
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

  const [seleOpRentDuration, setSeleOpRentDuration] = React.useState(null)
  const handleChangeOptionRentDuration = (value: any) => {
    setValueStep02("rent_duration", value.value)
    setSeleOpRentDuration(value)
  }
  // State
  const [optionsState, setOptionsState] = React.useState<any>([])
  const [seleOpState, setSeleOpState] = React.useState(null)
  const handleChangeOptionState = (value: any) => {
    setValueStep02("state", value.value)
    setSeleOpState(value)
    setOptionsCity(
      allCity
        .filter(ft => ft.stateId == value.value)
        .map(it => ({
          value: it.id,
          label: it.name,
        })),
    )
  }
  // City
  const [allCity, setAllCity] = React.useState<CityDTO[]>([])
  const [optionsCity, setOptionsCity] = React.useState<any>([])
  const [seleOpCity, setSeleOpCity] = React.useState(null)
  const handleChangeOptionCity = (value: any) => {
    setValueStep02("city", value.value)
    setSeleOpCity(value)
    setOptionsMunicipality(
      allMunicipality
        .filter(ft => ft.cityId == value.value)
        .map(it => ({
          value: it.id,
          label: it.name,
        })),
    )
  }
  // Municipality
  const [allMunicipality, setAllMunicipality] = React.useState<
    MunicipalityDTO[]
  >([])
  const [optionsMunicipality, setOptionsMunicipality] = React.useState<any>([])
  const [seleOpMunicipality, setSeleOpMunicipality] = React.useState(null)
  const handleChangeOptionMunicipality = (value: any) => {
    setValueStep02("municipality", value.value)
    setSeleOpMunicipality(value)
  }
  // Type Property
  const [typeProperty, setTypeProperty] = React.useState<any>(1)
  const [listParams, setListParams] = React.useState<ParameterDTO[]>([])

  // Fetch data selects
  const fetchDataPlans = async () => {
    try {
      const response: PlanDTO[] = (await planRepository.getAll()) as PlanDTO[]
      if (!!response) {
        const listData = (response || []).map(it => ({
          value: it.id,
          label: it.name,
        }))
        setOptionsPlan(listData)
      }
    } finally {
    }
  }

  const fetchDataCategories = async () => {
    try {
      const response: CategoryDTO[] =
        (await categoryRepository.getAll()) as CategoryDTO[]
      if (!!response) {
        const listData = (response || []).map(it => ({
          value: it.id,
          label: it.name,
        }))
        setOptionsCategory(listData)
      }
    } finally {
    }
  }

  const fetchDataOwners = async () => {
    try {
      const response: OwnerDTO[] =
        (await ownerRepository.getAll()) as OwnerDTO[]
      if (!!response) {
        const listData = (response || []).map(it => ({
          value: it.id,
          label: it.fullName,
        }))
        setOptionsOwner(listData)
      }
    } finally {
    }
  }

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

  const fetchDataStates = async () => {
    try {
      const response: StateDTO[] =
        (await parameterRepository.getState()) as StateDTO[]
      if (!!response) {
        const listData = (response || []).map(it => ({
          value: it.id,
          label: it.name,
        }))
        setOptionsState(listData)
      }
    } finally {
    }
  }

  const fetchDataCities = async () => {
    try {
      const response: CityDTO[] =
        (await parameterRepository.getCity()) as CityDTO[]
      if (!!response) {
        setAllCity(response)
      }
    } finally {
    }
  }

  const fetchDataMunicipalities = async () => {
    try {
      const response: MunicipalityDTO[] =
        (await parameterRepository.getMuni()) as MunicipalityDTO[]
      if (!!response) {
        setAllMunicipality(response)
      }
    } finally {
    }
  }

  React.useEffect(() => {
    const fetchDataAsync = async () => {
      await Promise.all([
        fetchDataPlans(),
        fetchDataCategories(),
        fetchDataOwners(),
        fetchDataParameters(),
        fetchDataStates(),
        fetchDataCities(),
        fetchDataMunicipalities(),
        // fetchDataNeighborhoods(),
      ])
    }

    fetchDataAsync()
  }, [])

  // Componente principal del formulario

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

  const handleSubmit05 = React.useCallback(
    async (data: any) => {
      const finalData = { ...formSteps, ...data }
      finalData.price = parseFloat(finalData.price).toFixed(2)

      console.log(finalData)

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
            // console.log("AAAAAAA => ", key)
            // console.log("BBBBBB => ", finalData[key])
            formData.append(key, finalData[key])
          }
        }

        // console.log("Form Data result => ", JSON.stringify(formData))
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

        const response: CreateUserResponseDTO =
          (await propertyRepository.createProperty(
            formData,
          )) as CreateUserResponseDTO
        if (!!response) {
          toast.success(response.message)
          resetStep01()
          resetStep02()
          resetStep03()
          resetStep04()
          resetStep05()
          setInfoPicture(null)
          setInfoCedula(null)
          setInfoRifOwner(null)
          setInfoTitleProp(null)
          setSeleOpState(null)
          setSeleOpCity(null)
          setSeleOpMunicipality(null)
          setSeleOpCategory(null)
          setSeleOpOwner(null)
          setSeleOpPlan(null)
          setSeleOpRentDuration(null)
          navigate(pathRoutes.PROPERTY.to)
        }
      } finally {
        setIsSubmitUserCreate(false)
        setIsSubmitting(false)
      }
    },
    [formSteps],
  )

  const [infoPicture, setInfoPicture] = React.useState<any>()
  const [infoTitleProp, setInfoTitleProp] = React.useState<any>()
  const [infoCedula, setInfoCedula] = React.useState<any>()
  const [infoRifOwner, setInfoRifOwner] = React.useState<any>()

  const [listFiles, setListFiles] = React.useState<File[]>([])
  const [listOtherDocuments, setListOtherDocuments] = React.useState<File[]>([])

  React.useEffect(() => {
    setValueStep03("gallery_images", listFiles)
  }, [listFiles])

  React.useEffect(() => {
    setValueStep05("other_images", listOtherDocuments)
  }, [listOtherDocuments])

  const handleChangeTypeProperty = (typeProperty: number) => () => {
    setValueStep01("type_id", `${typeProperty}`)
    setTypeProperty(typeProperty)
  }

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

  return (
    <>
      <HeaderSection />
      <ContainerStepperCreate>
        <SteppersStyles>
          {listSteppersProperty.map(stp => (
            <ItemStepper isActive={stepActive == stp.step}>
              <div>
                <span
                  onClick={() => {
                    setStepActive(stp.step)
                  }}
                >
                  {stp.step}
                </span>
              </div>
              <span>{stp.name}</span>
              <span />
            </ItemStepper>
          ))}
        </SteppersStyles>
        {stepActive == 1 && (
          <ResidentialFormStyles>
            <ContainerResFormStyles>
              <ContainerTwoInputs>
                <WrapperInput>
                  <label htmlFor="property-create-project">Categoria</label>
                  <Select
                    id="property-create-project"
                    defaultValue={seleOpCategory}
                    onChange={handleChangeOptionCategory}
                    options={optionsCategory}
                    isSearchable={true}
                    styles={selectStyles}
                  />
                  {!!(errorsStep01.category_id as any)?.message && (
                    <ErrorMessage>
                      {(errorsStep01.category_id as any)?.message}
                    </ErrorMessage>
                  )}
                </WrapperInput>
                <WrapperInput>
                  <label htmlFor="last_name-create-project">Titulo</label>
                  <Input
                    id="last_name-create-project"
                    placeholder="Enter description"
                    // icon={TextDescription}
                    register={registerStep01("title")}
                  />
                  {!!(errorsStep01.title as any)?.message && (
                    <ErrorMessage>
                      {(errorsStep01.title as any)?.message}
                    </ErrorMessage>
                  )}
                </WrapperInput>
              </ContainerTwoInputs>
              <ContainerOneInputs>
                <WrapperInput>
                  <label htmlFor="last_name-create-project">Descripción</label>
                  <Textarea
                    id="last_name-create-project"
                    placeholder="Enter description"
                    // icon={TextDescription}
                    register={registerStep01("description")}
                  />
                  {!!(errorsStep01.description as any)?.message && (
                    <ErrorMessage>
                      {(errorsStep01.description as any)?.message}
                    </ErrorMessage>
                  )}
                </WrapperInput>
              </ContainerOneInputs>
              <ContainerThreeInputs>
                <WrapperInput>
                  <ContainerSwitchTwo>
                    <label htmlFor="last_name-create-project">
                      Tipo de propiedad
                    </label>
                    <ContainerCheckTypeProperty typeProperty={typeProperty}>
                      <div onClick={handleChangeTypeProperty(1)}>
                        <span>Para alquilar</span>
                      </div>
                      <div onClick={handleChangeTypeProperty(2)}>
                        <span>Para vender</span>
                      </div>
                    </ContainerCheckTypeProperty>
                  </ContainerSwitchTwo>
                  {!!(errorsStep01.type_id as any)?.message && (
                    <ErrorMessage>
                      {(errorsStep01.type_id as any)?.message}
                    </ErrorMessage>
                  )}
                </WrapperInput>
                <WrapperInput>
                  <label htmlFor="price-create-project">Precio</label>
                  <Input
                    id="price-create-project"
                    placeholder="Enter price"
                    // icon={TextDescription}
                    type="number"
                    register={registerStep01("price")}
                  />
                  {!!(errorsStep01.price as any)?.message && (
                    <ErrorMessage>
                      {(errorsStep01.price as any)?.message}
                    </ErrorMessage>
                  )}
                </WrapperInput>
                <WrapperInput>
                  <label htmlFor="owner-create-project">
                    Propietario
                    <ActionCreateSpan onClick={() => setOpenAddOwner(true)}>
                      Crear
                    </ActionCreateSpan>
                  </label>
                  <Select
                    id="owner-create-project"
                    defaultValue={seleOpOwner}
                    onChange={handleChangeOptionOwner}
                    options={optionsOwner}
                    isSearchable={true}
                    styles={selectStyles}
                  />
                  {!!(errorsStep01.owner_id as any)?.message && (
                    <ErrorMessage>
                      {(errorsStep01.owner_id as any)?.message}
                    </ErrorMessage>
                  )}
                </WrapperInput>
              </ContainerThreeInputs>
            </ContainerResFormStyles>
          </ResidentialFormStyles>
        )}
        {stepActive == 2 && (
          <ResidentialFormStyles>
            <ContainerThreeInputs>
              <WrapperInput>
                <label htmlFor="state-create-project">Estado</label>
                <Select
                  id="state-create-project"
                  defaultValue={seleOpState}
                  onChange={handleChangeOptionState}
                  options={optionsState}
                  isSearchable={true}
                  styles={selectStyles}
                />
                {!!(errorsStep02.state as any)?.message && (
                  <ErrorMessage>
                    {(errorsStep02.state as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
              <WrapperInput>
                <label htmlFor="city-create-project">Ciudad</label>
                <Select
                  id="city-create-project"
                  defaultValue={seleOpCity}
                  onChange={handleChangeOptionCity}
                  options={optionsCity}
                  isSearchable={true}
                  styles={selectStyles}
                />
                {!!(errorsStep02.city as any)?.message && (
                  <ErrorMessage>
                    {(errorsStep02.city as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
              <WrapperInput>
                <label htmlFor="municipality-create-project">
                  Municipalidad
                </label>
                <Select
                  id="municipality-create-project"
                  defaultValue={seleOpMunicipality}
                  onChange={handleChangeOptionMunicipality}
                  options={optionsMunicipality}
                  isSearchable={true}
                  styles={selectStyles}
                />
                {!!(errorsStep02.municipality as any)?.message && (
                  <ErrorMessage>
                    {(errorsStep02.municipality as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
            </ContainerThreeInputs>
            <ContainerOneInputs>
              <WrapperInput>
                <label htmlFor="address-create-project">Dirección</label>
                <Input
                  id="address-create-project"
                  placeholder="Enter address"
                  // icon={TextDescription}
                  register={registerStep02("full_address")}
                />
                {!!(errorsStep02.full_address as any)?.message && (
                  <ErrorMessage>
                    {(errorsStep02.full_address as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
            </ContainerOneInputs>
            <ContainerTwoInputs>
              <WrapperInput>
                <label htmlFor="plan-create-project">Plan</label>
                <Select
                  id="plan-create-project"
                  defaultValue={seleOpPlan}
                  onChange={handleChangeOptionPlan}
                  options={optionsPlan}
                  isSearchable={true}
                  styles={selectStyles}
                />
                {!!(errorsStep02.plan_id as any)?.message && (
                  <ErrorMessage>
                    {(errorsStep02.plan_id as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
              <WrapperInput>
                <label htmlFor="duration-create-project">Duración</label>
                <Select
                  id="duration-create-project"
                  defaultValue={seleOpRentDuration}
                  onChange={handleChangeOptionRentDuration}
                  options={optionsRentDurations}
                  isSearchable={true}
                  styles={selectStyles}
                />
                {!!(errorsStep02.rent_duration as any)?.message && (
                  <ErrorMessage>
                    {(errorsStep02.rent_duration as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
            </ContainerTwoInputs>
          </ResidentialFormStyles>
        )}
        {stepActive == 3 && (
          <ResidentialFormStyles>
            <ContainerTwoInputs>
              <FileUpload
                title={"Imagen del Titulo"}
                imageUrl={infoPicture}
                setImageUrl={url => setInfoPicture(url)}
                setValueBinary={setValueStep03}
                keyValue="picture"
                isActiveChange={true}
              />
              {!!(errorsStep03.title_image as any)?.message && (
                <ErrorMessage>
                  {(errorsStep03.title_image as any)?.message}
                </ErrorMessage>
              )}
            </ContainerTwoInputs>
            <ContainerUploadFiles>
              <MultipleFileUpload
                title={"Galería de Imágenes"}
                files={listFiles}
                setFiles={setListFiles}
              />
              {/* <CustomWrapperInputFiles>
                <label htmlFor="picture-create-project">Files</label>
                <ContainerDragAndDropFiles
                  {...getRootPropsGallery()}
                  isDragActive={isDragActiveGallery}
                >
                  <Files />
                  <input {...getInputPropsGallery()} />
                  {isDragActiveGallery ? (
                    <p>Drop picture here</p>
                  ) : (
                    <p>Drag or click this container to upload an image</p>
                  )}
                </ContainerDragAndDropFiles>
                {!!(errorsStep03.gallery_images as any)?.message && (
                  <ErrorMessage>
                    {(errorsStep03.gallery_images as any)?.message}
                  </ErrorMessage>
                )}
                <ContainerListFiles>
                  {listFiles.length > 0 &&
                    (listFiles || []).map(file => (
                      <CardFile
                        file={file}
                        onDeleteFile={() => handleDeleteOneFile(file)}
                      />
                    ))}
                </ContainerListFiles>
              </CustomWrapperInputFiles> */}
            </ContainerUploadFiles>
          </ResidentialFormStyles>
        )}
        {stepActive == 4 && (
          <>
            <ResidentialFormStyles>
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
            </ResidentialFormStyles>
          </>
        )}
        {stepActive == 5 && (
          <ResidentialFormStyles>
            <ContainerThreeInputs>
              <div>
                <FileUpload
                  title={"Titulo de propiedad"}
                  imageUrl={infoTitleProp}
                  setImageUrl={url => setInfoTitleProp(url)}
                  setValueBinary={setValueStep05}
                  keyValue="picture"
                  isActiveChange={true}
                />
                {!!(errorsStep03.title_image as any)?.message && (
                  <ErrorMessage>
                    {(errorsStep03.title_image as any)?.message}
                  </ErrorMessage>
                )}
              </div>
              <div>
                <FileUpload
                  title={"Cédula"}
                  imageUrl={infoCedula}
                  setImageUrl={url => setInfoCedula(url)}
                  setValueBinary={setValueStep05}
                  keyValue="picture"
                  isActiveChange={true}
                />
                {!!(errorsStep03.title_image as any)?.message && (
                  <ErrorMessage>
                    {(errorsStep03.title_image as any)?.message}
                  </ErrorMessage>
                )}
              </div>
              <div>
                <FileUpload
                  title={"Rif del Propietario"}
                  imageUrl={infoRifOwner}
                  setImageUrl={url => setInfoRifOwner(url)}
                  setValueBinary={setValueStep05}
                  keyValue="picture"
                  isActiveChange={true}
                />
                {!!(errorsStep03.title_image as any)?.message && (
                  <ErrorMessage>
                    {(errorsStep03.title_image as any)?.message}
                  </ErrorMessage>
                )}
              </div>
            </ContainerThreeInputs>
            <ContainerOneInputs>
              <MultipleFileUpload
                title={"Otros documentos"}
                files={listOtherDocuments}
                setFiles={setListOtherDocuments}
              />
              {!!(errorsStep05.other_images as any)?.message && (
                <ErrorMessage>
                  {(errorsStep05.other_images as any)?.message}
                </ErrorMessage>
              )}
            </ContainerOneInputs>
          </ResidentialFormStyles>
        )}
        <ContainerButton>
          {/* <button onClick={submitWrapper(handleSubmit)()}>aaa</button> */}
          <Button
            onClick={() => {
              if (stepActive == 1) {
                submitWrapperStep01(handleSubmit01)()
              }
              if (stepActive == 2) {
                submitWrapperStep02(handleSubmit02)()
              }
              if (stepActive == 3) {
                submitWrapperStep03(handleSubmit03)()
              }
              if (stepActive == 4) {
                submitWrapperStep04(handleSubmit04)()
              }
              if (stepActive == 5) {
                submitWrapperStep04(handleSubmit05)()
              }
            }}
            text={stepActive == 5 ? "Crear" : "Siguiente"}
            isLoading={isSubmitPropertyCreate}
          />
        </ContainerButton>
      </ContainerStepperCreate>
      <ModalAddOwner
        handleClose={() => setOpenAddOwner(false)}
        handleRefresh={fetchDataOwners}
        isOpen={openAddOwner}
      />
    </>
  )
}

export default CreateProperty
