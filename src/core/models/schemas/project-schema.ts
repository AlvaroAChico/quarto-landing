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

export const CreateProjectSchema = object({
  code: string().required("Enter a code"),
  name: string().required("Enter a name"),
  description: string().required("Enter a description"),
  startDate: string().required("Enter a start date"),
  dueDate: string().required("Enter a due date"),
  currency: string(),
  price: string(),
  clientId: string().required("Enter a client"),
  categoryId: string(),
  picture: string(),
  files: array().of(
    mixed().test("is-valid-file", "File type is not allowed", file => {
      if (file instanceof File) {
        return fileTypeValidation(file)
      }
      return false
    }),
  ),
})

export type CreateProjectForm = InferType<typeof CreateProjectSchema>

// .required("At least one file is required")
// .min(1, "At least one file is required"),
