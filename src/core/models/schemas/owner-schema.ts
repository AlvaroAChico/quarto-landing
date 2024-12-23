import { InferType, mixed, object, string } from "yup"

export const CreateOwnerSchema = object({
  document_type: string().required("Ingresa una respuesta"),
  document_number: string().required("Ingresa una respuesta"),
  full_name: string().required("Ingresa una respuesta"),
  address: string(),
})

export type CreateOwnerForm = InferType<typeof CreateOwnerSchema>
