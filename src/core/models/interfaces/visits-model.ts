export interface VisitDTO {
  id: number
  image: string
  address: string
  date: string
  category: string
  status: string
}

export interface VisitDetailDTO {
  id: number
  name_rental: string
  status: string
  date_visit: string
  time_visit: string
  note: string
  tenant: TenantDTO
  owner: OwnerDTO
  agent: AgentDTO
}

export interface TenantDTO {
  name: string
  id_pa: string
  profile: string
  contact: ContactDTO
}

export interface AgentDTO {
  name: string
  id_pa: string
}

export interface OwnerDTO {
  id: number
  uuid: string
  documentType: string
  documentNumber: string
  fullName: string
  address: string
  relatedId: number
  status: string
  isActive: boolean
  createdAt: string
}

export interface ContactDTO {
  whatsapp: string
  phone: string
}
