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
import { ContainerButtons, FormContainer } from "./modal-note-calendar.styles"
import {
  UpdateServiceForm,
  UpdateServiceSchema,
} from "../../../../core/models/schemas/service-schema"
import { ServiceDTO } from "../../../../core/models/interfaces/services-model"
import { MessageResponsedDTO } from "../../../../core/models/interfaces/general-model"
import { setErrResponse } from "../../../../utils/erros-util"
import {
  CreateNoteWorkForm,
  CreateNoteWorkSchema,
} from "../../../../core/models/schemas/note-schema"
import { InfoCalendarDTO } from "../../../../core/models/interfaces/calendar-model"
import Textarea from "../../../textarea/textarea"

interface IOwnProps {
  isOpen: boolean
  isLoadingReview: boolean
  dataEdit: InfoCalendarDTO
  statusReview: number
  handleClose: () => void
  handleWorkReview: (type: string, status: number, notes: string) => void
}

const ModalNoteCalendar: React.FC<IOwnProps> = ({
  isOpen,
  dataEdit,
  statusReview,
  isLoadingReview,
  handleClose,
  handleWorkReview,
}) => {
  const { handleGetToken, handleGetPermissions } = useDataUser()

  const methods = useForm<CreateNoteWorkForm>({
    resolver: yupResolver(CreateNoteWorkSchema),
    defaultValues: {
      notes: "",
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
        handleWorkReview("quality", statusReview, data.notes)
        // axios
        //   .post(`${settingsApp.api.base}/services/${dataEdit.id}`, jsonData, {
        //     headers: {
        //       Authorization: `Bearer ${storedToken}`,
        //       ContentType: "application/json",
        //       Accept: "application/json",
        //     },
        //   })
        //   .then(response => {
        //     setIsSubmitUpdate(false)
        //     const data: ServiceDTO = response.data as ServiceDTO
        //     if (!!data && !!data.code) {
        //       toast.success("Update successful")
        //       handleRefreshData()
        //       handleClose()
        //     }
        //   })
        //   .catch(err => {
        //     setIsSubmitUpdate(false)
        //     setErrResponse(err)
        //   })
      }
    },
    [dataEdit, statusReview],
  )

  const handleContinueWithoutNotes = () => {
    handleWorkReview("quality", statusReview, "")
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Notes">
      <FormContainer>
        <WrapperInput>
          <label htmlFor="code-update-edit">Notes</label>
          <Textarea
            id="code-update-edit"
            placeholder="Enter code"
            icon={User}
            register={register("notes")}
          />
          {!!(errors.notes as any)?.message && (
            <ErrorMessage>{(errors.notes as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <ContainerButtons>
          <Button
            onClick={handleContinueWithoutNotes}
            text="Continue without notes"
            isLoading={isLoadingReview}
          />
          <Button
            onClick={submitWrapper(handleSubmit)}
            text=" Send"
            isLoading={isLoadingReview}
            type="submit"
          />
        </ContainerButtons>
      </FormContainer>
    </Modal>
  )
}

export default ModalNoteCalendar
