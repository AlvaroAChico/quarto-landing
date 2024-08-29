import React from "react"
import HeaderSection from "../../../../components/header-section/header-section"
import {  FormContainer } from "./create-user.styles"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  CreateUserForm,
  CreateUserSchema,
} from "../../../../core/models/schemas/user-schema"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import {
  CreateUserResponseDTO,
} from "../../../../core/models/interfaces/user-model"
import { pathRoutes } from "../../../../config/routes/path"
import {
  ContainerDragAndDropAvatar,
  ContainerImageAvatar,
  CustomWrapperInputAvatar,
  ErrorMessage,
  WrapperInput,
} from "../../../../config/theme/global-styles"
import Input from "../../../../components/input/input"
import { User } from "styled-icons/boxicons-solid"
import { Password } from "@styled-icons/material-twotone/Password"
import { EyeFill, EyeSlashFill } from "@styled-icons/bootstrap"
import Button from "../../../../components/button/button"
import { DataRoleResponse } from "../../../../core/models/interfaces/roles-model"
import { palette } from "../../../../config/theme/theme"
import Select from "react-select"
import useDataUser from "../../../../utils/use-data-user"
import { settingsApp } from "../../../../config/environment/settings"
import { CardImage } from "@styled-icons/bootstrap/CardImage"
import { Trash } from "@styled-icons/ionicons-solid/Trash"
import { useDropzone } from "react-dropzone"

const CreateUser: React.FC = () => {
  const [optionsRoles, setOptionsRoles] = React.useState<any>([])
  const [selectedOptionRole, setSelectedOptionRole] = React.useState(null)
  const [isSubmitUserCreate, setIsSubmitUserCreate] =
    React.useState<boolean>(false)
  const navigate = useNavigate()

  const { handleGetToken } = useDataUser()

  const methods = useForm<CreateUserForm>({
    resolver: yupResolver(CreateUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      contactNumber: "",
      email: "",
      password: "",
      role: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    setValue,
  } = methods

  const handleChangeOptionRole = (value: any) => {
    setValue("role", value.value)
    setSelectedOptionRole(value)
  }

  const handleSubmit = React.useCallback((data: any) => {
    setIsSubmitUserCreate(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      const formData = new FormData()
      formData.append("first_name", data.firstName)
      formData.append("last_name", data.lastName)
      formData.append("email", data.email)
      formData.append("contact_number", data.contactNumber)
      formData.append("picture", data.picture)
      formData.append("role", data.role)
      formData.append("password", data.password)
      axios
        .post(`${settingsApp.api.base}/users`, formData, {
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
        .get(`${settingsApp.api.base}/roles`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(response => {
          const listData: DataRoleResponse[] =
            response.data as DataRoleResponse[]
          setOptionsRoles(
            listData.map(role => ({
              value: role.name,
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

  return (
    <div>
      <HeaderSection title="Users" subtitle="Create user" />
      <FormContainer>
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
        <WrapperInput>
          <label htmlFor="firstname-create-user">First Name</label>
          <Input
            id="firstname-create-user"
            placeholder="Enter firstname"
            icon={User}
            props={register("firstName")}
          />
          {!!(errors.firstName as any)?.message && (
            <ErrorMessage>{(errors.firstName as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="lastname-create-user">Last Name</label>
          <Input
            id="lastname-create-user"
            placeholder="Enter lastname"
            icon={User}
            props={register("lastName")}
          />
          {!!(errors.lastName as any)?.message && (
            <ErrorMessage>{(errors.lastName as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="contactnumber-create-user">Contact Number</label>
          <Input
            id="contactnumber-create-user"
            placeholder="Enter contact number"
            icon={User}
            type="number"
            props={register("contactNumber")}
          />
          {!!(errors.contactNumber as any)?.message && (
            <ErrorMessage>
              {(errors.contactNumber as any)?.message}
            </ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="email-create-user">Email</label>
          <Input
            id="email-create-user"
            placeholder="Enter email"
            icon={User}
            props={register("email")}
          />
          {!!(errors.email as any)?.message && (
            <ErrorMessage>{(errors.email as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="password-create-user">Password</label>
          <Input
            placeholder="Password"
            icon={Password}
            type="password"
            toggleIcon={{ Show: EyeFill, Hide: EyeSlashFill }}
            props={register("password")}
          />
          {!!(errors.password as any)?.message && (
            <ErrorMessage>{(errors.password as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="password-create-user">Role</label>
          <Select
            defaultValue={selectedOptionRole}
            onChange={handleChangeOptionRole}
            options={optionsRoles}
            isSearchable={false}
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderColor: state.isFocused ? "#f59e36" : provided.borderColor,
                boxShadow: state.isFocused
                  ? "0 0 5px #f59e36"
                  : provided.boxShadow,
                "&:hover": {
                  borderColor: state.isFocused ? "#f59e36" : "gray", // color al pasar el ratón
                },
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused
                  ? palette.primaryColor
                  : "white",
                color: state.isSelected ? "black" : "black",
                "&:hover": {
                  backgroundColor: palette.primaryColor,
                  color: "white",
                },
              }),
            }}
          />
          {!!(errors.role as any)?.message && (
            <ErrorMessage>{(errors.role as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <Button
          onClick={submitWrapper(handleSubmit)}
          text="Create User"
          isLoading={isSubmitUserCreate}
        />
      </FormContainer>
    </div>
  )
}

export default CreateUser
