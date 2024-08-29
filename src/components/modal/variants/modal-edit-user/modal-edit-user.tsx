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
  UserDTO,
} from "../../../../core/models/interfaces/user-model"
import { FormContainer } from "./modal-edit-user.styles"
import {
  ContainerDragAndDropAvatar,
  ContainerImageAvatar,
  CustomWrapperInputAvatar,
  ErrorMessage,
  selectStyles,
  WrapperInput,
} from "../../../../config/theme/global-styles"
import { User } from "styled-icons/boxicons-solid"
import { palette } from "../../../../config/theme/theme"
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

interface IOwnProps {
  isOpen: boolean
  dataUserEdit: UserDTO
  handleClose: () => void
}

const ModalEditUser: React.FC<IOwnProps> = ({
  isOpen,
  dataUserEdit,
  handleClose,
}) => {
  const [optionsRoles, setOptionsRoles] = React.useState<any>([])
  const [selectedOptionRole, setSelectedOptionRole] = React.useState(null)
  const [isSubmitUserUpdate, setIsSubmitUserUpdate] =
    React.useState<boolean>(false)

  const { handleGetToken } = useDataUser()

  const methods = useForm<UpdateUserForm>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: {
      firstName: !!dataUserEdit ? dataUserEdit.firstName : "",
      lastName: !!dataUserEdit ? dataUserEdit.lastName : "",
      contactNumber: "",
      email: !!dataUserEdit ? dataUserEdit.email : "",
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
    setIsSubmitUserUpdate(true)
    axios
      .post("http://localhost:3000/users/update", {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      })
      .then(response => {
        setIsSubmitUserUpdate(false)
        const data: CreateUserDTO = response.data as CreateUserDTO
        // if (!!data && data == 200 && !!data.data) {
        //   toast.success(data.message)
        // }
      })
      .catch(err => {
        setIsSubmitUserUpdate(false)
        toast.error("Failed to authenticate")
      })
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

  React.useEffect(() => {
    if (!!dataUserEdit) {
      setValue("firstName", dataUserEdit.firstName)
      setValue("lastName", dataUserEdit.lastName)
      setValue("email", dataUserEdit.email)
      // setValue("role", dataUserEdit.role)
      // setSelectedOptionRole({
      //   value: dataUserEdit.role.uuid,
      //   label: dataUserEdit.role.name,
      // })
    }
  }, [dataUserEdit])

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
          text="Create User"
          isLoading={isSubmitUserUpdate}
        />
      </FormContainer>
    </Modal>
  )
}

export default ModalEditUser
