import React from "react"
import Modal from "../../modal"
import Button from "../../../button/button"
import axios from "axios"
import { toast } from "sonner"
import { ContainerFormOwner, ContainerModal } from "./modal-add-owner.styles"
import { settingsApp } from "../../../../config/environment/settings"
import useDataUser from "../../../../utils/use-data-user"
import { MessageResponsedDTO } from "../../../../core/models/interfaces/general-model"
import { generalRepository } from "../../../../api/repositories/general-repository"
import { palette } from "../../../../config/theme/theme"
import {
  ErrorMessage,
  selectStyles,
  WrapperInput,
} from "../../../../config/theme/global-styles"
import Input from "../../../input/input"
import Select from "react-select"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  CreateOwnerForm,
  CreateOwnerSchema,
} from "../../../../core/models/schemas/owner-schema"
import { optionsTypesDocument } from "../../../../constants/app"
import { ownerRepository } from "../../../../api/repositories/owner-repository"

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
  // TypesDocs
  const [optionsTypesDocs, setOptionsTypesDocs] =
    React.useState<any>(optionsTypesDocument)
  const [seleOpTypesDocs, setSeleOpTypesDocs] = React.useState(null)
  const handleChangeOptionTypesDocs = (value: any) => {
    setValue("document_type", value.value)
    setSeleOpTypesDocs(value)
  }

  const [isSubmitForm, setIsSubmitForm] = React.useState<boolean>(false)

  const methods = useForm<CreateOwnerForm>({
    resolver: yupResolver(CreateOwnerSchema),
    defaultValues: {
      document_type: "",
      document_number: "",
      full_name: "",
      address: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    setValue,
    reset,
  } = methods

  const handleSubmit = async (data: any) => {
    setIsSubmitForm(true)
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

      const response: MessageResponsedDTO = (await ownerRepository.create(
        formData,
      )) as MessageResponsedDTO
      if (!!response) {
        toast.success(response.message)
        reset()
        setSeleOpTypesDocs(null)
        handleRefresh()
        handleClose()
      }
    } finally {
      setIsSubmitForm(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Agregar Propietario">
      <ContainerModal>
        <ContainerFormOwner>
          <WrapperInput>
            <label htmlFor="name-create-project">Nombre</label>
            <Input
              id="name-create-project"
              placeholder="Enter name"
              register={register("full_name")}
            />
            {!!(errors.full_name as any)?.message && (
              <ErrorMessage>{(errors.full_name as any)?.message}</ErrorMessage>
            )}
          </WrapperInput>
          <WrapperInput>
            <label htmlFor="typedocument-create-project">
              Tipo de documento
            </label>
            <Select
              id="typedocument-create-project"
              defaultValue={seleOpTypesDocs}
              onChange={handleChangeOptionTypesDocs}
              options={optionsTypesDocs}
              isSearchable={true}
              styles={selectStyles}
            />
            {!!(errors.document_type as any)?.message && (
              <ErrorMessage>
                {(errors.document_type as any)?.message}
              </ErrorMessage>
            )}
          </WrapperInput>
          <WrapperInput>
            <label htmlFor="document-create-project"># Documento</label>
            <Input
              id="document-create-project"
              placeholder="Enter document number"
              register={register("document_number")}
              type="number"
            />
            {!!(errors.document_number as any)?.message && (
              <ErrorMessage>
                {(errors.document_number as any)?.message}
              </ErrorMessage>
            )}
          </WrapperInput>
          <WrapperInput>
            <label htmlFor="document-create-project">Dirección</label>
            <Input
              id="address-create-project"
              placeholder="Enter address"
              register={register("address")}
            />
            {!!(errors.address as any)?.message && (
              <ErrorMessage>{(errors.address as any)?.message}</ErrorMessage>
            )}
          </WrapperInput>
        </ContainerFormOwner>
        <div>
          <Button
            onClick={handleClose}
            text="Cancelar"
            isLoading={false}
            customStyles={`
              box-shadow: none !important;
              background: #ff8d87 !important;
              color: white !important;
            `}
          />
          <Button
            onClick={submitWrapper(handleSubmit)}
            text="Crear"
            isLoading={isSubmitForm}
            customStyles={`
                background: ${palette.primaryColor} !important;
                box-shadow: none !important;
                color: white;
            `}
          />
        </div>
      </ContainerModal>
    </Modal>
  )
}

export default ModalAddOwner
