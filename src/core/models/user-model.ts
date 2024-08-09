/* eslint-disable no-control-regex */
/* eslint-disable no-useless-escape */
import { InferType, boolean, date, object, string } from "yup"

export interface User {
  id: string
  name: string
  allUsers: boolean
  permissions: Permission[]
}

export interface Permission {
  name: string
  permissions: string[]
}

export interface DataUserResponse {
  access_token: string
  user: UserResponse
}

export interface UserResponse {
  id: number
  firstName: string
  lastName: string
  email: string
  createdAt: string
  updatedAt: string
  role: RoleResponse
}

export interface RoleResponse {
  id: number
  uuid: string
  name: string
  funcionalidades: FunctionalityResponse[]
}

export interface FunctionalityResponse {
  id: 3
  uuid: "24950dbd-a86d-4262-92b1-537016633a78"
  name: "Calendario"
  permisos: [
    {
      id: 8
      functionality: "view"
    },
  ]
}

export interface FunctionalityResponse {
  id: 3
  uuid: "24950dbd-a86d-4262-92b1-537016633a78"
  name: "Calendario"
  permisos: [
    {
      id: 8
      functionality: "view"
    },
  ]
}

const rgxEmail =
  /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/

export const UserSchema = object({
  email: string()
    .matches(rgxEmail, "Enter a valid email")
    .required("Enter a email"),
  password: string().required("Enter a password"),
})

export type UserForm = InferType<typeof UserSchema>
