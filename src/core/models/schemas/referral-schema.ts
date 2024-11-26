import { InferType, object, string, boolean } from "yup"

export const CreateReferralSchema = object({
  contract_responsible: boolean().required("Ingresa un responsable"),
  own_first_name: string().required("Ingresa un nombre"),
  own_last_name: string().required("Ingresa un apellido"),
  own_cedula: string().required("Ingresa una cédula"),
  own_phone: string().required("Ingresa un teléfono"),
  own_source_income: string().required("Ingresa una fuente de ingreso"),
  own_receiving_income: string().required(
    "Ingresa una modalidad de recibir ingresos",
  ),
  own_monthly_income_usd: string().required(
    "Ingresa un ingreso mensual bruto en dólares",
  ),
  own_profession: string().required("Ingresa una profesión"),

  cpm_live_property: boolean().when("contract_responsible", {
    is: false,
    then: (y: any) => y.required("Ingresa una respuesta"),
  }),
  cpm_first_name: string().when("contract_responsible", {
    is: false,
    then: (y: any) => y.required("Ingresa un nombre del acompañante"),
  }),
  cpm_last_name: string().when("contract_responsible", {
    is: false,
    then: (y: any) => y.required("Ingresa un apellido del acompañante"),
  }),
  cpm_source_income: string().when("contract_responsible", {
    is: false,
    then: (y: any) =>
      y.required("Ingresa una fuente de ingreso del acompañante"),
  }),
  cpm_receiving_income: string().when("contract_responsible", {
    is: false,
    then: (y: any) =>
      y.required(
        "Ingresa u(y: any) => y.na modalidad de recibir ingresos del acompañante",
      ),
  }),
  cpm_monthly_income_usd: string().when("contract_responsible", {
    is: false,
    then: (y: any) =>
      y.required(
        "Ingresa u(y: any) => y.n ingreso mensual bruto en dólares del acompañante",
      ),
  }),
  cpm_profession: string().when("contract_responsible", {
    is: false,
    then: (y: any) => y.required("Ingresa una profesión del acompañante"),
  }),
})

export type CreateReferralForm = InferType<typeof CreateReferralSchema>
