export interface PropertyDTO {
  id: number
  image: string
  name: string
  address: string
  price: number
  type: string
  status: string
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
