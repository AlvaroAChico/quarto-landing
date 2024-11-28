export interface PropertyDTO {
  id: 1
  uuid: string
  title: string
  description: string
  type: string
  rentDuration: string
  price: number
  fullAddress: string
  latitude: string
  longitude: string
  city: string
  municipality: string
  urbanization: string
  relatedId: number
  parameters: any
  planId: number
  realtorId: number
  createdBy: number
  categoryId: number
  typeId: number
  ownerId: string
  status: string
  isActive: boolean
  createdAt: string
  image: string
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
