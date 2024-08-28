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
  UserDTO,
} from "../../../../core/models/interfaces/user-model"
import { FormContainer } from "./modal-edit-user.styles"
import {
  ErrorMessage,
  selectStyles,
  WrapperInput,
} from "../../../../config/theme/global-styles"
import { User } from "styled-icons/boxicons-solid"
import { palette } from "../../../../config/theme/theme"
import Button from "../../../button/button"
import Input from "../../../input/input"
import Select from "react-select"
import Cookies from "js-cookie"
import axios from "axios"
import { toast } from "sonner"
import { COOKIES_APP } from "../../../../constants/app"
import { DataRoleResponse } from "../../../../core/models/interfaces/roles-model"

interface IOwnProps {
  isOpen: boolean
  dataUserEdit: UserDTO
  handleClose: () => void
}

const ModalEditUser: React.FC<IOwnProps> = ({
  isOpen,
  dataUserEdit,
  handleClose,
}) => {
  const [optionsRoles, setOptionsRoles] = React.useState<any>([])
  const [selectedOptionRole, setSelectedOptionRole] = React.useState(null)
  const [isSubmitUserUpdate, setIsSubmitUserUpdate] =
    React.useState<boolean>(false)

  const methods = useForm<UpdateUserForm>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: {
      firstName: !!dataUserEdit ? dataUserEdit.firstName : "",
      lastName: !!dataUserEdit ? dataUserEdit.lastName : "",
      email: !!dataUserEdit ? dataUserEdit.email : "",
      codeRole: !!dataUserEdit ? dataUserEdit.role.uuid : "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    setValue,
  } = methods

  const handleChangeOptionRole = (value: any) => {
    setValue("codeRole", value.value)
    setSelectedOptionRole(value)
  }

  const handleSubmit = React.useCallback((data: any) => {
    setIsSubmitUserUpdate(true)
    axios
      .post("http://localhost:3000/users/update", {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      })
      .then(response => {
        setIsSubmitUserUpdate(false)
        const data: CreateUserDTO = response.data as CreateUserDTO
        if (!!data && data.code == 200 && !!data.data) {
          toast.success(data.message)
        }
      })
      .catch(err => {
        setIsSubmitUserUpdate(false)
        toast.error("Failed to authenticate")
      })
  }, [])

  React.useEffect(() => {
    const storedToken = Cookies.get(COOKIES_APP.TOKEN_APP)

    if (storedToken) {
      axios
        .get("http://localhost:3000/roles", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(response => {
          const listData: DataRoleResponse[] =
            response.data as DataRoleResponse[]
          setOptionsRoles(
            listData.map(role => ({
              value: role.uuid,
              label: role.name,
            })),
          )
        })
        .catch(err => {
          toast.error("Failed to fetch data")
        })
    }
  }, [])

  React.useEffect(() => {
    if (!!dataUserEdit) {
      setValue("firstName", dataUserEdit.firstName)
      setValue("lastName", dataUserEdit.lastName)
      setValue("email", dataUserEdit.email)
      setValue("codeRole", dataUserEdit.role.uuid)
      setSelectedOptionRole({
        value: dataUserEdit.role.uuid,
        label: dataUserEdit.role.name,
      })
    }
  }, [dataUserEdit])

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit User">
      <FormContainer>
        <WrapperInput>
          <label htmlFor="firstname-create-user">First Name</label>
          <Input
            id="firstname-create-user"
            placeholder="Enter firstname"
            icon={User}
            props={register("firstName")}
          />
          {!!(errors.firstName as any)?.message && (
            <ErrorMessage>{(errors.firstName as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="lastname-create-user">Last Name</label>
          <Input
            id="lastname-create-user"
            placeholder="Enter lastname"
            icon={User}
            props={register("lastName")}
          />
          {!!(errors.lastName as any)?.message && (
            <ErrorMessage>{(errors.lastName as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="email-create-user">Email</label>
          <Input
            id="email-create-user"
            placeholder="Enter email"
            icon={User}
            props={register("email")}
          />
          {!!(errors.email as any)?.message && (
            <ErrorMessage>{(errors.email as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="password-create-user">Role</label>
          <Select
            defaultValue={selectedOptionRole}
            onChange={handleChangeOptionRole}
            options={optionsRoles}
            isSearchable={false}
            styles={selectStyles}
          />
          {!!(errors.codeRole as any)?.message && (
            <ErrorMessage>{(errors.codeRole as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <Button
          onClick={submitWrapper(handleSubmit)}
          text="Create User"
          isLoading={isSubmitUserUpdate}
        />
      </FormContainer>
    </Modal>
  )
}

export default ModalEditUser
