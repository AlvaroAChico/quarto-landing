import React from "react"
import HeaderSection from "../../../../components/header-section/header-section"
import {
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
  CreatePropertyForm,
  CreatePropertySchema,
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
import { ETypeParam } from "../../../../constants/app"
import { propertyRepository } from "../../../../api/repositories/property-repository"
import ModalAddOwner from "../../../../components/modal/variants/modal-add-owner/modal-add-owner"
import {
  MunicipalityDTO,
  UrbanizationDTO,
} from "../../../../core/models/interfaces/city-model"
import { OwnerDTO } from "../../../../core/models/interfaces/visits-model"

const CreateProperty: React.FC = () => {
  const [openAddOwner, setOpenAddOwner] = React.useState<boolean>(false)
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
  // Owner
  const [optionsOwner, setOptionsOwner] = React.useState<any>([])
  const [seleOpOwner, setSeleOpOwner] = React.useState(null)
  const handleChangeOptionOwner = (value: any) => {
    setValue("owner_id", value.value)
    setSeleOpOwner(value)
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
  const [seleOpRentDuration, setSeleOpRentDuration] = React.useState(null)
  const handleChangeOptionRentDuration = (value: any) => {
    setValue("rent_duration", value.value)
    setSeleOpRentDuration(value)
  }
  // City
  const [optionsCity, setOptionsCity] = React.useState<any>([])
  const [seleOpCity, setSeleOpCity] = React.useState(null)
  const handleChangeOptionCity = (value: any) => {
    setValue("city", value.value)
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
    setValue("municipality", value.value)
    setSeleOpMunicipality(value)
    setOptionsUrbanization(
      allUrbanization
        .filter(ft => ft.municipalityId == value.value)
        .map(it => ({
          value: it.id,
          label: it.name,
        })),
    )
  }
  // Urbanization
  const [allUrbanization, setAllUrbanization] = React.useState<
    UrbanizationDTO[]
  >([])
  const [optionsUrbanization, setOptionsUrbanization] = React.useState<any>([])
  const [seleOpUrbanization, setSeleOpUrbanization] = React.useState(null)
  const handleChangeOptionUrbanization = (value: any) => {
    setValue("urbanization", value.value)
    setSeleOpUrbanization(value)
  }
  // // Category
  // const [optionsCategory, setOptionsCategory] = React.useState<any>([])
  // const [seleOpCategory, setSeleOpCategory] = React.useState(null)
  // Type Property
  const [typeProperty, setTypeProperty] = React.useState<any>(1)
  const [listParams, setListParams] = React.useState<ParameterDTO[]>([])

  // Fetch data selects
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
      const response: any[] = (await parameterRepository.getState()) as any[]
      if (!!response) {
        const listData = (response || []).map(it => ({
          value: it.id,
          label: it.name,
        }))
        setOptionsCity(listData)
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

  const fetchDataNeighborhoods = async () => {
    try {
      const response: UrbanizationDTO[] =
        (await parameterRepository.getNei()) as UrbanizationDTO[]
      if (!!response) {
        setAllUrbanization(response)
      }
    } finally {
    }
  }

  React.useEffect(() => {
    const fetchDataAsync = async () => {
      await Promise.all([
        fetchDataCategories(),
        fetchDataOwners(),
        fetchDataParameters(),
        fetchDataStates(),
        fetchDataMunicipalities(),
        fetchDataNeighborhoods(),
      ])
    }

    fetchDataAsync()
  }, [])

  const methods = useForm<CreatePropertyForm>({
    resolver: yupResolver(CreatePropertySchema),
    defaultValues: {
      category_id: "",
      title: "",
      description: "",
      type_id: "1",
      plan_id: "1",
      price: 0,
      rent_duration: "",
      owner_id: "",
      city: "",
      municipality: "",
      urbanization: "",
      full_address: "",
      video_link: "",
      title_image: "",
      d_image: "",
      gallery_images: [],
      parameters: [],
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    setValue,
  } = methods

  const [isSubmitUserCreate, setIsSubmitUserCreate] = React.useState(false)

  const handleSubmit = async (data: any) => {
    setIsSubmitUserCreate(true)
    // console.log("oooooo")
    try {
      const formData = new FormData()
      for (const key in data) {
        if (
          data.hasOwnProperty(key) &&
          data[key] !== undefined &&
          data[key] !== null &&
          data[key] !== "" &&
          key != "parameters" &&
          key != "price" &&
          key != "gallery_images"
        ) {
          formData.append(key, data[key])
        }
      }

      // console.log("Params submit => ", data)
      console.log("Params submit => ", formData)
      // formData.append("parameters[]", ...listParams)

      listParams.forEach((param, index) => {
        if (
          param.value !== null &&
          param.value !== undefined &&
          param.value !== ""
        ) {
          console.log("param.value => ", param.value)
          formData.append(`parameters[${index}][id]`, `${param.id}`)
          formData.append(`parameters[${index}][value]`, `${param.value}`)
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
        // navigate(pathRoutes.PROPERTIES.LIST)
      }
    } finally {
      setIsSubmitUserCreate(false)
    }
  }

  // Init Upload picture Title Image
  const [infoPicture, setInfoPicture] = React.useState<any>()
  const handleDeletePictureUser = () => {
    setValue("title_image", "")
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
  // End Upload picture Title Image

  // Init Upload picture 3D Image
  const [infoPicture3D, setInfoPicture3D] = React.useState<any>()
  const handleDeletePictureUser3D = () => {
    setValue("d_image", "")
    setInfoPicture3D("")
  }

  const onDrop3D = React.useCallback(
    (acceptedFiles: any, rejectedFiles: any) => {
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
            setInfoPicture3D(imageUrl)
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
    },
    [],
  )

  const {
    getRootProps: getRootProps3D,
    getInputProps: getInputProps3D,
    isDragActive: isDragActive3D,
  } = useDropzone({
    onDrop: onDrop3D,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxFiles: 1,
  })
  // End Upload picture 3D Image

  // Init Upload picture Gallery image
  const [listFiles, setListFiles] = React.useState<File[]>([]) // Inicializamos como un array vacío

  const onDropGallery = React.useCallback(
    (acceptedFiles: any, rejectedFiles: any) => {
      if (acceptedFiles.length > 0) {
        const updatedFiles = [...listFiles]
        acceptedFiles.forEach((file: any) => {
          // if (updatedFiles.length >= 5) {
          //   toast.error("Se permite un máximo de 5 archivos.")
          //   return
          // }
          updatedFiles.push(file)

          const reader = new FileReader()

          reader.onabort = () => toast.error("File reading was aborted")
          reader.onerror = () => toast.error("File reading has failed")
          reader.onload = () => {
            const binaryStr = reader.result
            if (binaryStr instanceof ArrayBuffer) {
              const blob = new Blob([binaryStr], { type: file.type })
              const imageUrl = URL.createObjectURL(blob)
              // Aquí puedes hacer algo con imageUrl, como agregarlo a un estado de URLs
            } else {
              toast.error("Error al leer el archivo.")
            }
          }
          reader.readAsArrayBuffer(file)
        })

        setValue("gallery_images", updatedFiles)
        setListFiles(updatedFiles)
      }

      if (rejectedFiles.length > 0) {
        toast.error(
          'Solo se permite un archivo y debe ser de tipo "PNG", "JPG" o "JPEG".',
        )
      }
    },
    [listFiles],
  )

  const {
    getRootProps: getRootPropsGallery,
    getInputProps: getInputPropsGallery,
    isDragActive: isDragActiveGallery,
  } = useDropzone({
    onDrop: onDropGallery,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  })

  const handleDeleteOneFile = React.useCallback(
    (fileToDelete: File) => {
      setListFiles(prevFiles => prevFiles.filter(file => file !== fileToDelete))
    },
    [listFiles],
  )

  React.useEffect(() => {
    setValue("gallery_images", listFiles)
  }, [listFiles])

  const handleChangeTypeProperty = (typeProperty: number) => () => {
    setValue("type_id", `${typeProperty}`)
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
                  register={register("title")}
                />
                {!!(errors.title as any)?.message && (
                  <ErrorMessage>{(errors.title as any)?.message}</ErrorMessage>
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
                  register={register("description")}
                />
                {!!(errors.description as any)?.message && (
                  <ErrorMessage>
                    {(errors.description as any)?.message}
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
                {!!(errors.description as any)?.message && (
                  <ErrorMessage>
                    {(errors.description as any)?.message}
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
                  register={register("price")}
                />
                {!!(errors.price as any)?.message && (
                  <ErrorMessage>{(errors.price as any)?.message}</ErrorMessage>
                )}
              </WrapperInput>
              <WrapperInput>
                <label htmlFor="owner-create-project">
                  Propietario
                  <span onClick={() => setOpenAddOwner(true)}>Crear</span>
                </label>
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
            </ContainerThreeInputs>
          </ContainerResFormStyles>
        </ResidentialFormStyles>

        <ResidentialFormStyles>
          <ContainerThreeInputs>
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
              {!!(errors.city as any)?.message && (
                <ErrorMessage>{(errors.city as any)?.message}</ErrorMessage>
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
              {!!(errors.municipality as any)?.message && (
                <ErrorMessage>
                  {(errors.municipality as any)?.message}
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
              {!!(errors.urbanization as any)?.message && (
                <ErrorMessage>
                  {(errors.urbanization as any)?.message}
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
                register={register("full_address")}
              />
              {!!(errors.full_address as any)?.message && (
                <ErrorMessage>
                  {(errors.full_address as any)?.message}
                </ErrorMessage>
              )}
            </WrapperInput>
          </ContainerOneInputs>
          <ContainerTwoInputs>
            <WrapperInput>
              <label htmlFor="plan-create-project">Plan</label>
              <Select
                id="plan-create-project"
                defaultValue={[{ value: 1, label: "Quarto" }]}
                onChange={() => {
                  setValue("plan_id", "1")
                }}
                options={[
                  {
                    value: 1,
                    label: "Quarto",
                  },
                ]}
                isSearchable={true}
                styles={selectStyles}
              />
              {!!(errors.city as any)?.message && (
                <ErrorMessage>{(errors.city as any)?.message}</ErrorMessage>
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
              {!!(errors.city as any)?.message && (
                <ErrorMessage>{(errors.city as any)?.message}</ErrorMessage>
              )}
            </WrapperInput>
          </ContainerTwoInputs>
        </ResidentialFormStyles>

        <ResidentialFormStyles>
          <ContainerTwoInputs>
            <CustomWrapperInputAvatar>
              <label htmlFor="picture-create-project">Imagen del titulo</label>
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
                      <p>Suelta la imagen aquí</p>
                    ) : (
                      <p>Arrastra o haz clic para cargar una imagen</p>
                    )}
                  </ContainerDragAndDropAvatar>
                )}
              </div>
              {!!(errors.title_image as any)?.message && (
                <ErrorMessage>
                  {(errors.title_image as any)?.message}
                </ErrorMessage>
              )}
            </CustomWrapperInputAvatar>
            <CustomWrapperInputAvatar>
              <label htmlFor="picture-create-project">Imagen 3D</label>
              <div>
                {!!infoPicture3D ? (
                  <ContainerImageAvatar>
                    <img src={infoPicture3D} />
                    <div onClick={handleDeletePictureUser3D}>
                      <Trash />
                    </div>
                  </ContainerImageAvatar>
                ) : (
                  <ContainerDragAndDropAvatar
                    {...getRootProps3D()}
                    isDragActive={isDragActive3D}
                  >
                    <CardImage />
                    <input {...getInputProps3D()} />
                    {isDragActive3D ? (
                      <p>Suelta la imagen aquí</p>
                    ) : (
                      <p>Arrastra o haz clic para cargar una imagen</p>
                    )}
                  </ContainerDragAndDropAvatar>
                )}
              </div>
              {!!(errors.title_image as any)?.message && (
                <ErrorMessage>
                  {(errors.title_image as any)?.message}
                </ErrorMessage>
              )}
            </CustomWrapperInputAvatar>
          </ContainerTwoInputs>
          <ContainerUploadFiles>
            <CustomWrapperInputFiles>
              <label htmlFor="picture-create-project">Files</label>
              <ContainerDragAndDropFiles
                {...getRootPropsGallery()}
                isDragActive={isDragActive}
              >
                <Files />
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop picture here</p>
                ) : (
                  <p>Drag or click this container to upload an image</p>
                )}
              </ContainerDragAndDropFiles>
              {!!(errors.gallery_images as any)?.message && (
                <ErrorMessage>
                  {(errors.gallery_images as any)?.message}
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
            </CustomWrapperInputFiles>
          </ContainerUploadFiles>
        </ResidentialFormStyles>

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
                    <label htmlFor={`${param.name}_create`}>{param.name}</label>
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

        <ContainerButton>
          {/* <button onClick={submitWrapper(handleSubmit)()}>aaa</button> */}
          <Button
            onClick={submitWrapper(handleSubmit)}
            text={"Crear"}
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
