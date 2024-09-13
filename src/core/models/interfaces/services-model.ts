import { PermissionDTO } from "./user-model"

export interface DataServiceResponse {
  id: number
  name: string
  guardName: string
  createdAt: string
  updatedAt: string
}

export interface ServiceDTO {
  id: number
  name: string
  guardName: string
  createdAt: string
  updatedAt: string
}

export interface ServiceTypeDTO {
  id: number
  name: string
  guardName: string
  createdAt: string
  updatedAt: string
}

export interface ServiceCreatedDTO {
  id: number
  name: string
  guardName: string
  createdAt: string
  updatedAt: string
  price: number
  duration: number
  serviceType: ServiceTypeDTO
}

export enum EServiceName {
  CLEAN = "CLEAN",
  PAINT = "PAINT",
  MISCELLANEOUS = "MISCELLANEOUS",
  RESURFACING = "RESURFACING",
}
