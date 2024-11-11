/* eslint-disable no-control-regex */
/* eslint-disable no-useless-escape */
import { InferType, mixed, object, string } from "yup"

const rgxEmail =
  /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/

export const CreateUserSchema = object({
  firstName: string().required("Enter a firstname"),
  lastName: string().required("Enter a lastname"),
  email: string()
    .matches(rgxEmail, "Enter a valid email")
    .required("Enter a email"),
  contactNumber: string().required("Enter a contact number"),
  picture: mixed().required("Enter a image"),
  role: string().required("Enter a role"),
  password: string().required("Enter a password"),
})

export const UpdateUserSchema = object({
  id: string(),
  firstName: string(),
  lastName: string(),
  contactNumber: string(),
  picture: mixed(),
  role: string(),
  email: string(),
  password: string(),
})

export type CreateUserForm = InferType<typeof CreateUserSchema>
export type UpdateUserForm = InferType<typeof UpdateUserSchema>
