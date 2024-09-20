import React from "react"
import Modal from "../../modal"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  UpdateUserForm,
  UpdateUserSchema,
} from "../../../../core/models/schemas/user-schema"
import {
  CreateUserDTO,
  Option,
  UserDTO,
} from "../../../../core/models/interfaces/user-model"
import {
  ContainerDragAndDropAvatar,
  ContainerImageAvatar,
  CustomWrapperInputAvatar,
  ErrorMessage,
  selectStyles,
  WrapperInput,
} from "../../../../config/theme/global-styles"
import { User } from "styled-icons/boxicons-solid"
import Button from "../../../button/button"
import Input from "../../../input/input"
import Select from "react-select"
import axios from "axios"
import { toast } from "sonner"
import { DataRoleResponse } from "../../../../core/models/interfaces/roles-model"
import useDataUser from "../../../../utils/use-data-user"
import { Trash } from "@styled-icons/ionicons-solid/Trash"
import { CardImage } from "@styled-icons/bootstrap/CardImage"
import { useDropzone } from "react-dropzone"
import { settingsApp } from "../../../../config/environment/settings"
import { Password } from "@styled-icons/material-twotone/Password"
import { EyeFill, EyeSlashFill } from "@styled-icons/bootstrap"
import { FormContainer } from "./modal-edit-user.styles"

interface IOwnProps {
  isOpen: boolean
  dataUserEdit: UserDTO
  handleClose: () => void
  handleRefreshData: () => void
}

const ModalEditUser: React.FC<IOwnProps> = ({
  isOpen,
  dataUserEdit,
  handleClose,
  handleRefreshData,
}) => {
  const [optionsRoles, setOptionsRoles] = React.useState<any>([])
  const [selectedOptionRole, setSelectedOptionRole] =
    React.useState<Option | null>(null)
  const [isSubmitUserUpdate, setIsSubmitUserUpdate] =
    React.useState<boolean>(false)

  const { handleGetToken, handleGetPermissions } = useDataUser()
  const methods = useForm<UpdateUserForm>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      contactNumber: "",
      email: "",
      role: "",
      password: "",
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

  React.useEffect(() => {
    if (!!dataUserEdit) {
      setValue("id", `${dataUserEdit.id}`)
      setValue("firstName", dataUserEdit.firstName)
      setValue("lastName", dataUserEdit.lastName)
      setValue("contactNumber", dataUserEdit.contactNumber)
      setValue("role", dataUserEdit.role[0].name)
      setValue("email", dataUserEdit.email)
      setValue("picture", dataUserEdit.picture)
    }
  }, [dataUserEdit])

  const hasParamsFormData = (formData: FormData): boolean => {
    var nroValue = 0
    for (const [key, value] of formData.entries()) {
      if (value !== "" || value !== null || value !== undefined) {
        nroValue++
      }
      console.log("Value FormData -> ", value)
    }
    return nroValue > 0
  }

  const handleSubmit = React.useCallback((data: any) => {
    setIsSubmitUserUpdate(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      const formData = new FormData()
      // formData.append("_method", "PATCH")
      formData.append("first_name", data.firstName)
      formData.append("last_name", data.lastName)
      formData.append("contact_number", data.contactNumber)
      formData.append("role", data.role)
      formData.append("email", data.email)
      if (!!data.password && data.password != "") {
        formData.append("password", data.password)
      }
      if (infoPicture != "") {
        formData.append("picture", data.picture)
      }

      axios
        .patch(`${settingsApp.api.base}/users/${data.id}`, formData, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            ContentType: "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          setIsSubmitUserUpdate(false)
          console.log("Response data -> ", response.data)
          const data: UserDTO = response.data as UserDTO
          if (!!data && !!data.id) {
            toast.success("User successfully updated")
            handleRefreshData()
            handleClose()
          }
        })
        .catch(err => {
          setIsSubmitUserUpdate(false)
          toast.error("Failed to authenticate")
        })
    }
  }, [])

  React.useEffect(() => {
    const storedToken = handleGetToken()
    const dataPermissions = handleGetPermissions()

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
          const listRoles = (listData || []).map(data => ({
            value: data.name,
            label: data.name,
          }))
          setOptionsRoles(listRoles.filter(role => !!role))
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
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit User">
      <FormContainer>
        <CustomWrapperInputAvatar>
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
            register={register("firstName")}
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
            register={register("lastName")}
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
            register={register("contactNumber")}
          />
          {!!(errors.contactNumber as any)?.message && (
            <ErrorMessage>
              {(errors.contactNumber as any)?.message}
            </ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="password-create-user">Password</label>
          <Input
            placeholder="Password"
            icon={Password}
            type="password"
            toggleIcon={{ Show: EyeFill, Hide: EyeSlashFill }}
            register={register("password")}
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
            styles={selectStyles}
          />
          {!!(errors.role as any)?.message && (
            <ErrorMessage>{(errors.role as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <Button
          onClick={submitWrapper(handleSubmit)}
          text="Update User"
          isLoading={isSubmitUserUpdate}
        />
      </FormContainer>
    </Modal>
  )
}

export default ModalEditUser
