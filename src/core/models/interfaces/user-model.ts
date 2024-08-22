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
// USER RESPONSE SERVICE
export interface SignInResponse {
  token: TokenDTO
  user: UserDTO
}

export interface TokenDTO {
  access_token: string
  expire: number
}

export interface UserDTO {
  id: number
  firstName: string
  lastName: string
  email: string
  createdAt: string
  updatedAt: string
  role: RoleDTO
}

export interface RoleDTO {
  id: number
  uuid: string
  name: string
  functionalities: FunctionalityDTO[]
}

export interface FunctionalityDTO {
  id: number
  uuid: string
  name: string
  permissions: string[]
}
