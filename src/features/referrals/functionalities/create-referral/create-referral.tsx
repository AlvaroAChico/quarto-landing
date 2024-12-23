import React from "react"
import HeaderSection from "../../../../components/header-section/header-section"
import {
  ContainerResFormStyles,
  ContainerSingleOption,
  ContainerTwoColumns,
  ItemSingleOp,
  ResidentialFormStyles,
  TitleCompanyForm,
} from "./create-referral.styles"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {
  ErrorMessage,
  selectStyles,
  WrapperInput,
} from "../../../../config/theme/global-styles"
import Input from "../../../../components/input/input"
import Button from "../../../../components/button/button"
import useDataUser from "../../../../utils/use-data-user"
import Select from "react-select"
import Textarea from "../../../../components/textarea/textarea"
import { setErrResponse } from "../../../../utils/erros-util"
import {
  CreateReferralForm,
  CreateReferralSchema,
} from "../../../../core/models/schemas/referral-schema"
import { referralRepository } from "../../../../api/repositories/referral-repository"
import { pathRoutes } from "../../../../config/routes/paths"
import { MessageResponsedDTO } from "../../../../core/models/interfaces/general-model"

const CreateReferral: React.FC = () => {
  const [nroResponsible, setNroResponsible] = React.useState<number>(0)
  const [liveProperty, setLiveProperty] = React.useState<number>(0)

  const [isSubmitReferralCreate, setIsSubmitReferralCreate] =
    React.useState<boolean>(false)
  const { handleGetToken } = useDataUser()
  const navigate = useNavigate()

  const fetchData = async (url: string) => {
    const storedToken = handleGetToken()
    if (!storedToken) {
      throw new Error("No token found")
    }

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      return response.data
    } catch (err) {
      setErrResponse(err)
      throw err
    }
  }

  const methods = useForm<CreateReferralForm>({
    resolver: yupResolver(CreateReferralSchema),
    defaultValues: {
      contract_responsible: undefined,
      own_first_name: "",
      own_last_name: "",
      own_cedula: "",
      own_phone: "",
      own_source_income: "",
      own_receiving_income: "",
      own_monthly_income_usd: "",
      own_profession: "",
      cpm_live_property: undefined,
      cpm_first_name: "",
      cpm_last_name: "",
      cpm_source_income: "",
      cpm_receiving_income: "",
      cpm_monthly_income_usd: "",
      cpm_profession: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    setValue,
  } = methods

  const handleSubmit = React.useCallback(async (data: any) => {
    setIsSubmitReferralCreate(true)
    try {
      console.log("Data => ", data)
      const response: MessageResponsedDTO =
        (await referralRepository.createReferral(data)) as MessageResponsedDTO

      if (!!response && !!response.message) {
        navigate(pathRoutes.REFERRALS.to)
      }
      setIsSubmitReferralCreate(false)
    } catch (error) {
      setIsSubmitReferralCreate(false)
    }
  }, [])

  const handleUpdateNroResponsible = (value: number) => () => {
    setValue("contract_responsible", value == 1)
    setValue("cpm_live_property", undefined)
    setValue("cpm_first_name", "")
    setValue("cpm_last_name", "")
    setValue("cpm_source_income", "")
    setValue("cpm_receiving_income", "")
    setValue("cpm_monthly_income_usd", "")
    setValue("cpm_profession", "")
    setNroResponsible(value)
  }

  const handleUpdateLiveProperty = (value: number) => () => {
    setValue("cpm_live_property", value == 1)
    setLiveProperty(value)
  }

  return (
    <>
      <HeaderSection />
      <ResidentialFormStyles>
        <ContainerResFormStyles>
          <h4>¿Quién será el responsable del contrato?</h4>
          <ContainerSingleOption nroResponsible={nroResponsible}>
            <ItemSingleOp onClick={handleUpdateNroResponsible(1)}>
              Solamente la persona en cuestion
            </ItemSingleOp>
            <ItemSingleOp onClick={handleUpdateNroResponsible(2)}>
              La persona y un acompañante
            </ItemSingleOp>
          </ContainerSingleOption>
          {!!(errors.contract_responsible as any)?.message && (
            <ErrorMessage>
              {(errors.contract_responsible as any)?.message}
            </ErrorMessage>
          )}
          <ContainerTwoColumns>
            <WrapperInput>
              <label htmlFor="own_first_name">Nombre</label>
              <Input
                id="own_first_name"
                placeholder="Introduce la respuesta"
                register={register("own_first_name")}
              />
              {!!(errors.own_first_name as any)?.message && (
                <ErrorMessage>
                  {(errors.own_first_name as any)?.message}
                </ErrorMessage>
              )}
            </WrapperInput>

            <WrapperInput>
              <label htmlFor="own_last_name">Apellido</label>
              <Input
                id="own_last_name"
                placeholder="Introduce la respuesta"
                register={register("own_last_name")}
              />
              {!!(errors.own_last_name as any)?.message && (
                <ErrorMessage>
                  {(errors.own_last_name as any)?.message}
                </ErrorMessage>
              )}
            </WrapperInput>

            <WrapperInput>
              <label htmlFor="own_cedula">Cédula</label>
              <Input
                id="own_cedula"
                placeholder="Introduce la respuesta"
                register={register("own_cedula")}
                type="number"
              />
              {!!(errors.own_cedula as any)?.message && (
                <ErrorMessage>
                  {(errors.own_cedula as any)?.message}
                </ErrorMessage>
              )}
            </WrapperInput>

            <WrapperInput>
              <label htmlFor="own_phone">Número de teléfono</label>
              <Input
                id="own_phone"
                placeholder="Introduce la respuesta"
                register={register("own_phone")}
                type="number"
              />
              {!!(errors.own_phone as any)?.message && (
                <ErrorMessage>
                  {(errors.own_phone as any)?.message}
                </ErrorMessage>
              )}
            </WrapperInput>

            <WrapperInput>
              <label htmlFor="own_source_income">
                ¿Cuál es tu principal fuente de ingresos?
              </label>
              <Input
                id="own_source_income"
                placeholder="Introduce la respuesta"
                register={register("own_source_income")}
              />
              {!!(errors.own_source_income as any)?.message && (
                <ErrorMessage>
                  {(errors.own_source_income as any)?.message}
                </ErrorMessage>
              )}
            </WrapperInput>

            <WrapperInput>
              <label htmlFor="own_receiving_income">
                ¿Cómo sueles recibir tus ingresos?
              </label>
              <Input
                id="own_receiving_income"
                placeholder="Introduce la respuesta"
                register={register("own_receiving_income")}
              />
              {!!(errors.own_receiving_income as any)?.message && (
                <ErrorMessage>
                  {(errors.own_receiving_income as any)?.message}
                </ErrorMessage>
              )}
            </WrapperInput>

            <WrapperInput>
              <label htmlFor="own_monthly_income_usd">
                ¿Cuál es tu ingreso mensual bruto en dólares?
              </label>
              <Input
                id="own_monthly_income_usd"
                placeholder="Introduce la respuesta"
                register={register("own_monthly_income_usd")}
              />
              {!!(errors.own_monthly_income_usd as any)?.message && (
                <ErrorMessage>
                  {(errors.own_monthly_income_usd as any)?.message}
                </ErrorMessage>
              )}
            </WrapperInput>

            <WrapperInput>
              <label htmlFor="own_profession">¿Cuál es tu profesión?</label>
              <Input
                id="own_profession"
                placeholder="Introduce la respuesta"
                register={register("own_profession")}
              />
              {!!(errors.own_profession as any)?.message && (
                <ErrorMessage>
                  {(errors.own_profession as any)?.message}
                </ErrorMessage>
              )}
            </WrapperInput>
          </ContainerTwoColumns>
          {nroResponsible === 2 && (
            <>
              <TitleCompanyForm>
                <h3>Información sobre el acompañante</h3>
              </TitleCompanyForm>
              <h4>¿Vvirá en la propiedad?</h4>
              <ContainerSingleOption nroResponsible={liveProperty}>
                <ItemSingleOp onClick={handleUpdateLiveProperty(1)}>
                  Sí
                </ItemSingleOp>
                <ItemSingleOp onClick={handleUpdateLiveProperty(2)}>
                  No
                </ItemSingleOp>
              </ContainerSingleOption>
              {!!(errors.cpm_live_property as any)?.message && (
                <ErrorMessage>
                  {(errors.cpm_live_property as any)?.message}
                </ErrorMessage>
              )}
              <ContainerTwoColumns>
                <WrapperInput>
                  <label htmlFor="cpm_first_name">Nombre</label>
                  <Input
                    id="cpm_first_name"
                    placeholder="Introduce la respuesta"
                    register={register("cpm_first_name")}
                  />
                  {!!(errors.cpm_first_name as any)?.message && (
                    <ErrorMessage>
                      {(errors.cpm_first_name as any)?.message}
                    </ErrorMessage>
                  )}
                </WrapperInput>

                <WrapperInput>
                  <label htmlFor="cpm_last_name">Apellido</label>
                  <Input
                    id="cpm_last_name"
                    placeholder="Introduce la respuesta"
                    register={register("cpm_last_name")}
                  />
                  {!!(errors.cpm_last_name as any)?.message && (
                    <ErrorMessage>
                      {(errors.cpm_last_name as any)?.message}
                    </ErrorMessage>
                  )}
                </WrapperInput>

                <WrapperInput>
                  <label htmlFor="cpm_source_income">
                    ¿Cuál es la principal fuente de ingresos?
                  </label>
                  <Input
                    id="cpm_source_income"
                    placeholder="Introduce la respuesta"
                    register={register("cpm_source_income")}
                  />
                  {!!(errors.cpm_source_income as any)?.message && (
                    <ErrorMessage>
                      {(errors.cpm_source_income as any)?.message}
                    </ErrorMessage>
                  )}
                </WrapperInput>

                <WrapperInput>
                  <label htmlFor="cpm_receiving_income">
                    ¿Cómo suele recibir los ingresos?
                  </label>
                  <Input
                    id="cpm_receiving_income"
                    placeholder="Introduce la respuesta"
                    register={register("cpm_receiving_income")}
                  />
                  {!!(errors.cpm_receiving_income as any)?.message && (
                    <ErrorMessage>
                      {(errors.cpm_receiving_income as any)?.message}
                    </ErrorMessage>
                  )}
                </WrapperInput>

                <WrapperInput>
                  <label htmlFor="cpm_monthly_income_usd">
                    ¿Cuál es el ingreso mensual bruto en dólares?
                  </label>
                  <Input
                    id="cpm_monthly_income_usd"
                    placeholder="Introduce la respuesta"
                    register={register("cpm_monthly_income_usd")}
                  />
                  {!!(errors.cpm_monthly_income_usd as any)?.message && (
                    <ErrorMessage>
                      {(errors.cpm_monthly_income_usd as any)?.message}
                    </ErrorMessage>
                  )}
                </WrapperInput>

                <WrapperInput>
                  <label htmlFor="cpm_profession">¿Cuál es la profesión?</label>
                  <Input
                    id="cpm_profession"
                    placeholder="Introduce la respuesta"
                    register={register("cpm_profession")}
                  />
                  {!!(errors.cpm_profession as any)?.message && (
                    <ErrorMessage>
                      {(errors.cpm_profession as any)?.message}
                    </ErrorMessage>
                  )}
                </WrapperInput>
              </ContainerTwoColumns>
            </>
          )}
          <Button
            onClick={submitWrapper(handleSubmit)}
            text="Añadir referido"
            customStyles={"max-width: 200px; margin: auto; width: 100%;"}
          />
        </ContainerResFormStyles>
      </ResidentialFormStyles>
    </>
  )
}

export default CreateReferral
