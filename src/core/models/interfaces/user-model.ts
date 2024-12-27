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
  message: string
  roles: string[]
}

export interface UserDTO {
  id: number
  uuid: string
  firstName: string
  lastName: string
  email: string
  photo: string
  contactNumber: string
  documentPicture: string
  documentType: string
  documentNumber: string
  entryDate: string
  trainingDate: string
  workZone: string
  timeAvailability: string
  notes: string
  status: string
  isActive: boolean
  createdAt: string
  username: string
  roles: RoleDTO[]
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
