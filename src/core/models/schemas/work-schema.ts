import { InferType, object, string } from "yup"

export const CreateWorkSchema = object({
  apartmentId: string().required("Enter a service"),
  serviceId: string().required("Enter a service"),
  contractorId: string().required("Enter a contractor"),
  date: string().required("Enter a date"),
  notes: string(),
})

export type CreateWorkForm = InferType<typeof CreateWorkSchema>
