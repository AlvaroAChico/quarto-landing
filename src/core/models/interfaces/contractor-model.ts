import { UserDTO } from "./user-model"

export interface ContractorDTO {
  id: number
  companyName: string
  companyDocumentType: string
  companyDocumentNumber: string
  userId: number
  status: string
  isActive: boolean
  createdAt: string
  user: UserDTO
}
