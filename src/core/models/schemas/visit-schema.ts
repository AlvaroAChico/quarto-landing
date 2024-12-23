import { InferType, mixed, object, string } from "yup"

export const CompleteVisitSchema = object({
  comment: string().required("Ingresa un comentario"),
})

export type CompleteVisitForm = InferType<typeof CompleteVisitSchema>
