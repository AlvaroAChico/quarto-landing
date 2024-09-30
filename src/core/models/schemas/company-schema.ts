import { array, InferType, mixed, object, string } from "yup"

export const CreateCompanySchema = object({
  name: string().required("Enter a name"),
  managerName: string().required("Enter a manager name"),
  managerPhone: string().required("Enter a manager phone"),
  assitantManagerName: string().required("Enter a assitant manager name"),
  assitantManagerPhone: string().required("Enter a assitant manager phone"),
})

export const UpdateCompanySchema = object({
  name: string(),
  managerName: string(),
  managerPhone: string(),
  assitantManagerName: string(),
  assitantManagerPhone: string(),
})

export type CreateCompanyForm = InferType<typeof CreateCompanySchema>
export type UpdateCompanyForm = InferType<typeof UpdateCompanySchema>
