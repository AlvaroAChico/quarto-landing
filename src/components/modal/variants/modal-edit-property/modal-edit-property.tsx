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
import { FormContainer } from "./modal-edit-property.styles"
import { PropertyDTO } from "../../../../core/models/interfaces/property-model"
import {
  UpdateResidentialForm,
  UpdateResidentialSchema,
} from "../../../../core/models/schemas/property-schema"
import { ManagementCompanyDTO } from "../../../../core/models/interfaces/management-company"
import { setErrResponse } from "../../../../utils/erros-util"

interface IOwnProps {
  isOpen: boolean
  dataEdit: PropertyDTO
  handleClose: () => void
  handleRefreshData: () => void
}

const ModalEditProperty: React.FC<IOwnProps> = ({
  isOpen,
  dataEdit,
  handleClose,
  handleRefreshData,
}) => {
  const [optionsCompany, setOptionsCompany] = React.useState<any>([])
  const [selectedOptionRole, setSelectedOptionRole] =
    React.useState<Option | null>(null)
  const [isSubmitUserUpdate, setIsSubmitUserUpdate] =
    React.useState<boolean>(false)

  const { handleGetToken, handleGetPermissions } = useDataUser()
  const methods = useForm<UpdateResidentialForm>({
    resolver: yupResolver(UpdateResidentialSchema),
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

  const handleChangeOptionRole = (value: any) => {
    setValue("managementCompanyId", value.value)
    setSelectedOptionRole(value)
  }

  React.useEffect(() => {
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
          setOptionsCompany(listProperties.filter(property => !!property))
          setTimeout(() => {
            const selectedData = listData.filter(
              prop => prop.id == dataEdit.managementCompanyId,
            )
            if (!!selectedData) {
              setSelectedOptionRole({
                value: `${selectedData[0].id}`,
                label: selectedData[0].name,
              })
            }
          }, 200)
        })
        .catch(err => {
          toast.error("Failed to fetch data")
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
            `${settingsApp.api.base}/residentials/${dataEdit.id}`,
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
          <label htmlFor="name-create-property">
            Name: <span>{dataEdit?.name}</span>
          </label>
          <Input
            id="name-create-property"
            placeholder="Enter name"
            icon={User}
            register={register("name")}
          />
          {!!(errors.name as any)?.message && (
            <ErrorMessage>{(errors.name as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="description-create-property">
            Description: <span>{dataEdit?.description}</span>
          </label>
          <Input
            id="description-create-property"
            placeholder="Enter description"
            icon={User}
            register={register("description")}
          />
          {!!(errors.description as any)?.message && (
            <ErrorMessage>{(errors.description as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="address-create-property">
            Address: <span>{dataEdit?.address}</span>
          </label>
          <Input
            id="address-create-property"
            placeholder="Enter contact number"
            icon={User}
            register={register("address")}
          />
          {!!(errors.address as any)?.message && (
            <ErrorMessage>{(errors.address as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="phoneProperty-create-property">
            Phone Property: <span>{dataEdit?.phoneNumber}</span>
          </label>
          <Input
            id="phoneProperty-create-property"
            placeholder="Enter phone property"
            icon={User}
            type="number"
            register={register("phoneProperty")}
          />
          {!!(errors.phoneProperty as any)?.message && (
            <ErrorMessage>
              {(errors.phoneProperty as any)?.message}
            </ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="company-create-property">
            Management Company:
            <span>{selectedOptionRole?.label}</span>
          </label>
          <Select
            defaultValue={selectedOptionRole}
            onChange={handleChangeOptionRole}
            options={optionsCompany}
            isSearchable={false}
            styles={selectStyles}
          />
          {!!(errors.managementCompanyId as any)?.message && (
            <ErrorMessage>
              {(errors.managementCompanyId as any)?.message}
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

export default ModalEditProperty
