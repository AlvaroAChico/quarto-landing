import { array, InferType, mixed, object, string } from "yup"

const fileTypeValidation = (file: File): boolean => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"]
  return allowedTypes.includes(file.type)
}

export const CreatePropertySchema = object({
  // Details
  category_id: string().required("Ingresa una respuesta"),
  title: string().required("Ingresa una respuesta"),
  description: string().required("Ingresa una respuesta"),
  property_type: string().required("Ingresa una respuesta"),
  price: string().required("Ingresa una respuesta"),
  owner_id: string().required("Ingresa una respuesta"),
  // Location
  city_id: string().required("Ingresa una respuesta"),
  municipality_id: string().required("Ingresa una respuesta"),
  urbanization_id: string().required("Ingresa una respuesta"),
  client_address: string().required("Ingresa una respuesta"),
  // Gallery
  video_link: string().required("Ingresa una respuesta"),
  title_image: mixed().required("Ingresa una respuesta"),
  d_image: mixed().required("Ingresa una respuesta"),
  gallery_images: array().of(
    mixed()
      .test("is-valid-file", "File type is not allowed", file => {
        if (file instanceof File) {
          return fileTypeValidation(file)
        }
        return false
      })
      .required("Ingresa una respuesta"),
  ),
  params_json: string().required("Ingresa una respuesta"),
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
