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
import useDataUser from "../../../../utils/use-data-user"
import { settingsApp } from "../../../../config/environment/settings"
import { FormContainer } from "./modal-edit-service.styles"
import {
  UpdateServiceForm,
  UpdateServiceSchema,
} from "../../../../core/models/schemas/service-schema"
import { ServiceDTO } from "../../../../core/models/interfaces/services-model"
import { MessageResponsedDTO } from "../../../../core/models/interfaces/general-model"
import { setErrResponse } from "../../../../utils/erros-util"

interface IOwnProps {
  isOpen: boolean
  dataEdit: ServiceDTO
  handleClose: () => void
  handleRefreshData: () => void
}

const ModalEditService: React.FC<IOwnProps> = ({
  isOpen,
  dataEdit,
  handleClose,
  handleRefreshData,
}) => {
  const [isSubmitUpdate, setIsSubmitUpdate] = React.useState<boolean>(false)
  const [initialData, setInitialData] =
    React.useState<UpdateServiceForm | null>(null)

  const { handleGetToken, handleGetPermissions } = useDataUser()

  const methods = useForm<UpdateServiceForm>({
    resolver: yupResolver(UpdateServiceSchema),
    defaultValues: {
      code: "",
      name: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    setValue,
  } = methods

  React.useEffect(() => {
    if (!!dataEdit) {
      setValue("code", `${dataEdit.code}`)
      setValue("name", dataEdit.name)
      setInitialData({ code: dataEdit.code, name: dataEdit.name })
    }
  }, [dataEdit])

  const handleSubmit = React.useCallback(
    (data: any) => {
      if (JSON.stringify(data) === JSON.stringify(initialData)) {
        toast.warning("No se realizaron cambios.")
        return
      }
      setIsSubmitUpdate(true)
      const storedToken = handleGetToken()
      if (!!storedToken) {
        const formData = new FormData()
        formData.append("code", data.code)
        formData.append("name", data.name)

        axios
          .patch(`${settingsApp.api.base}/services/${dataEdit.id}`, formData, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              ContentType: "application/json",
              Accept: "application/json",
            },
          })
          .then(response => {
            setIsSubmitUpdate(false)
            const data: ServiceDTO = response.data as ServiceDTO
            if (!!data && !!data.code) {
              toast.success("Update successful")
              handleRefreshData()
              handleClose()
            }
          })
          .catch(err => {
            setIsSubmitUpdate(false)
            setErrResponse(err)
          })
      }
    },
    [dataEdit],
  )

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Service">
      <FormContainer>
        <WrapperInput>
          <label htmlFor="code-update-edit">First Name</label>
          <Input
            id="code-update-edit"
            placeholder="Enter code"
            icon={User}
            register={register("code")}
          />
          {!!(errors.code as any)?.message && (
            <ErrorMessage>{(errors.code as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="name-update-edit">Last Name</label>
          <Input
            id="name-update-edit"
            placeholder="Enter name"
            icon={User}
            register={register("name")}
          />
          {!!(errors.name as any)?.message && (
            <ErrorMessage>{(errors.name as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <Button
          onClick={submitWrapper(handleSubmit)}
          text="Update User"
          isLoading={isSubmitUpdate}
        />
      </FormContainer>
    </Modal>
  )
}

export default ModalEditService
