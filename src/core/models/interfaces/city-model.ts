export interface CityDTO {
  id: number
  name: string
  createdAt: string
}

export interface MunicipalityDTO {
  id: number
  name: string
  stateId: number
  cityId: number
  createdAt: string
}

export interface UrbanizationDTO {
  id: number
  name: string
  municipalityId: number
  createdAt: string
}
