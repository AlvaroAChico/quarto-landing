export interface PermissionCreateDTO {
  name: string
  values: PermissionValueDTO[]
}

export interface PermissionValueDTO {
  name: string
  isActive: boolean
  enabled: boolean
}
