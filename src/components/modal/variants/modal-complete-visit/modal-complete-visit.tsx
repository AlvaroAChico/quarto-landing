import React from "react"
import Modal from "../../modal"
import Button from "../../../button/button"
import axios from "axios"
import { toast } from "sonner"
import { ContainerModal } from "./modal-complete-visit.styles"
import { settingsApp } from "../../../../config/environment/settings"
import useDataUser from "../../../../utils/use-data-user"
import { MessageResponsedDTO } from "../../../../core/models/interfaces/general-model"
import { generalRepository } from "../../../../api/repositories/general-repository"
import {
  ErrorMessage,
  WrapperInput,
} from "../../../../config/theme/global-styles"
import Input from "../../../input/input"
import Textarea from "../../../textarea/textarea"
import { useForm } from "react-hook-form"
import {
  CompleteVisitForm,
  CompleteVisitSchema,
} from "../../../../core/models/schemas/visit-schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { visitRepository } from "../../../../api/repositories/visit-repository"

interface IOwnProps {
  isOpen: boolean
  handleClose: () => void
  handleRefresh: () => void
}

const ModalCompleteVisit: React.FC<IOwnProps> = ({
  isOpen,
  handleClose,
  handleRefresh,
}) => {
  const [isSubmitComplete, setIsSubmitComplete] = React.useState<boolean>(false)

  const { handleGetToken } = useDataUser()

  const methods = useForm<CompleteVisitForm>({
    resolver: yupResolver(CompleteVisitSchema),
    defaultValues: {
      comment: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    reset,
    setValue,
  } = methods
  const handleSubmit = async (data: any) => {
    setIsSubmitComplete(true)
    try {
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

      const response: any = (await visitRepository.completeVisit(
        1,
        formData,
      )) as any
      if (!!response) {
        toast.success("Datos actualizados satisfactoriamente")
        reset()
      }
    } finally {
      setIsSubmitComplete(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Completar">
      <ContainerModal>
        <div>
          <p>Por favor registra la visita con un comentario</p>
        </div>
        <div>
          <WrapperInput>
            <Textarea
              id="comment-complete-visit"
              placeholder="Ingresa un comentario"
              type="text"
              register={register("comment")}
            />
            {!!(errors.comment as any)?.message && (
              <ErrorMessage>{(errors.comment as any)?.message}</ErrorMessage>
            )}
          </WrapperInput>
        </div>
        <div>
          <Button onClick={handleClose} text="Cancel" isLoading={false} />
          <Button
            onClick={submitWrapper(handleSubmit)}
            text="Completar"
            isLoading={isSubmitComplete}
          />
        </div>
      </ContainerModal>
    </Modal>
  )
}

export default ModalCompleteVisit
