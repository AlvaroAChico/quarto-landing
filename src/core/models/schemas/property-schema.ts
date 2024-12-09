import { array, InferType, mixed, object, string } from "yup"

const fileTypeValidation = (file: File): boolean => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"]
  return allowedTypes.includes(file.type)
}

export const CreatePropertySchema = object({
  // Details
  title: string(),
  description: string(),
  type_id: string(),
  plan_id: string(),
  price: string(),
  // -------------
  category_id: string(),
  owner_id: string(),
  // Location
  city_id: string(),
  municipality_id: string(),
  urbanization_id: string(),
  client_address: string(),
  // Gallery
  video_link: string(),
  title_image: mixed(),
  d_image: mixed(),
  gallery_images: array().of(
    mixed().test("is-valid-file", "File type is not allowed", file => {
      if (file instanceof File) {
        return fileTypeValidation(file)
      }
      return false
    }),
  ),
  parameters: array().of(
    object({
      parameter_id: string(),
      value: string(),
    }),
  ),
})

export const UpdatePropertySchema = object({
  picture: mixed(),
  first_name: string(),
  last_name: string(),
  email: string(),
  phone: string(),
  position: string(),
  gender_id: string(),
})

export type UpdatePropertyForm = InferType<typeof UpdatePropertySchema>
export type CreatePropertyForm = InferType<typeof CreatePropertySchema>
