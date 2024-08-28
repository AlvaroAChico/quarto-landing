export interface SignInResponse {
  "0": UserDTO
  roles: string[]
  token: string
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
  user: string[]
  category: string[]
  client: string[]
  contractor: string[]
  project: string[]
  projectfile: string[]
  setting: string[]
  task: string[]
}
