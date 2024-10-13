import React from "react"
import Modal from "../../modal"
import { set, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
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
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Calendar4 } from "@styled-icons/bootstrap/Calendar4"
import {
  UpdateWorkForm,
  UpdateWorkSchema,
} from "../../../../core/models/schemas/work-schema"
import { formatToDDMMYYYY } from "../../../../utils/date-util"
import { PropertyDTO } from "../../../../core/models/interfaces/property-model"
import { TextDescription } from "@styled-icons/fluentui-system-filled/TextDescription"
import Textarea from "../../../textarea/textarea"
import { useDropzone } from "react-dropzone"
import { UserDTO } from "../../../../core/models/interfaces/user-model"

interface IOwnProps {
  isOpen: boolean
  dataEdit: InfoCalendarDTO
  listServices: ServiceDTO[]
  listContractors: UserDTO[]
  listResidentials: PropertyDTO[]
  listProperties: PropertyDTO[]
  handleClose: () => void
  handleRefreshData: () => void
}

const ModalEditWork: React.FC<IOwnProps> = ({
  isOpen,
  dataEdit,
  listServices,
  listContractors,
  listResidentials,
  listProperties,
  handleClose,
  handleRefreshData,
}) => {
  const [isSubmitUpdate, setIsSubmitUpdate] = React.useState<boolean>(false)
  const [daySelected, setDaySelected] = React.useState<any>(new Date())
  // Services
  const [optionsServices, setOptionsServices] = React.useState<any>([])
  const [selectedOptionServices, setSelectedOptionServices] =
    React.useState<any>(null)
  // Contractor
  const [optionsContractors, setOptionsContractor] = React.useState<any>([])
  const [selectedOptionContractor, setSelectedOptionContractor] =
    React.useState<any>(null)
  // Residential
  const [optionsResidential, setOptionsResidential] = React.useState<any>([])
  const [listCurrentProperty, setListCurrentProperty] = React.useState<
    PropertyDTO[]
  >([])
  const [selectedOptionResidential, setSelectedOptionResidential] =
    React.useState<any>(null)
  // Apartment
  const [optionsApartment, setOptionsApartment] = React.useState<any>([])
  const [selectedOptionApartment, setSelectedOptionApartment] =
    React.useState<any>(null)

  const { handleGetToken, handleGetPermissions } = useDataUser()

  const handleChangeOptionService = (value: any) => {
    setValue("service_id", value.value)
    setSelectedOptionServices(value)
  }

  const handleChangeOptionContractor = (value: any) => {
    setValue("contractor_id", value.value)
    setSelectedOptionContractor(value)
  }

  const handleChangeOptionResidential = (value: any) => {
    setSelectedOptionResidential(value)
    const listApart = listCurrentProperty
      .filter(prop => prop.id == value.value)
      .flatMap(prop =>
        (prop.apartments || []).map(ap => ({
          value: ap.id,
          label: ap.name,
        })),
      )

    setOptionsApartment(listApart)
  }

  const handleChangeOptionApartment = (value: any) => {
    setValue("apartment_id", value.value)
    setSelectedOptionApartment(value)
  }

  const methods = useForm<UpdateWorkForm>({
    resolver: yupResolver(UpdateWorkSchema),
    defaultValues: {
      apartment_id: "",
      service_id: "",
      contractor_id: "",
      start_date: "",
      customer_notes: "",
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
            data[key] !== "" &&
            data[key].length !== 0
          ) {
            if (key != "images") {
              formData.append(key, data[key])
            } else {
              formData.append("images[]", data[key])
            }
          }
        }

        if (formData.entries().next().done) {
          setIsSubmitUpdate(false)
          toast.warning("No changes were made")
          return
        }

        formData.append("_method", "PATCH")

        axios
          .post(`${settingsApp.api.base}/works/${dataEdit.id}`, formData, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              ContentType: "application/json",
              Accept: "application/json",
            },
          })
          .then(response => {
            setIsSubmitUpdate(false)
            const data: any = response.data
            if (!!data) {
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

  React.useEffect(() => {
    if (!!listServices) {
      setOptionsServices(listServices)
    }
    if (!!listContractors) {
      setOptionsContractor(listContractors)
    }
    if (!!listResidentials) {
      setOptionsResidential(listResidentials)
    }
    if (!!listProperties) {
      setListCurrentProperty(listProperties)
    }
  }, [listServices, listContractors, listResidentials, listProperties])
  // React.useEffect(() => {
  //   const storedToken = handleGetToken()

  //   if (!!storedToken) {
  //     axios
  //       .get(`${settingsApp.api.base}/services`, {
  //         headers: {
  //           Authorization: `Bearer ${storedToken}`,
  //         },
  //       })
  //       .then(response => {
  //         const listData: ServiceDTO[] = response.data as ServiceDTO[]
  //         const listServices = (listData || []).map(data => ({
  //           value: data.id,
  //           label: data.name,
  //         }))
  //         setOptionsServices(listServices.filter((role: any) => !!role))
  //       })

  //     axios
  //       .get(`${settingsApp.api.base}/users?include=role`, {
  //         headers: {
  //           Authorization: `Bearer ${storedToken}`,
  //         },
  //       })
  //       .then(response => {
  //         const listData: UserDTO[] = response.data as UserDTO[]
  //         const contractors = (listData || []).filter(user =>
  //           user.role.some(
  //             ro => ro.name.toLowerCase() === "contractor".toLowerCase(),
  //           ),
  //         )
  //         const listContractors = (contractors || []).map(data => ({
  //           value: data.id,
  //           label: data.firstName,
  //         }))
  //         setOptionsContractor(listContractors.filter((cont: any) => !!cont))
  //       })

  //     axios
  //       .get(`${settingsApp.api.base}/residentials?include=apartments`, {
  //         headers: {
  //           Authorization: `Bearer ${storedToken}`,
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       })
  //       .then(response => {
  //         const dataResponse: PropertyDTO[] = response.data as PropertyDTO[]
  //         if (!!dataResponse) {
  //           const listResidentials = (dataResponse || []).map(data => ({
  //             value: data.id,
  //             label: data.name,
  //           }))
  //           setListCurrentProperty(dataResponse)
  //           setOptionsResidential(listResidentials.filter((res: any) => !!res))
  //         }
  //       })
  //   }
  // }, [isOpen, dataEdit])

  const [listFiles, setListFiles] = React.useState<File[]>([]) // Inicializamos como un array vacío

  const onDrop = React.useCallback(
    (acceptedFiles: any, rejectedFiles: any) => {
      if (acceptedFiles.length > 0) {
        const updatedFiles = [...listFiles]
        acceptedFiles.forEach((file: any) => {
          // if (updatedFiles.length >= 5) {
          //   toast.error("Se permite un máximo de 5 archivos.")
          //   return
          // }
          updatedFiles.push(file)

          const reader = new FileReader()

          reader.onabort = () => toast.error("File reading was aborted")
          reader.onerror = () => toast.error("File reading has failed")
          reader.onload = () => {
            const binaryStr = reader.result
            if (binaryStr instanceof ArrayBuffer) {
              const blob = new Blob([binaryStr], { type: file.type })
              const imageUrl = URL.createObjectURL(blob)
              // Aquí puedes hacer algo con imageUrl, como agregarlo a un estado de URLs
            } else {
              toast.error("Error al leer el archivo.")
            }
          }
          reader.readAsArrayBuffer(file)
        })

        setValue("images[]", updatedFiles)
        setListFiles(updatedFiles)
      }

      if (rejectedFiles.length > 0) {
        toast.error(
          'Solo se permite un archivo y debe ser de tipo "PNG", "JPG" o "JPEG".',
        )
      }
    },
    [listFiles],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  const handleDeleteOneFile = React.useCallback(
    (fileToDelete: File) => {
      setListFiles(prevFiles => prevFiles.filter(file => file !== fileToDelete))
    },
    [listFiles],
  )

  React.useEffect(() => {
    setValue("images[]", listFiles)
  }, [listFiles])

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Work">
      <FormContainer>
        <WrapperInput>
          <label htmlFor="firstname-create-user">
            Start date: <span>{formatToDDMMYYYY(dataEdit?.startDate)}</span>
          </label>
          <DatePicker
            id="date-create-apartment"
            showIcon
            selected={daySelected}
            icon={<Calendar4 />}
            toggleCalendarOnIconClick
            onChange={(date: any) => {
              setDaySelected(date)
              setValue("start_date", date)
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
          {!!(errors.start_date as any)?.message && (
            <ErrorMessage>{(errors.start_date as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="password-create-user">
            Services: <span>{dataEdit?.service.name}</span>
          </label>
          <Select
            defaultValue={selectedOptionServices}
            onChange={handleChangeOptionService}
            options={optionsServices}
            isSearchable={false}
            styles={selectStyles}
          />
          {!!(errors.service_id as any)?.message && (
            <ErrorMessage>{(errors.service_id as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="password-create-user">
            Contractors:{" "}
            <span>
              {!!dataEdit &&
                !!dataEdit?.contractor &&
                dataEdit?.contractor.firstName}
            </span>
          </label>
          <Select
            defaultValue={selectedOptionContractor}
            onChange={handleChangeOptionContractor}
            options={optionsContractors}
            isSearchable={false}
            styles={selectStyles}
          />
          {!!(errors.contractor_id as any)?.message && (
            <ErrorMessage>
              {(errors.contractor_id as any)?.message}
            </ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="residential-create-user">
            Residentials: <span>{dataEdit?.residential.name}</span>
          </label>
          <Select
            defaultValue={selectedOptionResidential}
            onChange={handleChangeOptionResidential}
            options={optionsResidential}
            isSearchable={false}
            styles={selectStyles}
          />
          {!!(errors.apartment_id as any)?.message && (
            <ErrorMessage>{(errors.apartment_id as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="apartment-create-user">
            Apartments: <span>{dataEdit?.apartment.name}</span>
          </label>
          <Select
            defaultValue={selectedOptionApartment}
            onChange={handleChangeOptionApartment}
            options={optionsApartment}
            isSearchable={false}
            styles={selectStyles}
          />
          {!!(errors.apartment_id as any)?.message && (
            <ErrorMessage>{(errors.apartment_id as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="notes-create-work">
            Notes: <span>{dataEdit?.customerNotes}</span>
          </label>
          <Textarea
            id="notes-create-work"
            placeholder="Enter notes"
            icon={TextDescription}
            register={register("customer_notes")}
          />
          {!!(errors.customer_notes as any)?.message && (
            <ErrorMessage>
              {(errors.customer_notes as any)?.message}
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

export default ModalEditWork
