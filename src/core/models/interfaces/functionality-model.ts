export interface Permission {
  name: string
}

export interface FunctionalityDTO {
  id: number
  uuid: string
  name: string
  permisos: [
    {
      id: 8
      functionality: "view"
    },
  ]
}
