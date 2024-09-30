export interface PropertyResponseDTO {
  stadistics: StadisticsDTO
  listProjects: PropertyDTO[]
}

export interface PropertyDTO {
  id: number
  code: string
  uuid: string
  name: string
  picture: string
  description: string
  progress: number
  currency: string
  price: number
  startDate: string
  dueDate: string
  endDate: string
  clientId: number
  categoryId: number
  status: string
  isActive: boolean
  createdAt: string
  address: string
  latitude: string
  longitude: string
  zipCode: string
  phoneNumber: string
  managementCompanyId: number
  client: ClientDTO
  managementCompany: ManagerCompanyDTO
  tasks: TasksDTO[]
  apartments: ApartmentDTO[]
}

export interface ManagerCompanyDTO {
  id: number
  name: string
  email1: string
  email2: string
  email3: string
  managerName: string
  managerPhone: string
  assitantManagerName: string
  assitantManagerPhone: string
  maintenanceName: string
  maintenancePhone: string
  status: string
  isActive: boolean
  createdAt: string
}

export interface ApartmentDTO {
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
  works: WorksDTO[]
}

export interface WorksDTO {
  id: number
  priority: number
  startDate: string
  endDate: string
  contractorId: number
  createdAt: string
  workStartDate: string
  workEndDate: string
  apartmentId: number
  serviceId: number
  statusId: number
  userId: number
  customerNotes: string
  internalNotes: string
  qualityNotes: string
  qualityUserId: number
  qualityStatusId: number
}

export interface TasksDTO {
  id: 1
  name: string
  description: string
  priority: number
  hours: number
  price: string
  currency: string
  progress: number
  startDate: string
  dueDate: string
  endDate: string
  notes: string
  projectId: number
  categoryId: number
  contractorId: number
  dependencyTaskId: string
  status: string
  isActive: boolean
  createdAt: string
}

export interface ClientDTO {
  id: number
  userId: number
  status: string
  isActive: boolean
  createdAt: string
}

export interface ContractorDTO {
  id: number
  fullName: string
  avatar: string
}

export interface StadisticsDashboardDTO {
  residentials: StadisticsPropertiesDashboardDTO
  contractors: StadisticsPropertiesDashboardDTO
  services: StadisticsPropertiesDashboardDTO
}
export interface StadisticsPropertiesDashboardDTO {
  total?: number
  active: number
  inactive: number
  onhold?: number
  apartamentstotal?: number
}

export interface StadisticsDTO {
  projects: StadisticsPropertiesDTO
  customers: StadisticsPropertiesDTO
  contractors: StadisticsPropertiesDTO
}

export interface StadisticsPropertiesDTO {
  total: number
  complete: number
  pending: number
  todo: number
}

export interface TaskDTO {
  name: string
  isMarkComplete: boolean
  startDate: string
  endDate: string
  evidence: string[]
  comments: CommentDTO[]
}

export interface CommentDTO {
  id: number
  user: string
  comment: string
  date: string
}

export interface ResidentialReportDTO {
  id: number
  name: string
  numberapartaments: number
  numberservices: number
  numberservicescompleted: number
}

export interface ContractorReportDTO {
  id: number
  name: string
  activeServices: number
  inactiveServices: number
  assignedApartments: number
  status: string
}
