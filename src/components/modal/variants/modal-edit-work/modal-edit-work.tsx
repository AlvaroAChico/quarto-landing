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
import Select from "react-select"
import axios from "axios"
import { toast } from "sonner"
import useDataUser from "../../../../utils/use-data-user"
import { settingsApp } from "../../../../config/environment/settings"
import { FormContainer } from "./modal-edit-work.styles"
import {
  UpdateServiceForm,
  UpdateServiceSchema,
} from "../../../../core/models/schemas/service-schema"
import { ServiceDTO } from "../../../../core/models/interfaces/services-model"
import { MessageResponsedDTO } from "../../../../core/models/interfaces/general-model"
import { setErrResponse } from "../../../../utils/erros-util"
import { InfoCalendarDTO } from "../../../../core/models/interfaces/calendar-model"

interface IOwnProps {
  isOpen: boolean
  dataEdit: InfoCalendarDTO
  handleClose: () => void
  handleRefreshData: () => void
}

const ModalEditWork: React.FC<IOwnProps> = ({
  isOpen,
  dataEdit,
  handleClose,
  handleRefreshData,
}) => {
  const [isSubmitUpdate, setIsSubmitUpdate] = React.useState<boolean>(false)

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

  const handleSubmit = React.useCallback(
    (data: any) => {
      const storedToken = handleGetToken()
      if (!!storedToken) {
        setIsSubmitUpdate(true)
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
          setIsSubmitUpdate(false)
          toast.warning("No changes were made")
          return
        }

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
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Work">
      <FormContainer>
        <WrapperInput>
          <label htmlFor="code-update-edit">
            Service: <span>{dataEdit?.service.name}</span>
          </label>
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
          <label htmlFor="name-update-edit">
            Apartment: <span>{dataEdit?.apartment.name}</span>
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
        <Button
          onClick={submitWrapper(handleSubmit)}
          text="Update User"
          isLoading={isSubmitUpdate}
        />
      </FormContainer>
    </Modal>
  )
}

export default ModalEditWork
