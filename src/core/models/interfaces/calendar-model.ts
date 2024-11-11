import { ApartmentDTO, WorksDTO } from "./property-model"

export interface InfoCalendarDTO {
  id: number
  startDate: string
  endDate: string
  workStartDate: string
  workEndDate: string
  apartmentId: number
  serviceId: number
  statusId: number
  userId: number
  priority: string
  customerNotes: string
  internalNotes: string
  qualityNotes: string
  qualityUserId: number
  qualityStatusId: number
  contractorId: number
  createdAt: string
  contractor: InfoContractorDTO
  apartment: InfoApartmentDTO
  residential: InfoResidentialDTO
  service: InfoServiceDTO
  status: InfoStatusDTO
  images: ImagesSaveDTO[]
}
export interface ImagesSaveDTO {
  id: number
  fileLocation: string
  workId: string
  createdAt: string
  file: string
}

export interface InfoApartmentDTO {
  id: number
  code: string
  name: string
  floorNumber: number
  description: string
  picture: string
  residentialId: number
  status: string
  isActive: boolean
  createdAt: string
}

export interface InfoResidentialDTO {
  id: number
  name: string
  description: string
  picture: string
  address: string
  zipCode: string
  latitude: string
  longitude: string
  phoneNumber: string
  managementCompanyId: number
  status: string
  isActive: boolean
  createdAt: string
  laravelThroughKey: number
}

export interface InfoContractorDTO {
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
  managementCompanyId: number
  username: string
}

export interface InfoServiceDTO {
  id: number
  code: string
  name: string
  status: string
  isActive: boolean
  createdAt: string
}

export interface InfoStatusDTO {
  id: number
  name: string
  isActive: boolean
  createdAt: string
}

// export interface InfoReportDTO {
//   residential: string
//   nroApartments: string
//   nroWorksActive: string
//   nroWorksComplete: string
// }

// export interface InfoReportDTO {
//   residentialId: string
//   name: string
//   totalApartments: number
//   totalWorks: number
//   completedWorks: number
//   activeWorks: number
// }

export interface InfoReportDTO {
  id: number
  name: string
  apartments: ApartmentDTO[]
  works: WorksDTO[]
}
