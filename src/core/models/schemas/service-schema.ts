import { InferType, object, string } from "yup"

export const CreateServiceSchema = object({
  code: string().required("Enter a code"),
  name: string().required("Enter a name service"),
})

export const UpdateServiceSchema = object({
  code: string(),
  name: string(),
})

export type UpdateServiceForm = InferType<typeof UpdateServiceSchema>
export type CreateServiceForm = InferType<typeof CreateServiceSchema>
