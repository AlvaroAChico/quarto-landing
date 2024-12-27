export interface StateDTO {
  id: number
  name: string
  createdAt: string
}

export interface CityDTO {
  id: number
  name: string
  stateId: number
  createdAt: string
}

export interface MunicipalityDTO {
  id: number
  name: string
  cityId: number
  createdAt: string
}

export interface UrbanizationDTO {
  id: number
  name: string
  municipalityId: number
  createdAt: string
}
