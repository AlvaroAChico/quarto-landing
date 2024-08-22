export interface ProjectDTO {
  id: 1
  name: string
  startDate: string
  endDate: string
  isActive: boolean
  isMarkComplete: boolean
  tasks: TaskDTO[]
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
