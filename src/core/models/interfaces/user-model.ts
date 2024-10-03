export interface SignInResponse {
  "0": UserDTO
  roles: string[]
  token: string
  permisos: PermissionDTO[]
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
  permisos: PermissionDTO[]
}

export interface UserDTO {
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
  role: RoleDTO[]
}

export interface RoleDTO {
  id: number
  name: string
  guardName: string
  createdAt: string
  updatedAt: string
  permissions: PermissionDTO[]
}

export interface PermissionDTO {
  id: number
  name: string
  guardName: string
  createdAt: string
  updatedAt: string
  pivot: PivotDTO
}

export interface PivotDTO {
  roleId: number
  permissionId: number
}

export interface FilterPermissionsDTO {
  dashboard: string[]
  user: string[]
  role: string[]
  service: string[]
  company: string[]
  property: string[]
  apartment: string[]
  assignment: string[]
  calendar: string[]
  reports: string[]
  work: string[]
  quality: string[]
}

// export const emptyFilterPermissions = {
//   dashboard: [],
//   user: [],
//   work: [],
//   role: [],
//   service: [],
//   company: [],
//   property: [],
//   apartment: [],
//   assignment: [],
//   calendar: [],
//   reports: [],
// }

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
