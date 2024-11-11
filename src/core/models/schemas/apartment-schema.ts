import { InferType, mixed, object, string } from "yup"

export const CreateApartmentSchema = object({
  picture: mixed(),
  code: string().required("Enter a code"),
  name: string().required("Enter a name service"),
  description: string().required("Enter a description"),
  floorNumber: string().required("Enter a name floorNumber"),
  residentialId: string().required("Enter a residential"),
})

export const UpdateApartmentSchema = object({
  picture: mixed(),
  code: string(),
  name: string(),
  description: string(),
  floorNumber: string(),
  residentialId: string(),
})

export type UpdateApartmentForm = InferType<typeof UpdateApartmentSchema>
export type CreateApartmentForm = InferType<typeof CreateApartmentSchema>
