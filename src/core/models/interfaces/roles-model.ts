import { PermissionDTO } from "./user-model"

export interface DataRoleResponse {
  id: number
  name: string
  guardName: string
  createdAt: string
  updatedAt: string
  permissions: PermissionDTO[]
}

export interface RoleDTO {
  id: number
  name: string
  guardName: string
  createdAt: string
  updatedAt: string
  permissions: PermissionDTO[]
}

export interface RoleOptionType {
  value: string
  label: string
}

export interface ServiceDTO {
  id: number
  name: string
  createdAt: string
}
