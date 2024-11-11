import { InferType, object, string } from "yup"

export const RecoverySchema = object({
  email: string().required("Enter a email"),
})

export type RecoveryForm = InferType<typeof RecoverySchema>
