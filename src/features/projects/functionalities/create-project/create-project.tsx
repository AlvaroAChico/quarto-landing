import React from "react"
import HeaderSection from "../../../../components/header-section/header-section"
import {
  ContainerBodyCreate,
  ContainerButton,
  ContainerDragAndDrop,
  CustomWrapperInput,
  FormContainer,
} from "./create-project.styles"
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
  WrapperInput,
} from "../../../../config/theme/global-styles"
import Input from "../../../../components/input/input"
import { User } from "styled-icons/boxicons-solid"
import Button from "../../../../components/button/button"
import Cookies from "js-cookie"
import { COOKIES_APP } from "../../../../constants/app"
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
import { Currency } from "@styled-icons/remix-fill/Currency"
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

const CreateProject: React.FC = () => {
  const [optionsRoles, setOptionsRoles] = React.useState<any>([])
  const [selectedOptionRole, setSelectedOptionRole] = React.useState(null)
  const [startDate, setStartDate] = React.useState()
  const [dueDate, setDueDate] = React.useState()
  const [isSubmitUserCreate, setIsSubmitUserCreate] =
    React.useState<boolean>(false)
  const navigate = useNavigate()

  const { handleGetToken } = useDataUser()

  const methods = useForm<CreateProjectForm>({
    resolver: yupResolver(CreateProjectSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      startDate: "",
      dueDate: "",
      currency: "",
      price: "",
      clientId: "",
      categoryId: "",
      picture: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    setValue,
  } = methods

  const handleChangeOptionRole = (value: any) => {
    // setValue("role", value.value)
    setSelectedOptionRole(value)
  }

  const handleSubmit = React.useCallback((data: any) => {
    setIsSubmitUserCreate(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      const formData = new FormData()
      formData.append("code", data.code)
      formData.append("name", data.name)
      formData.append("description", data.description)
      formData.append("start_date", formatToDMYHH(data.startDate))
      formData.append("due_date", formatToDMYHH(data.dueDate))
      if (!!data.currency) {
        formData.append("currency", data.currency)
      }
      if (!!data.price) {
        formData.append("price", data.price)
      }
      if (!!data.clientId) {
        formData.append("client_id", data.clientId)
      }
      if (!!data.categoryId) {
        formData.append("category_id", data.categoryId)
      }
      if (!!data.picture) {
        formData.append("picture", data.picture)
      }

      axios
        .post(`${settingsApp.api.base}/projects`, formData, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            ContentType: "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          setIsSubmitUserCreate(false)
          const data: CreateUserResponseDTO =
            response.data as CreateUserResponseDTO
          if (!!data && !!data.message) {
            toast.success(data.message)
            navigate(pathRoutes.USERS.LIST)
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
        .get("http://localhost:3000/roles", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(response => {
          const listData: DataRoleResponse[] =
            response.data as DataRoleResponse[]
          setOptionsRoles(
            listData.map(role => ({
              value: "role",
              label: role.name,
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

  // Many files
  const [listFiles, setListFiles] = React.useState<any>()
  const handleDeleteOneFile = () => {
    // setValue("picture", "")
    // setInfoPicture("")
  }

  const onDropManyFiles = React.useCallback(
    (acceptedFiles: any, rejectedFiles: any) => {
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
    },
    [],
  )

  const {
    getRootProps: getRootPropsFiles,
    getInputProps: getInputPropsFiles,
    isDragActive: isDragActiveFiles,
  } = useDropzone({ onDropManyFiles })

  return (
    <ContainerBodyCreate>
      <HeaderSection title="Projects" subtitle="Create project" />
      <CustomWrapperInputAvatar>
        <label htmlFor="picture-create-project">Picture</label>
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
          <ErrorMessage>{(errors.picture as any)?.message}</ErrorMessage>
        )}
      </CustomWrapperInputAvatar>
      <FormContainer>
        <WrapperInput>
          <label htmlFor="code-create-project">Code</label>
          <Input
            id="code-create-project"
            placeholder="Enter code"
            icon={TextNumberFormat}
            props={register("code")}
          />
          {!!(errors.code as any)?.message && (
            <ErrorMessage>{(errors.code as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="name-create-project">Name</label>
          <Input
            id="name-create-project"
            placeholder="Enter name"
            icon={FolderOpen}
            props={register("name")}
          />
          {!!(errors.name as any)?.message && (
            <ErrorMessage>{(errors.name as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="description-create-project">Description</label>
          <Input
            id="description-create-project"
            placeholder="Enter description"
            icon={TextDescription}
            props={register("description")}
          />
          {!!(errors.description as any)?.message && (
            <ErrorMessage>{(errors.description as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="startdate-create-project">Start date</label>
          <DatePicker
            id="startdate-create-project"
            showIcon
            selected={startDate}
            icon={<Calendar />}
            toggleCalendarOnIconClick
            onChange={date => {
              setStartDate(date)
              setValue("startDate", date)
            }}
            placeholderText="Enter start date"
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
          {!!(errors.startDate as any)?.message && (
            <ErrorMessage>{(errors.startDate as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="duedate-create-project">Due date</label>
          <DatePicker
            id="duedate-create-project"
            showIcon
            selected={dueDate}
            icon={<CalendarCancel />}
            toggleCalendarOnIconClick
            onChange={date => {
              setDueDate(date)
              setValue("dueDate", date)
            }}
            placeholderText="Enter due date"
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
          {!!(errors.dueDate as any)?.message && (
            <ErrorMessage>{(errors.dueDate as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        {/* <WrapperInput>
          <label htmlFor="currency-create-project">Currency</label>
          <Input
            id="currency-create-project"
            placeholder="Enter currency"
            icon={Currency}
            props={register("currency")}
          />
          {!!(errors.currency as any)?.message && (
            <ErrorMessage>{(errors.currency as any)?.message}</ErrorMessage>
          )}
        </WrapperInput> */}
        <WrapperInput>
          <label htmlFor="price-create-project">Price</label>
          <Input
            id="price-create-project"
            placeholder="Enter price"
            icon={CurrencyDollar}
            type="number"
            props={register("price")}
          />
          {!!(errors.price as any)?.message && (
            <ErrorMessage>{(errors.price as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="client-create-project">Client</label>
          <Input
            id="client-create-project"
            placeholder="Enter client"
            icon={User}
            props={register("clientId")}
          />
          {!!(errors.clientId as any)?.message && (
            <ErrorMessage>{(errors.clientId as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="category-create-project">Category</label>
          <Input
            id="category-create-project"
            placeholder="Enter category"
            icon={Category}
            props={register("categoryId")}
          />
          {!!(errors.categoryId as any)?.message && (
            <ErrorMessage>{(errors.categoryId as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
      </FormContainer>
      <CustomWrapperInputFiles>
        <label htmlFor="picture-create-project">
          Picture
          {/* {!!namePathPicture && (
              <>
                : <span>{namePathPicture}</span>
              </>
            )} */}
        </label>
        <ContainerDragAndDropFiles
          {...getRootPropsFiles()}
          isDragActive={isDragActiveFiles}
        >
          <CardImage />
          <input {...getInputPropsFiles()} />
          {isDragActive ? (
            <p>Drop picture here</p>
          ) : (
            <p>Drag or click this container to upload an image</p>
          )}
        </ContainerDragAndDropFiles>
        {!!(errors.picture as any)?.message && (
          <ErrorMessage>{(errors.picture as any)?.message}</ErrorMessage>
        )}
      </CustomWrapperInputFiles>
      <ContainerButton>
        <Button
          onClick={submitWrapper(handleSubmit)}
          text="Create Project"
          isLoading={isSubmitUserCreate}
        />
      </ContainerButton>
    </ContainerBodyCreate>
  )
}

export default CreateProject
