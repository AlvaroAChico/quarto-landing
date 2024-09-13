import { array, InferType, mixed, object, string } from "yup"

export const CreateApartmentSchema = object({
  picture: string(),
  code: string().required("Enter a code"),
  description: string().required("Enter a description"),
  manager: string().required("Enter a manager"),
  phoneManager: string().required("Enter a phone manager"),
})

export type CreateApartmentForm = InferType<typeof CreateApartmentSchema>
