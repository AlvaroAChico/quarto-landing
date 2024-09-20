export interface AssigmentDTO {
  id: number
  code: string
  name: string
  picture: string
  description: string
  address: string
  latitude: string
  longitude: string
  apartment: ApartmentAssigmentDTO
  task: SeviceAssigmentDTO
}

export interface ApartmentAssigmentDTO {
  id: number
  code: string
  name: string
  picture: string
  description: string
}

export interface SeviceAssigmentDTO {
  id: number
  service: string
  name: string
  description: string
  startDate: string
  dueDate: string
  endDate: string
  notes: string
  projectId: number
  categoryId: string
  contractorId: number
  dependencyTaskId: null
  status: string
  isActive: boolean
  accepted: boolean
  createdAt: string
}
