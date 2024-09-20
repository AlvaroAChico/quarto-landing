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
import {
  DataRoleResponse,
  ServiceDTO,
} from "../../../../core/models/interfaces/roles-model"
import useDataUser from "../../../../utils/use-data-user"
import { Trash } from "@styled-icons/ionicons-solid/Trash"
import { Calendar4 } from "@styled-icons/bootstrap/Calendar4"
import { CardImage } from "@styled-icons/bootstrap/CardImage"
import { useDropzone } from "react-dropzone"
import { settingsApp } from "../../../../config/environment/settings"
import { Password } from "@styled-icons/material-twotone/Password"
import { EyeFill, EyeSlashFill } from "@styled-icons/bootstrap"
import { FormContainer } from "./modal-add-service.styles"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {
  CreateWorkForm,
  CreateWorkSchema,
} from "../../../../core/models/schemas/work-schema"
import { formatToDDMMYYYY, formatToDMYHH } from "../../../../utils/date-util"

interface IOwnProps {
  isOpen: boolean
  apartmentId: string
  handleClose: () => void
  handleRefreshData: () => void
}

const ModalAddService: React.FC<IOwnProps> = ({
  isOpen,
  apartmentId,
  handleClose,
  handleRefreshData,
}) => {
  const [optionsServices, setOptionsServices] = React.useState<any>([])
  const [optionsContractors, setOptionsContractors] = React.useState<any>([])
  const [selectedOptionRole, setSelectedOptionRole] =
    React.useState<Option | null>(null)
  const [isSubmitUserUpdate, setIsSubmitUserUpdate] =
    React.useState<boolean>(false)
  const [daySelected, setDaySelected] = React.useState<any>(new Date())

  const { handleGetToken, handleGetPermissions } = useDataUser()
  const methods = useForm<CreateWorkForm>({
    resolver: yupResolver(CreateWorkSchema),
    defaultValues: {
      apartmentId: "",
      serviceId: "",
      contractorId: "",
      date: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    setValue,
  } = methods

  const handleChangeOptionService = (value: any) => {
    setValue("serviceId", value.value)
    setSelectedOptionRole(value)
  }

  const handleChangeOptionContractor = (value: any) => {
    setValue("contractorId", value.value)
    setSelectedOptionRole(value)
  }

  React.useEffect(() => {
    if (!!apartmentId) {
      console.log("apartmentId => ", apartmentId)
      setValue("apartmentId", apartmentId)
    }
  }, [apartmentId])

  const hasParamsFormData = (formData: FormData): boolean => {
    var nroValue = 0
    for (const [key, value] of formData.entries()) {
      if (value !== "" || value !== null || value !== undefined) {
        nroValue++
      }
      console.log("Value FormData -> ", value)
    }
    return nroValue > 0
  }

  const handleSubmit = React.useCallback((data: any) => {
    setIsSubmitUserUpdate(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      const formData = new FormData()
      // formData.append("_method", "PATCH")
      formData.append("apartment_id", data.apartmentId)
      formData.append("service_id", data.serviceId)
      formData.append("contractor_id", data.contractorId)
      formData.append("start_date", formatToDMYHH(data.date))

      axios
        .post(`${settingsApp.api.base}/works`, formData, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            ContentType: "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          setIsSubmitUserUpdate(false)
          console.log("Response data -> ", response.data)
          const data: UserDTO = response.data as UserDTO
          if (!!data && !!data.id) {
            toast.success("User successfully updated")
            handleRefreshData()
            handleClose()
          }
        })
        .catch(err => {
          setIsSubmitUserUpdate(false)
          toast.error("Failed to authenticate")
        })
    }
  }, [])

  React.useEffect(() => {
    const storedToken = handleGetToken()

    if (!!storedToken) {
      axios
        .get(`${settingsApp.api.base}/services`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(response => {
          const listData: ServiceDTO[] = response.data as ServiceDTO[]
          const listRoles = (listData || []).map(data => ({
            value: data.id,
            label: data.name,
          }))
          setOptionsServices(listRoles.filter((role: any) => !!role))
        })

      axios
        .get(`${settingsApp.api.base}/users?include=role`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(response => {
          const listData: UserDTO[] = response.data as UserDTO[]
          const contractors = listData.filter(user =>
            user.role.some(ro => ro.name === "contractor"),
          )
          const listRoles = (contractors || []).map(data => ({
            value: data.id,
            label: data.firstName,
          }))
          setOptionsContractors(listRoles.filter((role: any) => !!role))
        })
    }
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit User">
      <FormContainer>
        <WrapperInput>
          <label htmlFor="firstname-create-user">Start date</label>
          <DatePicker
            id="date-create-apartment"
            showIcon
            selected={daySelected}
            icon={<Calendar4 />}
            toggleCalendarOnIconClick
            onChange={(date: any) => {
              setDaySelected(date)
              setValue("date", date)
            }}
            placeholderText="Enter date"
            popperClassName="some-custom-class"
            popperPlacement="top-end"
            popperModifiers={[
              {
                name: "myModifier",
                fn(state) {
                  return state
                },
              },
            ]}
          />
          {!!(errors.date as any)?.message && (
            <ErrorMessage>{(errors.date as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="password-create-user">Services</label>
          <Select
            defaultValue={selectedOptionRole}
            onChange={handleChangeOptionService}
            options={optionsServices}
            isSearchable={false}
            styles={selectStyles}
          />
          {!!(errors.serviceId as any)?.message && (
            <ErrorMessage>{(errors.serviceId as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="password-create-user">Contractors</label>
          <Select
            defaultValue={selectedOptionRole}
            onChange={handleChangeOptionContractor}
            options={optionsContractors}
            isSearchable={false}
            styles={selectStyles}
          />
          {!!(errors.contractorId as any)?.message && (
            <ErrorMessage>{(errors.contractorId as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <Button
          onClick={submitWrapper(handleSubmit)}
          text="Create Work"
          isLoading={isSubmitUserUpdate}
        />
      </FormContainer>
    </Modal>
  )
}

export default ModalAddService
