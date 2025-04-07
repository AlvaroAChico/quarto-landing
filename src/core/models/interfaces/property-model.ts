export interface PropertyDTO {
  id: number
  uuid: string
  title: string
  description: string
  type: string
  rentDuration: string
  price: number
  tax: string
  currency: string
  fullAddress: string
  latitude: string
  longitude: string
  city: string
  municipality: string
  urbanization: string
  relatedId: number
  titleImage: string
  buildingName: string
  floor: string
  apartment: string
  tenantProfile: string
  parameters: string
  monthInAdvance: string
  monthDeposits: string
  planId: number
  agentId: string
  createdBy: number
  categoryId: number
  typeId: number
  ownerId: string
  durationContractId: string
  cityId: string
  percentageInitialPayment: string
  initialPayment: string
  numberQuotes: string
  quotaPayment: string
  status: string
  isActive: boolean
  createdAt: string
  principalImage: string
  images: ImageDTO[]
}

export interface ImageDTO {
  id: number
  name: string
  type: string
  propertyId: number
  createdAt: string
  url: string
}

export interface ImageGallery {
  id: number
  name: string
  type: string
  propertyId: number
  createdAt: string
  url: string
}

export interface InitValuesProperty {
  name: string
  schema: string
  status: boolean
}

export const getInitValues = (data: string[]): InitValuesProperty[] => {
  return data.map(item => {
    return {
      name: item.split("_").slice(1).join(" "),
      schema: item,
      status: false,
    }
  })
}
