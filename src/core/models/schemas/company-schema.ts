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
  manager_name: string(),
  manager_phone: string(),
  assitant_manager_name: string(),
  assitant_manager_phone: string(),
})

export type CreateCompanyForm = InferType<typeof CreateCompanySchema>
export type UpdateCompanyForm = InferType<typeof UpdateCompanySchema>
