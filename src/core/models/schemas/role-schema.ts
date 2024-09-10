import { array, InferType, mixed, object, string } from "yup"

export const CreateRoleSchema = object({
  name: string().required("Enter a name"),
  permissions: array()
    .of(string().required("Each permission item must be a string"))
    .required("Enter permissions")
    .min(1, "At least one permission is required"),
})

export const UpdateRoleSchema = object({
  id: string().required("Enter a id"),
  name: string().required("Enter a name"),
  permissions: array()
    .of(string().required("Each permission item must be a string"))
    .required("Enter permissions")
    .min(1, "At least one permission is required"),
})

export type CreateRoleForm = InferType<typeof CreateRoleSchema>
export type UpdateRoleForm = InferType<typeof UpdateRoleSchema>
