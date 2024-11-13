export interface SignInResponse {
  "0": UserDTO
  roles: string[]
  token: string
}

export interface MeDTO {
  id: number
  firstName: string
  lastName: string
  picture: string
  contactNumber: string
  documentType: string
  documentNumber: string
  email: string
  status: string
  isActive: boolean
  createdAt: string
  username: string
  roles: string[]
}

export interface UserDTO {
  id: number
  firstName: string
  lastName: string
  picture: string
  image: string
  contactNumber: string
  documentType: string
  documentNumber: string
  email: string
  status: string
  isActive: boolean
  createdAt: string
  username: string
  role: RoleDTO[]
}

export interface RoleDTO {
  id: number
  name: string
  guardName: string
  createdAt: string
  updatedAt: string
}

export interface CreateUserDTO {
  first_name: string
  last_name: string
  role: string
  email: string
  password: string
  contact_number: string
}

export interface CreateUserResponseDTO {
  message: string
}

export interface DeleteUserResponseDTO {
  message: string
}

export type Option = {
  value: string
  label: string
}
