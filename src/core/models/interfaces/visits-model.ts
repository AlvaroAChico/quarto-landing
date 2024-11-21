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
  name: string
  property_features: string
  contact: ContactDTO
}

export interface ContactDTO {
  whatsapp: string
  phone: string
}
