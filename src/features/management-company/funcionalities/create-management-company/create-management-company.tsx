import React from "react"
import HeaderSection from "../../../../components/header-section/header-section"
import {
  ContainerButton,
  ContainerDownInputs,
  ContainerStepperCreate,
  ItemStepper,
  ResidentialFormStyles,
  SteppersStyles,
} from "./create-management-company.styles"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { CreateUserResponseDTO } from "../../../../core/models/interfaces/user-model"
import { pathRoutes } from "../../../../config/routes/path"
import {
  ErrorMessage,
  WrapperInput,
} from "../../../../config/theme/global-styles"
import Input from "../../../../components/input/input"
import Button from "../../../../components/button/button"
import { FolderOpen } from "@styled-icons/fa-regular/FolderOpen"
import "react-datepicker/dist/react-datepicker.css"
import { settingsApp } from "../../../../config/environment/settings"
import useDataUser from "../../../../utils/use-data-user"
import {
  CreateCompanyForm,
  CreateCompanySchema,
} from "../../../../core/models/schemas/company-schema"
import { MessageResponsedDTO } from "../../../../core/models/interfaces/general-model"
import { APP_MENU } from "../../../../constants/app"
import { setErrResponse } from "../../../../utils/erros-util"

const CreateManagementCompany: React.FC = () => {
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
    if (!!data && !data?.company.includes(APP_MENU.CREATE)) {
      return
    }
  }, [])
  const [stepActive, setStepActive] = React.useState<number>(1)
  const [isSubmitUserCreate, setIsSubmitUserCreate] =
    React.useState<boolean>(false)

  const methods = useForm<CreateCompanyForm>({
    resolver: yupResolver(CreateCompanySchema),
    defaultValues: {
      name: "",
      managerName: "",
      managerPhone: "",
      assitantManagerName: "",
      assitantManagerPhone: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    setValue,
  } = methods

  const handleSubmit = React.useCallback((data: any) => {
    setIsSubmitUserCreate(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("manager_name", data.managerName)
      formData.append("manager_phone", data.managerPhone)
      formData.append("assitant_manager_name", data.assitantManagerName)
      formData.append("assitant_manager_phone", data.assitantManagerPhone)

      axios
        .post(`${settingsApp.api.base}/management_companies`, formData, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            ContentType: "multipart/form-data",
            Accept: "multipart/form-data",
          },
        })
        .then(response => {
          setIsSubmitUserCreate(false)
          const data: MessageResponsedDTO = response.data as MessageResponsedDTO
          if (!!data && !!data.message) {
            toast.success(data.message)
            navigate(pathRoutes.PROPERTIES.LIST)
          }
        })
        .catch(err => {
          setIsSubmitUserCreate(false)
          setErrResponse(err)
        })
    }
  }, [])

  return (
    <>
      <HeaderSection
        title="Management Company"
        subtitle="Create Management Company"
      />
      <ContainerStepperCreate>
        <SteppersStyles>
          <ItemStepper isActive={stepActive == 1}>
            <div>
              <span onClick={() => setStepActive(1)}>1</span>
            </div>
            <span>Details</span>
            <span />
          </ItemStepper>
          <ItemStepper isActive={false}>
            <span />
          </ItemStepper>
        </SteppersStyles>
        {stepActive == 1 && (
          <ResidentialFormStyles>
            <ContainerDownInputs>
              <WrapperInput>
                <label htmlFor="name-create-company">Name</label>
                <Input
                  id="name-create-company"
                  placeholder="Enter name"
                  icon={FolderOpen}
                  register={register("name")}
                />
                {!!(errors.name as any)?.message && (
                  <ErrorMessage>{(errors.name as any)?.message}</ErrorMessage>
                )}
              </WrapperInput>
              <WrapperInput>
                <label htmlFor="managername-create-company">Manager Name</label>
                <Input
                  id="managername-create-company"
                  placeholder="Enter address"
                  icon={FolderOpen}
                  register={register("managerName")}
                />
                {!!(errors.managerName as any)?.message && (
                  <ErrorMessage>
                    {(errors.managerName as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
              <WrapperInput>
                <label htmlFor="phone-manager-create-company">
                  Phone Manager
                </label>
                <Input
                  id="phone-manager-create-company"
                  placeholder="Enter phone manager"
                  icon={FolderOpen}
                  register={register("managerPhone")}
                />
                {!!(errors.managerPhone as any)?.message && (
                  <ErrorMessage>
                    {(errors.managerPhone as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
              <WrapperInput>
                <label htmlFor="supervisorname-create-company">
                  Supervisor Name
                </label>
                <Input
                  id="supervisorname-create-company"
                  placeholder="Enter Supervisor name"
                  icon={FolderOpen}
                  register={register("assitantManagerName")}
                />
                {!!(errors.assitantManagerName as any)?.message && (
                  <ErrorMessage>
                    {(errors.assitantManagerName as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
              <WrapperInput>
                <label htmlFor="phone-supervisor-create-company">
                  Phone Supervisor
                </label>
                <Input
                  id="phone-supervisor-create-company"
                  placeholder="Enter phone supervisor"
                  icon={FolderOpen}
                  register={register("assitantManagerPhone")}
                />
                {!!(errors.assitantManagerPhone as any)?.message && (
                  <ErrorMessage>
                    {(errors.assitantManagerPhone as any)?.message}
                  </ErrorMessage>
                )}
              </WrapperInput>
            </ContainerDownInputs>
          </ResidentialFormStyles>
        )}
        <ContainerButton>
          <Button
            onClick={submitWrapper(handleSubmit)}
            text="Create"
            isLoading={isSubmitUserCreate}
          />
        </ContainerButton>
      </ContainerStepperCreate>
    </>
  )
}

export default CreateManagementCompany
