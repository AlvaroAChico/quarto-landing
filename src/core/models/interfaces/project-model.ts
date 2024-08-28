export interface ProjectResponseDTO {
  stadistics: StadisticsDTO
  listProjects: ProjectDTO[]
}

export interface ProjectDTO {
  id: 1
  name: string
  status: string
  progress: number
  pending_task: number
  dueDate: string
  client: string
  tasks: TaskDTO[]
  contractors: ContractorDTO[]
}

export interface ContractorDTO {
  id: number
  fullName: string
  avatar: string
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
