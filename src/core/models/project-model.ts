export interface Project {
    id: string
    name: string
    startDate: Date
    endDate: Date

    tasks: Task[]
  }

  export interface Task {
    name: string
    startDate: Date
    endDate: Date
  }