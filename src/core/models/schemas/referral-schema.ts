import { InferType, object, string, boolean } from "yup"

export const ResetPasswordSchema = object({
  contract_responsible: boolean().required("Ingresa un responsable"), // Aqui puedes elegir si usar booleano o string
  own_first_name: string().required("Ingresa un nombre"),
  own_last_name: string().required("Ingresa un apellido"),
  own_cedula: string().required("Ingresa una cédula"),
  own_phone: string().required("Ingresa un teléfono"),
  own_source_income: string().required("Ingresa una fuente de ingreso"),
  own_receiving_income: string().required(
    "Ingresa una modalidad de recibir ingresos",
  ),
  own_monthly_icome_usd: string().required(
    "Ingresa un ingreso mensual bruto en dólares",
  ),
  own_profession: string().required("Ingresa una profesión"),
  cpm_live_property: boolean().required("Ingresa una propiedad"),

  cpm_first_name: string().when("contract_responsible", {
    is: false,
    then: string().required("Ingresa un nombre del acompañante"),
    otherwise: string(),
  }),
  cpm_last_name: string().when("contract_responsible", {
    is: false,
    then: string().required("Ingresa un apellido del acompañante"),
    otherwise: string(),
  }),
  cpm_source_income: string().when("contract_responsible", {
    is: false,
    then: string().required("Ingresa una fuente de ingreso del acompañante"),
    otherwise: string(),
  }),
  cpm_receiving_income: string().when("contract_responsible", {
    is: false,
    then: string().required(
      "Ingresa una modalidad de recibir ingresos del acompañante",
    ),
    otherwise: string(),
  }),
  cpm_monthly_icome_usd: string().when("contract_responsible", {
    is: false,
    then: string().required(
      "Ingresa un ingreso mensual bruto en dólares del acompañante",
    ),
    otherwise: string(),
  }),
  cpm_profession: string().when("contract_responsible", {
    is: false,
    then: string().required("Ingresa una profesión del acompañante"),
    otherwise: string(),
  }),
})

export type ResetPasswordForm = InferType<typeof ResetPasswordSchema>
