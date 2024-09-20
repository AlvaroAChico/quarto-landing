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
} from "./create-apartment.styles"
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
import {
  CreateServiceForm,
  CreateServiceSchema,
} from "../../../../core/models/schemas/service-schema"
import Textarea from "../../../../components/textarea/textarea"
import { MessageResponsedDTO } from "../../../../core/models/interfaces/general-model"
import { PropertyDTO } from "../../../../core/models/interfaces/property-model"

const CreateApartment: React.FC = () => {
  const [optionsProperties, setOptionsProperties] = React.useState<any>([])
  const [stepActive, setStepActive] = React.useState<number>(1)
  const [selectedOptionClient, setSelectedOptionClient] = React.useState(null)
  const [startDate, setStartDate] = React.useState<any>()
  const [dueDate, setDueDate] = React.useState()
  const [isSubmitUserCreate, setIsSubmitUserCreate] =
    React.useState<boolean>(false)
  const navigate = useNavigate()

  const { handleGetToken } = useDataUser()

  const methods = useForm<CreateApartmentForm>({
    resolver: yupResolver(CreateApartmentSchema),
    defaultValues: {
      picture: "",
      code: "",
      name: "",
      description: "",
      floorNumber: "",
      residentialId: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    setValue,
  } = methods

  const methodsServ = useForm<CreateServiceForm>({
    resolver: yupResolver(CreateServiceSchema),
    defaultValues: {
      picture: "",
      code: "",
      name: "",
      description: "",
      floorNumber: "",
      residentialId: "",
    },
  })

  const {
    handleSubmit: submitWrapperServ,
    formState: { errors: errorsServ },
    register: registerServ,
    setValue: setValueServ,
  } = methodsServ

  const handleChangeOptionClient = (value: any) => {
    // setValue("clientId", value.value)
    setSelectedOptionClient(value)
    setValue("residentialId", value.value)
  }

  const handleSubmit = React.useCallback((data: any) => {
    setIsSubmitUserCreate(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      const formData = new FormData()
      formData.append("code", data.code)
      formData.append("name", data.name)
      formData.append("description", data.description)
      formData.append("floor_number", data.floorNumber)
      formData.append("residential_id", data.residentialId)
      if (!!data.picture) {
        formData.append("picture", data.picture)
      }

      axios
        .post(`${settingsApp.api.base}/apartments`, formData, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            ContentType: "multipart/form-data",
            Accept: "multipart/form-data",
          },
        })
        .then(response => {
          setIsSubmitUserCreate(false)
          const data: MessageResponsedDTO = response.data as MessageResponsedDTO
          if (!!data && !!data.message) {
            toast.success(data.message)
            navigate(pathRoutes.APARTMENTS.LIST)
          }
        })
        .catch(err => {
          setIsSubmitUserCreate(false)
          toast.error("Failed to authenticate")
        })
    }
  }, [])

  React.useEffect(() => {
    const storedToken = handleGetToken()

    if (!!storedToken) {
      axios
        .get(`${settingsApp.api.base}/residentials`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(response => {
          const listData: PropertyDTO[] = response.data as PropertyDTO[]
          setOptionsProperties(
            listData.map(client => ({
              value: client.id,
              label: client.name,
            })),
          )
        })
        .catch(err => {
          toast.error("Failed to fetch data")
        })
    }
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
      <HeaderSection title="Residentials" subtitle="Create residential" />
      <ContainerStepperCreate>
        <SteppersStyles>
          <ItemStepper isActive={stepActive == 1}>
            <div>
              <span onClick={() => setStepActive(1)}>1</span>
            </div>
            <span>Details</span>
            <span />
          </ItemStepper>
          <ItemStepper isActive={stepActive == 2}>
            <span />
          </ItemStepper>
          {/* <ItemStepper isActive={stepActive == 2}>
            <div>
              <span onClick={() => setStepActive(2)}>2</span>
            </div>
            <span>Apartments</span>
            <span />
          </ItemStepper> */}
          {/* <ItemStepper isActive={stepActive == 2}>
            <div>
              <span onClick={() => setStepActive(2)}>2</span>
            </div>
            <span>Services</span>
          </ItemStepper> */}
        </SteppersStyles>
        {stepActive == 1 && (
          <ResidentialFormStyles>
            <ContainerUpInputs>
              <CustomWrapperInputAvatar>
                <label htmlFor="picture-create-project">Apartment Logo</label>
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
                  <label htmlFor="code-create-apartment">Code</label>
                  <Input
                    id="code-create-apartment"
                    placeholder="Enter code"
                    icon={FolderOpen}
                    register={register("code")}
                  />
                  {!!(errors.code as any)?.message && (
                    <ErrorMessage>{(errors.code as any)?.message}</ErrorMessage>
                  )}
                </WrapperInput>
                <WrapperInput>
                  <label htmlFor="name-create-apartment">Name</label>
                  <Input
                    id="name-create-apartment"
                    placeholder="Enter name"
                    icon={FolderOpen}
                    register={register("name")}
                  />
                  {!!(errors.code as any)?.message && (
                    <ErrorMessage>{(errors.code as any)?.message}</ErrorMessage>
                  )}
                </WrapperInput>
                <WrapperInput>
                  <label htmlFor="description-create-apartment">
                    Description
                  </label>
                  <Textarea
                    id="description-create-apartment"
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
                <label htmlFor="floornumber-create-apartment">
                  Floor number
                </label>
                <Input
                  id="floornumber-create-apartment"
                  placeholder="Enter floor number"
                  icon={FolderOpen}
                  register={register("floorNumber")}
                />
                {!!(errors.floorNumber as any)?.message && (
                  <ErrorMessage>
                    {(errors.floorNumber as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
              <WrapperInput>
                <label htmlFor="property-create-project">Property</label>
                <Select
                  id="property-create-project"
                  defaultValue={selectedOptionClient}
                  onChange={handleChangeOptionClient}
                  options={optionsProperties}
                  isSearchable={true}
                  styles={selectStyles}
                />
                {!!(errors.residentialId as any)?.message && (
                  <ErrorMessage>
                    {(errors.residentialId as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
            </ContainerDownInputs>
          </ResidentialFormStyles>
        )}
        {stepActive == 2 && (
          <ResidentialFormStyles>
            {/* <ContainerUpInputs>
              <ContainerResFormStyles>
                <WrapperInput>
                  <label htmlFor="service-create-apartment">Service</label>
                  <Select
                    id="service-create-apartment"
                    defaultValue={selectedOptionClient}
                    onChange={handleChangeOptionClient}
                    options={optionsClients}
                    isSearchable={true}
                    styles={selectStyles}
                  />
                  {!!(errorsServ.serviceId as any)?.message && (
                    <ErrorMessage>
                      {(errorsServ.serviceId as any)?.message}
                    </ErrorMessage>
                  )}
                </WrapperInput>
                <WrapperInput>
                  <label htmlFor="contractor-create-apartment">
                    Contractor
                  </label>
                  <Select
                    id="contractor-create-apartment"
                    defaultValue={selectedOptionClient}
                    onChange={handleChangeOptionClient}
                    options={optionsClients}
                    isSearchable={true}
                    styles={selectStyles}
                  />
                  {!!(errorsServ.contractorId as any)?.message && (
                    <ErrorMessage>
                      {(errorsServ.contractorId as any)?.message}
                    </ErrorMessage>
                  )}
                </WrapperInput>
                <WrapperInput>
                  <label htmlFor="date-create-apartment">Date</label>
                  <DatePicker
                    id="date-create-apartment"
                    showIcon
                    selected={startDate}
                    icon={<Calendar />}
                    toggleCalendarOnIconClick
                    onChange={(date: any) => {
                      setStartDate(date)
                      setValueServ("date", date)
                    }}
                    placeholderText="Enter date"
                    popperClassName="some-custom-class"
                    popperPlacement="top-end"
                    popperModifiers={[
                      {
                        name: "myModifier",
                        fn(state) {
                          // Do something with the state
                          return state
                        },
                      },
                    ]}
                  />
                  {!!(errorsServ.date as any)?.message && (
                    <ErrorMessage>
                      {(errorsServ.date as any)?.message}
                    </ErrorMessage>
                  )}
                </WrapperInput>
              </ContainerResFormStyles> 
            </ContainerUpInputs> */}
            {/* <ContainerDownInputs>
              <WrapperInput>
                <label htmlFor="service-create-service">Service</label>
                <Textarea
                  id="service-create-service"
                  placeholder="Enter notes"
                  icon={FolderOpen}
                  register={registerServ("notes")}
                />
                {!!(errorsServ.notes as any)?.message && (
                  <ErrorMessage>
                    {(errorsServ.notes as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
              <CustomWrapperInputFiles>
                <label htmlFor="picture-create-project">Files</label>
                <ContainerDragAndDropFiles
                  {...getRootPropsFiles()}
                  isDragActive={isDragActiveFiles}
                >
                  <Files />
                  <input {...getInputPropsFiles()} />
                  {isDragActive ? (
                    <p>Drop picture here</p>
                  ) : (
                    <p>Drag or click this container to upload an image</p>
                  )}
                </ContainerDragAndDropFiles>
                {!!(errors.picture as any)?.message && (
                  <ErrorMessage>
                    {(errors.picture as any)?.message}
                  </ErrorMessage>
                )}
                <div>{JSON.stringify(listFiles)}</div>
                <div>
                  {listFiles.length > 0 &&
                    (listFiles || []).map(file => (
                      <div>
                        <p>{file.size}</p>
                        <p>{file.name}</p>
                        <p>{file.type}</p>
                        <p>{file.lastModified}</p>
                        <p>{file.webkitRelativePath}</p>
                      </div>
                    ))}
                </div>
              </CustomWrapperInputFiles>
            </ContainerDownInputs> */}
          </ResidentialFormStyles>
        )}
        {/* {stepActive == 3 && <>A</>} */}
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

export default CreateApartment
