import React from "react"
import Modal from "../../modal"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  ErrorMessage,
  WrapperInput,
} from "../../../../config/theme/global-styles"
import { User } from "styled-icons/boxicons-solid"
import Button from "../../../button/button"
import Input from "../../../input/input"
import axios from "axios"
import { toast } from "sonner"
import useDataUser from "../../../../utils/use-data-user"
import { settingsApp } from "../../../../config/environment/settings"
import { FormContainer } from "./modal-edit-company.styles"
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

  const { handleGetToken } = useDataUser()

  const methods = useForm<UpdateCompanyForm>({
    resolver: yupResolver(UpdateCompanySchema),
    defaultValues: {
      name: "",
      manager_name: "",
      manager_phone: "",
      assitant_manager_name: "",
      assitant_manager_phone: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
  } = methods

  const handleSubmit = React.useCallback(
    (data: any) => {
      const storedToken = handleGetToken()
      if (!!storedToken) {
        setIsSubmitUpdate(true)
        const jsonData: { [key: string]: any } = {}

        for (const key in data) {
          if (
            data.hasOwnProperty(key) &&
            data[key] !== undefined &&
            data[key] !== null &&
            data[key] !== ""
          ) {
            jsonData[key] = data[key]
          }
        }

        if (Object.keys(jsonData).length === 0) {
          setIsSubmitUpdate(false)
          toast.warning("No changes were made")
          return
        }

        jsonData["_method"] = "PATCH"

        axios
          .post(
            `${settingsApp.api.base}/management_companies/${dataEdit.id}`,
            jsonData,
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
          <label htmlFor="name-update-edit">
            Name: <span>{dataEdit?.name}</span>
          </label>
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
          <label htmlFor="managername-create-company">
            Manager Name: <span>{dataEdit?.managerName}</span>
          </label>
          <Input
            id="managername-create-company"
            placeholder="Enter address"
            icon={FolderOpen}
            register={register("manager_name")}
          />
          {!!(errors.manager_name as any)?.message && (
            <ErrorMessage>{(errors.manager_name as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="phone-manager-create-company">
            Phone Manager: <span>{dataEdit?.managerPhone}</span>
          </label>
          <Input
            id="phone-manager-create-company"
            placeholder="Enter phone manager"
            icon={FolderOpen}
            register={register("manager_phone")}
          />
          {!!(errors.manager_phone as any)?.message && (
            <ErrorMessage>
              {(errors.manager_phone as any)?.message}
            </ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="supervisorname-create-company">
            Supervisor Name: <span>{dataEdit?.assitantManagerName}</span>
          </label>
          <Input
            id="supervisorname-create-company"
            placeholder="Enter Supervisor name"
            icon={FolderOpen}
            register={register("assitant_manager_name")}
          />
          {!!(errors.assitant_manager_name as any)?.message && (
            <ErrorMessage>
              {(errors.assitant_manager_name as any)?.message}
            </ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="phone-supervisor-create-company">
            Phone Supervisor: <span>{dataEdit?.assitantManagerPhone}</span>
          </label>
          <Input
            id="phone-supervisor-create-company"
            placeholder="Enter phone supervisor"
            icon={FolderOpen}
            register={register("assitant_manager_phone")}
          />
          {!!(errors.assitant_manager_phone as any)?.message && (
            <ErrorMessage>
              {(errors.assitant_manager_phone as any)?.message}
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
