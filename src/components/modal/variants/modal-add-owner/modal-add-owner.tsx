import React from "react"
import Modal from "../../modal"
import Button from "../../../button/button"
import axios from "axios"
import { toast } from "sonner"
import { ContainerModal } from "./modal-add-owner.styles"
import { settingsApp } from "../../../../config/environment/settings"
import useDataUser from "../../../../utils/use-data-user"
import { MessageResponsedDTO } from "../../../../core/models/interfaces/general-model"
import { generalRepository } from "../../../../api/repositories/general-repository"

interface IOwnProps {
  isOpen: boolean
  handleClose: () => void
  handleRefresh: () => void
}

const ModalAddOwner: React.FC<IOwnProps> = ({
  isOpen,
  handleClose,
  handleRefresh,
}) => {
  const [isSubmitDelete, setIsSubmitDelete] = React.useState<boolean>(false)

  const { handleGetToken } = useDataUser()

  // const handleDelete = React.useCallback(async () => {
  //   try {
  //     const response: MessageResponsedDTO = (await generalRepository.deleteItem(
  //       `${dataAPI}/${dataId}`,
  //     )) as MessageResponsedDTO
  //     if (!!response) {
  //       toast.success(response.message)
  //       handleRefresh()
  //       setIsSubmitDelete(false)
  //       handleClose()
  //     }
  //   } finally {
  //     setIsSubmitDelete(false)
  //   }
  // }, [handleGetToken, dataAPI, dataId])

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Delete">
      <ContainerModal>
        <div>
          <p>Are you sure you want to delete</p>
        </div>
        <div>
          <Button onClick={handleClose} text="Cancel" isLoading={false} />
          <Button
            onClick={() => console.log}
            text="Delete"
            isLoading={isSubmitDelete}
          />
        </div>
      </ContainerModal>
    </Modal>
  )
}

export default ModalAddOwner
