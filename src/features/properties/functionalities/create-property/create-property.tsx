import React from "react"
import HeaderSection from "../../../../components/header-section/header-section"
import {
  ContainerBodyCreate,
  ContainerButton,
  ContainerDownInputs,
  ContainerResFormStyles,
  ContainerStepperCreate,
  ContainerUpInputs,
  FormContainer,
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
import { pathRoutes } from "../../../../config/routes/path"
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
import { DataRoleResponse } from "../../../../core/models/interfaces/roles-model"
import {
  CreateProjectForm,
  CreateProjectSchema,
} from "../../../../core/models/schemas/project-schema"
import { TextNumberFormat } from "@styled-icons/fluentui-system-filled/TextNumberFormat"
import { FolderOpen } from "@styled-icons/fa-regular/FolderOpen"
import { TextDescription } from "@styled-icons/fluentui-system-filled/TextDescription"
import { Calendar } from "@styled-icons/bootstrap/Calendar"
import { CalendarCancel } from "@styled-icons/fluentui-system-regular/CalendarCancel"
import { CurrencyDollar } from "@styled-icons/bootstrap/CurrencyDollar"
import { Category } from "@styled-icons/boxicons-solid/Category"
import { CardImage } from "@styled-icons/bootstrap/CardImage"
import { useDropzone } from "react-dropzone"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { settingsApp } from "../../../../config/environment/settings"
import useDataUser from "../../../../utils/use-data-user"
import { formatToDMYHH } from "../../../../utils/date-util"
import { Trash } from "@styled-icons/ionicons-solid/Trash"
import { Files } from "@styled-icons/simple-icons/Files"
import { ClientDTO } from "../../../../core/models/interfaces/client-model"
import Select from "react-select"
import {
  CreateResidentialForm,
  CreateResidentialSchema,
} from "../../../../core/models/schemas/property-schema"
import {
  CreateApartmentForm,
  CreateApartmentSchema,
} from "../../../../core/models/schemas/apartment-schema"
import Textarea from "../../../../components/textarea/textarea"
import { ManagementCompanyDTO } from "../../../../core/models/interfaces/management-company"

const CreateProperty: React.FC = () => {
  const [optionsCompany, setOptionsCompany] = React.useState<any>([])
  const [stepActive, setStepActive] = React.useState<number>(1)
  const [selectedOptionClient, setSelectedOptionClient] = React.useState(null)
  const [startDate, setStartDate] = React.useState<any>()
  const [dueDate, setDueDate] = React.useState()
  const [isSubmitUserCreate, setIsSubmitUserCreate] =
    React.useState<boolean>(false)
  const navigate = useNavigate()
  const { handleGetToken } = useDataUser()

  const methods = useForm<CreateResidentialForm>({
    resolver: yupResolver(CreateResidentialSchema),
    defaultValues: {
      picture: "",
      name: "",
      description: "",
      address: "",
      phoneProperty: "",
      managementCompanyId: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    setValue,
  } = methods

  const handleChangeOptionClient = (value: any) => {
    // setValue("clientId", value.value)
    setSelectedOptionClient(value)
    setValue("managementCompanyId", value.value)
  }

  const handleSubmit = React.useCallback((data: any) => {
    setIsSubmitUserCreate(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("description", data.description)
      formData.append("phone_number", data.phoneProperty)
      formData.append("address", data.address)
      formData.append("management_company_id", data.managementCompanyId)
      if (!!data.picture) {
        formData.append("picture", data.picture)
      }
      // if (!!data.files && listFiles.length > 0) {
      //   formData.append("files", data.files)
      // }

      axios
        .post(`${settingsApp.api.base}/residentials`, formData, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            ContentType: "multipart/form-data",
            Accept: "multipart/form-data",
          },
        })
        .then(response => {
          setIsSubmitUserCreate(false)
          const data: CreateUserResponseDTO =
            response.data as CreateUserResponseDTO
          if (!!data && !!data.message) {
            toast.success(data.message)
            navigate(pathRoutes.PROPERTIES.LIST)
          }
        })
        .catch(err => {
          setIsSubmitUserCreate(false)
          console.log("err => ", err)
          toast.error("Failed to authenticate")
        })
    }
  }, [])
  // const [listManagementCompany, setListManagementCompany] = React.useState<
  //   ManagementCompanyDTO[]
  // >([])
  const fetchListRole = React.useCallback(() => {
    const storedToken = handleGetToken()
    if (storedToken) {
      axios
        .get(`${settingsApp.api.base}/management_companies`, {
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
          setOptionsCompany(listProperties.filter(propertu => !!propertu))
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
    setValue("picture", "")
    setInfoPicture("")
  }

  const onDrop = React.useCallback((acceptedFiles: any, rejectedFiles: any) => {
    if (acceptedFiles.length > 0) {
      if (acceptedFiles.length > 1) {
        toast.error("Solo se permite un archivo.")
        return
      }
      const file = acceptedFiles[0]
      setValue("picture", file)

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
      console.log("rejectedFiles -> ", rejectedFiles)
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

  const [listFiles, setListFiles] = React.useState<File[]>([]) // Inicializamos como un array vacío

  const handleDeleteOneFile = (fileToDelete: File) => {
    // Filtramos la lista para eliminar el archivo seleccionado
    setListFiles(prevFiles => prevFiles.filter(file => file !== fileToDelete))
  }

  const onDropManyFiles = React.useCallback(
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

        // setValue("files", updatedFiles)
        setListFiles(updatedFiles)
      }

      if (rejectedFiles.length > 0) {
        console.log("rejectedFiles -> ", rejectedFiles)
        toast.error(
          'Solo se permite un archivo y debe ser de tipo "PNG", "JPG" o "JPEG".',
        )
      }
    },
    [listFiles],
  )

  const {
    getRootProps: getRootPropsFiles,
    getInputProps: getInputPropsFiles,
    isDragActive: isDragActiveFiles,
  } = useDropzone({ onDrop: onDropManyFiles })

  return (
    <>
      <HeaderSection title="Property" subtitle="Create property" />
      <ContainerStepperCreate>
        <SteppersStyles>
          <ItemStepper isActive={stepActive == 1}>
            <div>
              <span onClick={() => setStepActive(1)}>1</span>
            </div>
            <span>Details</span>
            <span />
          </ItemStepper>
          <ItemStepper isActive={false}>
            <span />
          </ItemStepper>
        </SteppersStyles>
        {stepActive == 1 && (
          <ResidentialFormStyles>
            <ContainerUpInputs>
              <CustomWrapperInputAvatar>
                <label htmlFor="picture-create-project">Residential Logo</label>
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
              </CustomWrapperInputAvatar>
              <ContainerResFormStyles>
                <WrapperInput>
                  <label htmlFor="name-create-project">Name</label>
                  <Input
                    id="name-create-project"
                    placeholder="Enter name"
                    icon={FolderOpen}
                    register={register("name")}
                  />
                  {!!(errors.name as any)?.message && (
                    <ErrorMessage>{(errors.name as any)?.message}</ErrorMessage>
                  )}
                </WrapperInput>
                <WrapperInput>
                  <label htmlFor="description-create-project">
                    Description
                  </label>
                  <Textarea
                    id="description-create-project"
                    placeholder="Enter description"
                    icon={TextDescription}
                    register={register("description")}
                  />
                  {!!(errors.description as any)?.message && (
                    <ErrorMessage>
                      {(errors.description as any)?.message}
                    </ErrorMessage>
                  )}
                </WrapperInput>
              </ContainerResFormStyles>
            </ContainerUpInputs>
            <ContainerDownInputs>
              <WrapperInput>
                <label htmlFor="address-create-project">Address</label>
                <Input
                  id="address-create-project"
                  placeholder="Enter address"
                  icon={FolderOpen}
                  register={register("address")}
                />
                {!!(errors.address as any)?.message && (
                  <ErrorMessage>
                    {(errors.address as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
              <WrapperInput>
                <label htmlFor="phone-manager-create-project">
                  Phone property
                </label>
                <Input
                  id="phone-manager-create-project"
                  placeholder="Enter phone manager"
                  icon={FolderOpen}
                  register={register("phoneProperty")}
                />
                {!!(errors.phoneProperty as any)?.message && (
                  <ErrorMessage>
                    {(errors.phoneProperty as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
              <WrapperInput>
                <label htmlFor="client-create-project">
                  Management Company
                </label>
                <Select
                  id="client-create-project"
                  defaultValue={selectedOptionClient}
                  onChange={handleChangeOptionClient}
                  options={optionsCompany}
                  isSearchable={true}
                  styles={selectStyles}
                />
                {!!(errors.managementCompanyId as any)?.message && (
                  <ErrorMessage>
                    {(errors.managementCompanyId as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
            </ContainerDownInputs>
          </ResidentialFormStyles>
        )}
        <ContainerButton>
          <Button
            onClick={submitWrapper(handleSubmit)}
            text="Create"
            isLoading={isSubmitUserCreate}
          />
        </ContainerButton>
      </ContainerStepperCreate>
    </>
  )
}

export default CreateProperty
