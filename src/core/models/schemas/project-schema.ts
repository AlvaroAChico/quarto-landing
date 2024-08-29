import { InferType, object, string } from "yup"

export const CreateProjectSchema = object({
  code: string().required("Enter a code"),
  name: string().required("Enter a name"),
  description: string().required("Enter a description"),
  startDate: string().required("Enter a start date"),
  dueDate: string().required("Enter a due date"),
  currency: string(),
  price: string(),
  clientId: string(),
  categoryId: string(),
  picture: string(),
})

export type CreateProjectForm = InferType<typeof CreateProjectSchema>
