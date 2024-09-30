import { array, InferType, mixed, object, string } from "yup"

export const CreateResidentialSchema = object({
  picture: string(),
  name: string().required("Enter a name"),
  description: string().required("Enter a description"),
  address: string().required("Enter a address"),
  phoneProperty: string().required("Enter a phone manager"),
  managementCompanyId: string().required("Enter a manager company"),
})

export const UpdateResidentialSchema = object({
  picture: string(),
  name: string(),
  description: string(),
  address: string(),
  phoneProperty: string(),
  managementCompanyId: string(),
})

export type UpdateResidentialForm = InferType<typeof UpdateResidentialSchema>
export type CreateResidentialForm = InferType<typeof CreateResidentialSchema>
