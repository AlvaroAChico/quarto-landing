import React from "react"
import { useNavigate } from "react-router-dom"
import { pathRoutes } from "../../../../config/routes/path"
import HeaderSection from "../../../../components/header-section/header-section"
import { FormContainer } from "../create-service.styles"
import {
  ErrorMessage,
  WrapperInput,
} from "../../../../config/theme/global-styles"
import Input from "../../../../components/input/input"
import Button from "../../../../components/button/button"
import { useForm } from "react-hook-form"
import {
  CreateServiceForm,
  CreateServiceSchema,
} from "../../../../core/models/schemas/service-schema"
import useDataUser from "../../../../utils/use-data-user"
import { yupResolver } from "@hookform/resolvers/yup"
import { NumberSymbolSquare } from "@styled-icons/fluentui-system-filled/NumberSymbolSquare"
import { Text } from "@styled-icons/entypo/Text"
import axios from "axios"
import { settingsApp } from "../../../../config/environment/settings"
import { MessageResponsedDTO } from "../../../../core/models/interfaces/general-model"
import { toast } from "sonner"
import { APP_MENU } from "../../../../constants/app"
import { setErrResponse } from "../../../../utils/erros-util"

const CreateService: React.FC = () => {
  const { handleGetToken, clearAllDataAPP, handleGetPermissions } =
    useDataUser()
  const navigate = useNavigate()

  React.useEffect(() => {
    // Verify Token
    const storedToken = handleGetToken()
    if (!storedToken) {
      clearAllDataAPP()
      navigate(pathRoutes.SIGN_IN)
    }
    // Verify Permissions
    const data = handleGetPermissions()
    if (!!data && !data?.apartment.includes(APP_MENU.CREATE)) {
      return
    }
  }, [])
  const [isSubmitServiceCreate, setIsSubmitServiceCreate] =
    React.useState<boolean>(false)

  const methods = useForm<CreateServiceForm>({
    resolver: yupResolver(CreateServiceSchema),
    defaultValues: {
      code: "",
      name: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    setValue,
  } = methods

  const handleSubmit = React.useCallback((data: any) => {
    setIsSubmitServiceCreate(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      const formData = new FormData()
      formData.append("code", data.code)
      formData.append("name", data.name)

      axios
        .post(`${settingsApp.api.base}/services`, formData, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            ContentType: "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          setIsSubmitServiceCreate(false)
          const data: MessageResponsedDTO = response.data as MessageResponsedDTO
          if (!!data && !!data.message) {
            toast.success(data.message)
            navigate(pathRoutes.SERVICES.LIST)
          }
        })
        .catch(err => {
          setIsSubmitServiceCreate(false)
          setErrResponse(err)
        })
    }
  }, [])

  return (
    <div>
      <HeaderSection title="Service" subtitle="Create service" />
      <FormContainer>
        <WrapperInput>
          <label htmlFor="code-create-service"> Code</label>
          <Input
            id="code-create-service"
            placeholder="Enter code"
            icon={NumberSymbolSquare}
            register={register("code")}
          />
          {!!(errors.code as any)?.message && (
            <ErrorMessage>{(errors.code as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="name-create-service">Name</label>
          <Input
            id="name-create-service"
            placeholder="Enter name"
            icon={Text}
            register={register("name")}
          />
          {!!(errors.name as any)?.message && (
            <ErrorMessage>{(errors.name as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <Button
          onClick={submitWrapper(handleSubmit)}
          text="Create Service"
          isLoading={isSubmitServiceCreate}
        />
      </FormContainer>
    </div>
  )
}

export default CreateService
