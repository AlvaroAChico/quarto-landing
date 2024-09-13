import { array, InferType, mixed, object, string } from "yup"

export const CreateResidentialSchema = object({
  picture: string(),
  name: string().required("Enter a name"),
  description: string().required("Enter a description"),
  address: string().required("Enter a address"),
  manager: string().required("Enter a manager"),
  phoneManager: string().required("Enter a phone manager"),
})

export type CreateResidentialForm = InferType<typeof CreateResidentialSchema>
