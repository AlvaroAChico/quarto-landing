export interface ProjectResponseDTO {
  stadistics: StadisticsDTO
  listProjects: ProjectDTO[]
}

export interface ProjectDTO {
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
  tasks: TasksDTO[]
  client: ClientDTO
  apartments: ApartmentDTO[]
}

export interface ApartmentDTO {
  id: number
  code: string
  uuid: string
  name: string
  picture: string
  description: string
  progress: number
  currency: string
  price: number
  clientId: 1
  status: string
  isActive: boolean
  createdAt: string
  tasks_apart: TaskApartmentDTO[]
}

export interface TaskApartmentDTO {
  id: number
  service: string
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
  categoryId: string
  contractorId: number
  dependencyTaskId: string
  status: boolean
  isActive: boolean
  createdAt: string
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
  apartamentstotal?:number
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
