export interface InfoCalendarDTO {
  id: number
  service: string
  name: string
  priority: number
  status: string
  date: string
  isActive: true
  picture: string
  contractor: InfoContractorDTO
  apartment: InfoApartmentDTO
  residential: InfoResidentialDTO
}
export interface InfoApartmentDTO {
  id: number
  name: string
}

export interface InfoResidentialDTO {
  id: number
  name: string
}

export interface InfoContractorDTO {
  id: number
  name: string
}
