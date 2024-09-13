import { array, InferType, mixed, object, string } from "yup"

const fileTypeValidation = (file: File): boolean => {
  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/zip",
  ]
  return allowedTypes.includes(file.type)
}

export const CreateServiceSchema = object({
  apartmentId: string().required("Enter a service"),
  serviceId: string().required("Enter a service"),
  contractorId: string().required("Enter a contractor"),
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

export type CreateServiceForm = InferType<typeof CreateServiceSchema>
