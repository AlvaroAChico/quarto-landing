import React from "react"
import Modal from "../../modal"
import {
  CreateUserDTO,
  UserDTO,
} from "../../../../core/models/interfaces/user-model"
import Button from "../../../button/button"
import Cookies from "js-cookie"
import axios from "axios"
import { toast } from "sonner"
import { COOKIES_APP } from "../../../../constants/app"
import { ContainerModal } from "./modal-delete-user.styles"

interface IOwnProps {
  isOpen: boolean
  dataUserDelete: UserDTO
  handleClose: () => void
}

const ModalDeleteUser: React.FC<IOwnProps> = ({
  isOpen,
  dataUserDelete,
  handleClose,
}) => {
  const [isSubmitUserDelete, setIsSubmitUserDelete] =
    React.useState<boolean>(false)

  const handleDelete = React.useCallback(() => {
    setIsSubmitUserDelete(true)
    const storedToken = Cookies.get(COOKIES_APP.TOKEN_APP)

    if (storedToken) {
      axios
        .post(`http://localhost:3000/users/delete/${dataUserDelete.id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(response => {
          setIsSubmitUserDelete(false)
          const data: CreateUserDTO = response.data as CreateUserDTO
          if (!!data && data.code == 200 && !!data.data) {
            toast.success(data.message)
          }
        })
        .catch(err => {
          setIsSubmitUserDelete(false)
          toast.error("Failed to delete user")
        })
    }
  }, [])

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
          <Button
            onClick={handleClose}
            text="Cancel"
            isLoading={isSubmitUserDelete}
          />
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
