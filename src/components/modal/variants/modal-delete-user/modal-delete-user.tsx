import React from "react"
import Modal from "../../modal"
import { UserDTO } from "../../../../core/models/interfaces/user-model"
import Button from "../../../button/button"
import axios from "axios"
import { toast } from "sonner"
import { ContainerModal } from "./modal-delete-user.styles"
import { settingsApp } from "../../../../config/environment/settings"
import useDataUser from "../../../../utils/use-data-user"
import { MessageResponsedDTO } from "../../../../core/models/interfaces/general-model"
import { setErrResponse } from "../../../../utils/erros-util"

interface IOwnProps {
  isOpen: boolean
  dataUserDelete: UserDTO
  handleClose: () => void
  handleDeleteUser: () => void
}

const ModalDeleteUser: React.FC<IOwnProps> = ({
  isOpen,
  dataUserDelete,
  handleClose,
  handleDeleteUser,
}) => {
  const [isSubmitUserDelete, setIsSubmitUserDelete] =
    React.useState<boolean>(false)

  const { handleGetToken } = useDataUser()

  const handleDelete = React.useCallback(() => {
    setIsSubmitUserDelete(true)
    const storedToken = handleGetToken()

    if (!!storedToken) {
      axios
        .delete(`${settingsApp.api.base}/users/${dataUserDelete.id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          setIsSubmitUserDelete(false)
          const data: MessageResponsedDTO = response.data as MessageResponsedDTO
          if (!!data && !!data.message) {
            handleDeleteUser()
            toast.success(data.message)
          }
        })
        .catch(err => {
          setIsSubmitUserDelete(false)
          setErrResponse(err)
        })
    }
  }, [dataUserDelete])

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Delete User">
      <ContainerModal>
        <div>
          <p>
            Are you sure you want to delete user{" "}
            <span>{!!dataUserDelete ? dataUserDelete.firstName : ""}</span>?
          </p>
        </div>
        <div>
          <Button onClick={handleClose} text="Cancel" isLoading={false} />
          <Button
            onClick={handleDelete}
            text="Delete"
            isLoading={isSubmitUserDelete}
          />
        </div>
      </ContainerModal>
    </Modal>
  )
}

export default ModalDeleteUser
