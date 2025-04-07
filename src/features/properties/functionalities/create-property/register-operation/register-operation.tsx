import { FC, useState } from "react"
import {
  ContainerBenefits,
  ContainerButton,
  ContainerOperationForm,
  CustomDetailCard,
  ItemBenefit,
  ItemBoxDescription,
  ItemBoxOptions,
  ItemCheckbox,
  StyckyContainer,
} from "../create-property.styles"
import { ErrorMessage } from "../../../../../config/theme/global-styles"
import { useForm } from "react-hook-form"
import {
  CreatePropStep01Form,
  CreatePropStep01Schema,
  CreatePropStep03Form,
} from "../../../../../core/models/schemas/property-schema"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "../../../../../components/button/button"
import BigKeyIMG from "../../../../../assets/img/big_key_step.png"
import BigVentaIMG from "../../../../../assets/img/big_venta_step.png"
import BigCheckIMG from "../../../../../assets/img/select_check_box_step.png"

interface IOwnProps {
  setValue03: (field: keyof CreatePropStep03Form, value: any) => void
  handleSubmit: (data: CreatePropStep01Form) => void
  handleActiveCheck: (n: number) => void
}

const RegisterOperation: FC<IOwnProps> = ({
  setValue03,
  handleSubmit,
  handleActiveCheck,
}) => {
  const [activeCheckMode, setActiveCheckMode] = useState<number>(1)

  const handleActiveCheckMode = (value: number) => () => {
    setValue("type_id", `${value}`)
    // setValue("category_id", `${value}`)
    setValue03("checkMode", value)
    setActiveCheckMode(value)
    handleActiveCheck(value)
  }

  const methods = useForm<CreatePropStep01Form>({
    resolver: yupResolver(CreatePropStep01Schema),
    defaultValues: {
      type_id: "1",
      plan_id: "1",
      category_id: "1",
      full_address: ".",
      title: ".",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors: errors },
    setValue: setValue,
  } = methods

  return (
    <ContainerOperationForm>
      <div>
        <StyckyContainer>
          <h3>¿Que deseas hacer con tu inmueble?</h3>
          <ItemBoxOptions>
            <ItemCheckbox
              active={activeCheckMode == 1}
              onClick={handleActiveCheckMode(1)}
            >
              <div>
                <span />
                Alquiler
              </div>
            </ItemCheckbox>
            <ItemCheckbox
              active={activeCheckMode == 2}
              onClick={handleActiveCheckMode(2)}
            >
              <div>
                <span />
                Venta
              </div>
            </ItemCheckbox>
            <ItemCheckbox
              active={activeCheckMode == 3}
              onClick={handleActiveCheckMode(3)}
            >
              <div>
                <span />
                Ambos (Alquiler y Venta)
              </div>
            </ItemCheckbox>
            {!!(errors.type_id as any)?.message && (
              <ErrorMessage>{(errors.type_id as any)?.message}</ErrorMessage>
            )}
            <ContainerButton>
              <Button
                onClick={submitWrapper(handleSubmit)}
                text={"Siguiente"}
                customStyles={"max-width: none !important;"}
              />
            </ContainerButton>
          </ItemBoxOptions>
        </StyckyContainer>
      </div>
      <ItemBoxDescription>
        {(activeCheckMode == 1 || activeCheckMode == 3) && (
          <CustomDetailCard>
            <img src={BigKeyIMG} />
            <h2>Alquiler</h2>
            <ContainerBenefits>
              <ItemBenefit>
                <img src={BigCheckIMG} />{" "}
                <p>
                  <strong>0% de comisión a Quarto</strong>
                </p>
                <span></span>
              </ItemBenefit>
              <ItemBenefit>
                <img src={BigCheckIMG} />{" "}
                <p>
                  <strong>4 meses de alquiler por adelantado</strong>
                  <span>
                    *Un mes será para su agente inmobiliario, en caso que no
                    aplique recibirás 3 meses.
                  </span>
                </p>
              </ItemBenefit>
              <ItemBenefit>
                <img src={BigCheckIMG} />{" "}
                <p>
                  <strong>
                    Garantía de pagos de mensuales por la completa duración del
                    contrato
                  </strong>
                  <span>*incluso si el inquilino incumple con sus pagos</span>
                </p>
              </ItemBenefit>
              <ItemBenefit>
                <img src={BigCheckIMG} />{" "}
                <p>
                  <strong>
                    Póliza de daños contra el inmueble y apoyo legal en
                    cualquier situación
                  </strong>
                  <span>*Cobertura hasta 12 veces el canon mensual</span>
                </p>
              </ItemBenefit>
              <ItemBenefit>
                <img src={BigCheckIMG} />{" "}
                <p>
                  <strong>
                    Quarto añadirá un 15% adicional al precio de la propiedad
                    (Por servicios operativos).
                  </strong>
                </p>
              </ItemBenefit>
            </ContainerBenefits>
          </CustomDetailCard>
        )}
        {(activeCheckMode == 2 || activeCheckMode == 3) && (
          <CustomDetailCard>
            <img src={BigVentaIMG} />
            <h2>Venta</h2>
            <ContainerBenefits>
              <ItemBenefit>
                <img src={BigCheckIMG} />{" "}
                <p>
                  <strong>5% de comisión inmobiliaria.</strong>
                  <span>
                    *Distribuida entre el representante del inquilino y el
                    representante del propietario.
                  </span>
                </p>
                <span></span>
              </ItemBenefit>
              <ItemBenefit>
                <img src={BigCheckIMG} />{" "}
                <p>
                  <strong>
                    Con el pago de la inicial el inquilino se muda la propiedad.
                  </strong>
                </p>
              </ItemBenefit>
              <ItemBenefit>
                <img src={BigCheckIMG} />{" "}
                <p>
                  <strong>
                    Con el pago de la última cuota se inicia el trámite para
                    traspasar la titularidad del inmueble.
                  </strong>
                </p>
              </ItemBenefit>
              <ItemBenefit>
                <img src={BigCheckIMG} />{" "}
                <p>
                  <strong>
                    Póliza de seguridad que apoya a cualquiera de las partes en
                    caso de conflicto legal o seguimiento de indemnización.
                  </strong>
                </p>
              </ItemBenefit>
            </ContainerBenefits>
          </CustomDetailCard>
        )}
      </ItemBoxDescription>
    </ContainerOperationForm>
  )
}

export default RegisterOperation
