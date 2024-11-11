import React from "react"
import HeaderSection from "../../../../components/header-section/header-section"
import {
  ContainerBodyCreate,
  ContainerButton,
  ContainerDownInputs,
  ContainerResFormStyles,
  ContainerStepperCreate,
  ContainerUpInputs,
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
  ContainerImageAvatar,
  CustomWrapperInputAvatar,
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
  CreatePropertyForm,
  CreatePropertySchema,
} from "../../../../core/models/schemas/property-schema"
import Textarea from "../../../../components/textarea/textarea"
import { ManagementCompanyDTO } from "../../../../core/models/interfaces/management-company"

const CreateProperty: React.FC = () => {
  const [stepActive, setStepActive] = React.useState<number>(1)
  const [isSubmitPropertyCreate, setIsSubmitPropertyCreate] =
    React.useState<boolean>(false)
  const { handleGetToken } = useDataUser()
  const navigate = useNavigate()
  // Category
  const [optionsCategory, setOptionsCategory] = React.useState<any>([])
  const [seleOpCategory, setSeleOpCategory] = React.useState(null)
  const handleChangeOptionCategory = (value: any) => {
    setValue("category_id", value.value)
    setSeleOpCategory(value)
  }
  // Company
  const [optionsCompany, setOptionsCompany] = React.useState<any>([])
  const [seleOpCompany, setSeleOpCompany] = React.useState(null)
  const handleChangeOptionCompany = (value: any) => {
    setValue("company_id", value.value)
    setSeleOpCompany(value)
  }
  // Agent
  const [optionsAgent, setOptionsAgent] = React.useState<any>([])
  const [seleOpAgent, setSeleOpAgent] = React.useState(null)
  const handleChangeOptionAgent = (value: any) => {
    setValue("agent_id", value.value)
    setSeleOpAgent(value)
  }
  // Owner
  const [optionsOwner, setOptionsOwner] = React.useState<any>([])
  const [seleOpOwner, setSeleOpOwner] = React.useState(null)
  const handleChangeOptionOwner = (value: any) => {
    setValue("owner_id", value.value)
    setSeleOpAgent(value)
  }
  // City
  const [optionsCity, setOptionsCity] = React.useState<any>([])
  const [seleOpCity, setSeleOpCity] = React.useState(null)
  const handleChangeOptionCity = (value: any) => {
    setValue("city_id", value.value)
    setSeleOpAgent(value)
  }
  // Municipality
  const [optionsMunicipality, setOptionsMunicipality] = React.useState<any>([])
  const [seleOpMunicipality, setSeleOpMunicipality] = React.useState(null)
  const handleChangeOptionMunicipality = (value: any) => {
    setValue("municipality_id", value.value)
    setSeleOpAgent(value)
  }
  // Urbanization
  const [optionsUrbanization, setOptionsUrbanization] = React.useState<any>([])
  const [seleOpUrbanization, setSeleOpUrbanization] = React.useState(null)
  const handleChangeOptionUrbanization = (value: any) => {
    setValue("urbanization_id", value.value)
    setSeleOpAgent(value)
  }
  // // Category
  // const [optionsCategory, setOptionsCategory] = React.useState<any>([])
  // const [seleOpCategory, setSeleOpCategory] = React.useState(null)

  const methods = useForm<CreatePropertyForm>({
    resolver: yupResolver(CreatePropertySchema),
    defaultValues: {
      category_id: "",
      title: "",
      description: "",
      property_type: "",
      price: "",
      company_id: "",
      agent_id: "",
      owner_id: "",
      city_id: "",
      municipality_id: "",
      urbanization_id: "",
      latitude: "",
      longitude: "",
      client_address: "",
      video_link: "",
      title_image: "",
      d_image: "",
      gallery_images: [],
      nro_piso: "",
      nro_habitaciones: "",
      nro_banios: "",
      nro_puestos: "",
      nro_m2: "",
      cbx_lavandero: "",
      cbx_piscina: "",
      cbx_pozo_agua: "",
      cbx_gym: "",
      cbx_planta_electrica: "",
      cbx_accept_mascotas: "",
      cbx_ascensor: "",
      cbx_internet: "",
      cbx_amoblado: "",
      cbx_vigilancia: "",
      cbx_aire_acodicionado: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    setValue,
  } = methods

  const handleSubmit = React.useCallback((data: any) => {
    // setIsSubmitUserCreate(true)
    // const storedToken = handleGetToken()
    // if (!!storedToken) {
    //   const formData = new FormData()
    //   formData.append("name", data.name)
    //   formData.append("description", data.description)
    //   formData.append("phone_number", data.phoneProperty)
    //   formData.append("address", data.address)
    //   formData.append("management_company_id", data.managementCompanyId)
    //   if (!!data.picture) {
    //     formData.append("picture", data.picture)
    //   }
    //   axios
    //     .post(`${settingsApp.api.base}/residentials`, formData, {
    //       headers: {
    //         Authorization: `Bearer ${storedToken}`,
    //         ContentType: "application/json",
    //         Accept: "application/json",
    //       },
    //     })
    //     .then(response => {
    //       setIsSubmitUserCreate(false)
    //       const data: CreateUserResponseDTO =
    //         response.data as CreateUserResponseDTO
    //       if (!!data && !!data.message) {
    //         toast.success(data.message)
    //         navigate(pathRoutes.PROPERTIES.LIST)
    //       }
    //     })
    //     .catch(err => {
    //       setIsSubmitUserCreate(false)
    //       setErrResponse(err)
    //     })
    // }
  }, [])

  const fetchListRole = React.useCallback(() => {
    const storedToken = handleGetToken()
    if (storedToken) {
      axios
        .get(`${settingsApp.api.base}/gender`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          const listData: ManagementCompanyDTO[] =
            response.data as ManagementCompanyDTO[]
          // setListManagementCompany(listData)
          const listProperties = (listData || []).map(data => ({
            value: data.id,
            label: data.name,
          }))
          // setOptionsGender(listProperties.filter(propertu => !!propertu))
        })
        .catch(err => {
          toast.error("Failed to fetch data")
        })
    }
  }, [handleGetToken])

  React.useEffect(() => {
    fetchListRole()
  }, [])

  const [infoPicture, setInfoPicture] = React.useState<any>()
  const handleDeletePictureUser = () => {
    // setValue("picture", "")
    setInfoPicture("")
  }

  const onDrop = React.useCallback((acceptedFiles: any, rejectedFiles: any) => {
    if (acceptedFiles.length > 0) {
      if (acceptedFiles.length > 1) {
        toast.error("Solo se permite un archivo.")
        return
      }
      const file = acceptedFiles[0]
      // setValue("picture", file)

      const reader = new FileReader()

      reader.onabort = () => toast.error("File reading was aborted")
      reader.onerror = () => toast.error("File reading has failed")
      reader.onload = () => {
        const binaryStr = reader.result
        if (binaryStr instanceof ArrayBuffer) {
          const blob = new Blob([binaryStr], { type: file.type })
          const imageUrl = URL.createObjectURL(blob)
          setInfoPicture(imageUrl)
        } else {
          toast.error("Error al leer el archivo.")
        }
      }
      reader.readAsArrayBuffer(file)
    }

    if (rejectedFiles.length > 0) {
      toast.error(
        'Solo se permite un archivo y debe ser de tipo "PNG", "JPG" o "JPEG".',
      )
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxFiles: 1,
  })

  const listSteppers = [
    {
      step: 1,
      name: "Detalles",
    },
    {
      step: 2,
      name: "Ubicación",
    },
    {
      step: 3,
      name: "Galeria",
    },
    {
      step: 4,
      name: "Especificaciones",
    },
  ]
  return (
    <>
      <HeaderSection />
      <ContainerStepperCreate>
        <SteppersStyles>
          {listSteppers.map(stp => (
            <ItemStepper isActive={stepActive == stp.step}>
              <div>
                <span onClick={() => setStepActive(stp.step)}>{stp.step}</span>
              </div>
              <span>{stp.name}</span>
              <span />
            </ItemStepper>
          ))}
        </SteppersStyles>
        {stepActive == 1 && (
          <ResidentialFormStyles>
            <ContainerResFormStyles>
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
                {!!(errors.category_id as any)?.message && (
                  <ErrorMessage>
                    {(errors.category_id as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
              <WrapperInput>
                <label htmlFor="last_name-create-project">Titulo</label>
                <Input
                  id="last_name-create-project"
                  placeholder="Enter description"
                  // icon={TextDescription}
                  register={register("description")}
                />
                {!!(errors.title as any)?.message && (
                  <ErrorMessage>{(errors.title as any)?.message}</ErrorMessage>
                )}
              </WrapperInput>
              <WrapperInput>
                <label htmlFor="last_name-create-project">Descripción</label>
                <Textarea
                  id="last_name-create-project"
                  placeholder="Enter description"
                  // icon={TextDescription}
                  register={register("description")}
                />
                {!!(errors.description as any)?.message && (
                  <ErrorMessage>
                    {(errors.description as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
              <WrapperInput>
                <div>
                  <label htmlFor="last_name-create-project">
                    Tipo de propiedad
                  </label>
                  <label>
                    <input type="checkbox" />
                    Apartamento
                  </label>
                  <label>
                    <input type="checkbox" />
                    Inmoviliaria
                  </label>
                </div>
                {!!(errors.description as any)?.message && (
                  <ErrorMessage>
                    {(errors.description as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
              <WrapperInput>
                <label htmlFor="last_name-create-project">Precio</label>
                <Input
                  id="last_name-create-project"
                  placeholder="Enter description"
                  // icon={TextDescription}
                  register={register("price")}
                />
                {!!(errors.price as any)?.message && (
                  <ErrorMessage>{(errors.price as any)?.message}</ErrorMessage>
                )}
              </WrapperInput>
              <WrapperInput>
                <label htmlFor="company-create-project">Company</label>
                <Select
                  id="company-create-project"
                  defaultValue={seleOpCompany}
                  onChange={handleChangeOptionCompany}
                  options={optionsCompany}
                  isSearchable={true}
                  styles={selectStyles}
                />
                {!!(errors.company_id as any)?.message && (
                  <ErrorMessage>
                    {(errors.company_id as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
              <WrapperInput>
                <label htmlFor="agent-create-project">Agente</label>
                <Select
                  id="agent-create-project"
                  defaultValue={seleOpAgent}
                  onChange={handleChangeOptionAgent}
                  options={optionsAgent}
                  isSearchable={true}
                  styles={selectStyles}
                />
                {!!(errors.agent_id as any)?.message && (
                  <ErrorMessage>
                    {(errors.agent_id as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
              <WrapperInput>
                <label htmlFor="owner-create-project">Propietario</label>
                <Select
                  id="owner-create-project"
                  defaultValue={seleOpOwner}
                  onChange={handleChangeOptionOwner}
                  options={optionsOwner}
                  isSearchable={true}
                  styles={selectStyles}
                />
                {!!(errors.owner_id as any)?.message && (
                  <ErrorMessage>
                    {(errors.owner_id as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
            </ContainerResFormStyles>
          </ResidentialFormStyles>
        )}
        {stepActive == 2 && (
          <ResidentialFormStyles>
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
              {!!(errors.city_id as any)?.message && (
                <ErrorMessage>{(errors.city_id as any)?.message}</ErrorMessage>
              )}
            </WrapperInput>
            <WrapperInput>
              <label htmlFor="municipality-create-project">Municipalidad</label>
              <Select
                id="municipality-create-project"
                defaultValue={seleOpMunicipality}
                onChange={handleChangeOptionMunicipality}
                options={optionsMunicipality}
                isSearchable={true}
                styles={selectStyles}
              />
              {!!(errors.municipality_id as any)?.message && (
                <ErrorMessage>
                  {(errors.municipality_id as any)?.message}
                </ErrorMessage>
              )}
            </WrapperInput>
            <WrapperInput>
              <label htmlFor="urbanization-create-project">Urbanización</label>
              <Select
                id="urbanization-create-project"
                defaultValue={seleOpUrbanization}
                onChange={handleChangeOptionUrbanization}
                options={optionsUrbanization}
                isSearchable={true}
                styles={selectStyles}
              />
              {!!(errors.urbanization_id as any)?.message && (
                <ErrorMessage>
                  {(errors.urbanization_id as any)?.message}
                </ErrorMessage>
              )}
            </WrapperInput>
            <WrapperInput>
              <label htmlFor="latitude-create-project">Latitud</label>
              <Input
                id="latitude-create-project"
                placeholder="Enter latitud"
                // icon={TextDescription}
                register={register("latitude")}
              />
              {!!(errors.title as any)?.message && (
                <ErrorMessage>{(errors.title as any)?.message}</ErrorMessage>
              )}
            </WrapperInput>
          </ResidentialFormStyles>
        )}
        {stepActive == 3 && (
          <ResidentialFormStyles>
            <ContainerUpInputs>
              {/* <CustomWrapperInputAvatar>
                <label htmlFor="picture-create-project">Imagen</label>
                <div>
                  {!!infoPicture ? (
                    <ContainerImageAvatar>
                      <img src={infoPicture} />
                      <div onClick={handleDeletePictureUser}>
                        <Trash />
                      </div>
                    </ContainerImageAvatar>
                  ) : (
                    <ContainerDragAndDropAvatar
                      {...getRootProps()}
                      isDragActive={isDragActive}
                    >
                      <CardImage />
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop picture here</p>
                      ) : (
                        <p>Drag or click to upload an image</p>
                      )}
                    </ContainerDragAndDropAvatar>
                  )}
                </div>
                {!!(errors.picture as any)?.message && (
                  <ErrorMessage>
                    {(errors.picture as any)?.message}
                  </ErrorMessage>
                )}
              </CustomWrapperInputAvatar> */}
              ss
            </ContainerUpInputs>
          </ResidentialFormStyles>
        )}
        {stepActive == 4 && (
          <ResidentialFormStyles>
            <ContainerUpInputs>aa</ContainerUpInputs>
          </ResidentialFormStyles>
        )}
        <ContainerButton>
          <Button
            handleClick={submitWrapper(handleSubmit)}
            onClick={submitWrapper(handleSubmit)}
            text="Create"
            isLoading={isSubmitPropertyCreate}
          />
        </ContainerButton>
      </ContainerStepperCreate>
    </>
  )
}

export default CreateProperty
