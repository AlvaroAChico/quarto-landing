import { array, InferType, mixed, object, string } from "yup"

const fileTypeValidation = (file: File): boolean => {
  const allowedTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/zip",
  ]
  return allowedTypes.includes(file.type)
}

export const CreateWorkSchema = object({
  apartmentId: string().required("Enter a property"),
  serviceId: string().required("Enter a service"),
  contractorId: string(),
  date: string().required("Enter a date"),
  notes: string(),
  files: array().of(
    mixed().test("is-valid-file", "File type is not allowed", file => {
      if (file instanceof File) {
        return fileTypeValidation(file)
      }
      return false
    }),
  ),
})

export const UpdateWorkSchema = object({
  apartment_id: string(),
  service_id: string(),
  contractor_id: string(),
  start_date: string(),
  customer_notes: string(),
  "images[]": array().of(
    mixed().test("is-valid-file", "File type is not allowed", file => {
      if (file instanceof File) {
        return fileTypeValidation(file)
      }
      return false
    }),
  ),
})

export type UpdateWorkForm = InferType<typeof UpdateWorkSchema>
export type CreateWorkForm = InferType<typeof CreateWorkSchema>
