import React from "react"
import Modal from "../../modal"
import Button from "../../../button/button"
import axios from "axios"
import { toast } from "sonner"
import { ContainerModal } from "./modal-delete-general.styles"
import { settingsApp } from "../../../../config/environment/settings"
import useDataUser from "../../../../utils/use-data-user"
import { MessageResponsedDTO } from "../../../../core/models/interfaces/general-model"
import { generalRepository } from "../../../../api/repositories/general-repository"

interface IOwnProps {
  isOpen: boolean
  dataId: string | number
  dataAPI: string
  dataLabel: string
  dataName: string
  handleClose: () => void
  handleRefresh: () => void
}

const ModalDeleteGeneral: React.FC<IOwnProps> = ({
  isOpen,
  dataId,
  dataAPI,
  dataLabel,
  dataName,
  handleClose,
  handleRefresh,
}) => {
  const [isSubmitDelete, setIsSubmitDelete] = React.useState<boolean>(false)

  const { handleGetToken } = useDataUser()

  const handleDelete = React.useCallback(async () => {
    try {
      const response: MessageResponsedDTO = (await generalRepository.deleteItem(
        `${dataAPI}/${dataId}`,
      )) as MessageResponsedDTO
      if (!!response) {
        toast.success(response.message)
        handleRefresh()
        setIsSubmitDelete(false)
        handleClose()
      }
    } finally {
      setIsSubmitDelete(false)
    }
  }, [handleGetToken, dataAPI, dataId])

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Delete">
      <ContainerModal>
        <div>
          <p>
            Are you sure you want to delete {!!dataLabel ? dataLabel : ""}{" "}
            <span>{!!dataName ? dataName : ""}</span>?
          </p>
        </div>
        <div>
          <Button onClick={handleClose} text="Cancel" isLoading={false} />
          <Button
            onClick={handleDelete}
            text="Delete"
            isLoading={isSubmitDelete}
          />
        </div>
      </ContainerModal>
    </Modal>
  )
}

export default ModalDeleteGeneral
