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
import { FormContainer } from "./modal-edit-company.styles"
import {
  UpdateServiceForm,
  UpdateServiceSchema,
} from "../../../../core/models/schemas/service-schema"
import { ServiceDTO } from "../../../../core/models/interfaces/services-model"
import { MessageResponsedDTO } from "../../../../core/models/interfaces/general-model"
import { setErrResponse } from "../../../../utils/erros-util"
import { ManagementCompanyDTO } from "../../../../core/models/interfaces/management-company"
import {
  UpdateCompanyForm,
  UpdateCompanySchema,
} from "../../../../core/models/schemas/company-schema"
import { ManagerCompanyDTO } from "../../../../core/models/interfaces/property-model"
import { FolderOpen } from "styled-icons/fa-regular"

interface IOwnProps {
  isOpen: boolean
  dataEdit: ManagementCompanyDTO
  handleClose: () => void
  handleRefreshData: () => void
}

const ModalEditCompany: React.FC<IOwnProps> = ({
  isOpen,
  dataEdit,
  handleClose,
  handleRefreshData,
}) => {
  const [isSubmitUpdate, setIsSubmitUpdate] = React.useState<boolean>(false)
  const [initialData, setInitialData] =
    React.useState<UpdateCompanyForm | null>(null)

  const { handleGetToken, handleGetPermissions } = useDataUser()

  const methods = useForm<UpdateCompanyForm>({
    resolver: yupResolver(UpdateCompanySchema),
    defaultValues: {
      name: "",
      managerName: "",
      managerPhone: "",
      assitantManagerName: "",
      assitantManagerPhone: "",
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
      setValue("name", `${dataEdit.name}`)
      setValue("managerName", dataEdit.managerName)
      setValue("managerPhone", dataEdit.managerPhone)
      setValue("assitantManagerName", dataEdit.assitantManagerName)
      setValue("assitantManagerPhone", dataEdit.assitantManagerPhone)
      setInitialData({
        name: dataEdit.name,
        managerName: dataEdit.managerName,
        managerPhone: dataEdit.managerPhone,
        assitantManagerName: dataEdit.assitantManagerName,
        assitantManagerPhone: dataEdit.assitantManagerPhone,
      })
    }
  }, [dataEdit])

  const handleSubmit = React.useCallback(
    (data: any) => {
      const changes: Partial<UpdateCompanyForm> = {}

      // Compara cada campo con el valor inicial
      if (data.name !== initialData?.name) {
        changes.name = data.name
      }
      if (data.managerName !== initialData?.managerName) {
        changes.managerName = data.managerName
      }
      if (data.managerPhone !== initialData?.managerPhone) {
        changes.managerPhone = data.managerPhone
      }
      if (data.assitantManagerName !== initialData?.assitantManagerName) {
        changes.assitantManagerName = data.assitantManagerName
      }
      if (data.assitantManagerPhone !== initialData?.assitantManagerPhone) {
        changes.assitantManagerPhone = data.assitantManagerPhone
      }

      // Si no hay cambios, muestra un mensaje y retorna
      if (Object.keys(changes).length === 0) {
        toast.warning("No se realizaron cambios.")
        return
      }

      setIsSubmitUpdate(true)
      const storedToken = handleGetToken()
      if (!!storedToken) {
        const formData = new FormData()
        Object.entries(changes).forEach(([key, value]) => {
          formData.append(key as keyof UpdateCompanyForm, value as string)
        })

        axios
          .patch(
            `${settingsApp.api.base}/management_companies/${dataEdit.id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
                ContentType: "application/json",
                Accept: "application/json",
              },
            },
          )
          .then(response => {
            setIsSubmitUpdate(false)
            const data: ManagerCompanyDTO = response.data as ManagerCompanyDTO
            if (!!data && !!data.name) {
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
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Company">
      <FormContainer>
        <WrapperInput>
          <label htmlFor="name-update-edit">First Name</label>
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
        <WrapperInput>
          <label htmlFor="managername-create-company">Manager Name</label>
          <Input
            id="managername-create-company"
            placeholder="Enter address"
            icon={FolderOpen}
            register={register("managerName")}
          />
          {!!(errors.managerName as any)?.message && (
            <ErrorMessage>{(errors.managerName as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="phone-manager-create-company">Phone Manager</label>
          <Input
            id="phone-manager-create-company"
            placeholder="Enter phone manager"
            icon={FolderOpen}
            register={register("managerPhone")}
          />
          {!!(errors.managerPhone as any)?.message && (
            <ErrorMessage>{(errors.managerPhone as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="supervisorname-create-company">Supervisor Name</label>
          <Input
            id="supervisorname-create-company"
            placeholder="Enter Supervisor name"
            icon={FolderOpen}
            register={register("assitantManagerName")}
          />
          {!!(errors.assitantManagerName as any)?.message && (
            <ErrorMessage>
              {(errors.assitantManagerName as any)?.message}
            </ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="phone-supervisor-create-company">
            Phone Supervisor
          </label>
          <Input
            id="phone-supervisor-create-company"
            placeholder="Enter phone supervisor"
            icon={FolderOpen}
            register={register("assitantManagerPhone")}
          />
          {!!(errors.assitantManagerPhone as any)?.message && (
            <ErrorMessage>
              {(errors.assitantManagerPhone as any)?.message}
            </ErrorMessage>
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

export default ModalEditCompany
