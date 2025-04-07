/* eslint-disable no-control-regex */
/* eslint-disable no-useless-escape */
import { array, InferType, number, object, ref, string } from "yup"

const rgxEmail =
  /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/

export const RegisterSchema = object({
  email: string()
    .matches(rgxEmail, "Ingresa un email válido")
    .required("Ingresa un email"),
  password: string().required("Ingresa una contraseña"),
  password_confirmation: string()
    .required("Confirma tu contraseña")
    .oneOf([ref("password")], "Las contraseñas deben coincidir"),
})

export const RegisterStep01Schema = object({
  first_name: string().required("Ingresa un nombre"),
  last_name: string().required("Ingresa un apellido"),
  document_type: string().required("Selecciona un tipo de documento"),
  document_number: string().required("Ingresa un documento"),
  code_phone: string().required("Selecciona un código de pais"),
  phone: string().required("Ingresa un número de telefono"),
})

export const RegisterStep02Schema = object({
  realtor: number().required("Debes especificar si eres agente"),
  interest: array().of(string()).required("Selecciona tus intereses"),
  token: string().required(""),
})

export type RegisterForm = InferType<typeof RegisterSchema>

export type RegisterStep01Form = InferType<typeof RegisterStep01Schema>
export type RegisterStep02Form = InferType<typeof RegisterStep02Schema>

export const FullRegisterSchema = object().shape({
  ...RegisterStep01Schema.fields,
  ...RegisterStep02Schema.fields,
})
