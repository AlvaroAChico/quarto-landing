import { InferType, object, string } from "yup"

export const CreateServiceSchema = object({
  picture: string(),
  code: string().required("Enter a code"),
  name: string().required("Enter a name service"),
  description: string().required("Enter a description"),
  floorNumber: string().required("Enter a name floorNumber"),
  residentialId: string().required("Enter a residential"),
})

export type CreateServiceForm = InferType<typeof CreateServiceSchema>
