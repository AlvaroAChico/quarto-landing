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
import { FormContainer } from "./modal-edit-apartment.styles"
import {
  ApartmentDTO,
  PropertyDTO,
} from "../../../../core/models/interfaces/property-model"
import {
  UpdateResidentialForm,
  UpdateResidentialSchema,
} from "../../../../core/models/schemas/property-schema"
import { ManagementCompanyDTO } from "../../../../core/models/interfaces/management-company"
import { setErrResponse } from "../../../../utils/erros-util"
import {
  UpdateApartmentForm,
  UpdateApartmentSchema,
} from "../../../../core/models/schemas/apartment-schema"
import { FolderOpen } from "styled-icons/fa-regular"
import Textarea from "../../../textarea/textarea"
import { TextDescription } from "@styled-icons/fluentui-system-filled/TextDescription"

interface IOwnProps {
  isOpen: boolean
  dataEdit: ApartmentDTO
  handleClose: () => void
  handleRefreshData: () => void
}

const ModalEditApartment: React.FC<IOwnProps> = ({
  isOpen,
  dataEdit,
  handleClose,
  handleRefreshData,
}) => {
  const [optionsCompany, setOptionsCompany] = React.useState<any>([])
  const [currentNameData, setCurrentNameData] = React.useState<string>("")
  const [selectedOptionRole, setSelectedOptionRole] =
    React.useState<Option | null>(null)
  const [isSubmitUserUpdate, setIsSubmitUserUpdate] =
    React.useState<boolean>(false)

  const { handleGetToken, handleGetPermissions } = useDataUser()
  const methods = useForm<UpdateApartmentForm>({
    resolver: yupResolver(UpdateApartmentSchema),
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

  const handleChangeOptionRole = (value: any) => {
    setValue("residentialId", value.value)
    setSelectedOptionRole(value)
  }

  React.useEffect(() => {
    const storedToken = handleGetToken()
    if (storedToken) {
      axios
        .get(`${settingsApp.api.base}/residentials`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          const listData: PropertyDTO[] = response.data as PropertyDTO[]
          // setListManagementCompany(listData)
          const listProperties = (listData || []).map(client => ({
            value: client.id,
            label: client.name,
          }))
          setOptionsCompany(listProperties.filter(property => !!property))
          setTimeout(() => {
            const selectedData = listData.filter(
              prop => prop.id == dataEdit.residentialId,
            )
            if (!!selectedData) {
              setCurrentNameData(`${selectedData[0].name}`)
            }
          }, 200)
        })
        .catch(err => {
          setErrResponse(err)
        })
    }
  }, [dataEdit])

  const handleSubmit = React.useCallback(
    (data: any) => {
      setIsSubmitUserUpdate(true)
      const storedToken = handleGetToken()
      if (!!storedToken) {
        const formData = new FormData()

        for (const key in data) {
          if (
            data.hasOwnProperty(key) &&
            data[key] !== undefined &&
            data[key] !== null &&
            data[key] !== ""
          ) {
            formData.append(key, data[key])
          }
        }

        if (formData.entries().next().done) {
          setIsSubmitUserUpdate(false)
          toast.warning("No changes were made")
          return
        }

        axios
          .patch(
            `${settingsApp.api.base}/apartments/${dataEdit.id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            },
          )
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
            setErrResponse(err)
          })
      }
    },
    [dataEdit],
  )

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
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Apartment">
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
          <label htmlFor="code-create-apartment">
            Code: <span>{dataEdit?.code}</span>
          </label>
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
          <label htmlFor="name-create-apartment">
            Name: <span>{dataEdit?.name}</span>
          </label>
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
            Description: <span>{dataEdit?.description}</span>
          </label>
          <Textarea
            id="description-create-apartment"
            placeholder="Enter description"
            icon={TextDescription}
            register={register("description")}
          />
          {!!(errors.description as any)?.message && (
            <ErrorMessage>{(errors.description as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="floornumber-create-apartment">
            Floor number: <span>{dataEdit?.floorNumber}</span>
          </label>
          <Input
            id="floornumber-create-apartment"
            placeholder="Enter floor number"
            icon={FolderOpen}
            register={register("floorNumber")}
          />
          {!!(errors.floorNumber as any)?.message && (
            <ErrorMessage>{(errors.floorNumber as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="company-create-property">
            Property:
            <span>{currentNameData}</span>
          </label>
          <Select
            defaultValue={selectedOptionRole}
            onChange={handleChangeOptionRole}
            options={optionsCompany}
            isSearchable={false}
            styles={selectStyles}
          />
          {!!(errors.residentialId as any)?.message && (
            <ErrorMessage>
              {(errors.residentialId as any)?.message}
            </ErrorMessage>
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

export default ModalEditApartment
