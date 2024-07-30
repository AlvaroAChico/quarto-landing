export interface User {
  id: string
  name: string
  allUsers: boolean
  permissions: Permission[]
}

export interface Permission {
  name: string
  permissions: string[]
}
