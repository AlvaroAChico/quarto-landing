import { InferType, mixed, object, string } from "yup"

export const UpdateUserSchema = object({
  first_name: string(),
  last_name: string(),
  picture: mixed(),
  contact_number: string(),
  document_type: string(),
  document_number: string(),
  password: string(),
})

export type UpdateUserForm = InferType<typeof UpdateUserSchema>
