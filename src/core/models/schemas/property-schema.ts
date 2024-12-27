import { array, InferType, mixed, number, object, string } from "yup"

const fileTypeValidation = (file: File): boolean => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"]
  return allowedTypes.includes(file.type)
}

// export const CreatePropertySchema = object({
//   // Details
//   title: string().required("Ingresa una respuesta"),
//   description: string(),
//   type_id: string(),
//   rent_duration: string(),
//   plan_id: string(),
//   price: number(),
//   // -------------
//   category_id: string(),
//   owner_id: string(),
//   // Location
//   full_address: string(),
//   city: string(),
//   municipality: string(),
//   urbanization: string(),
//   // Gallery
//   video_link: string(),
//   title_image: mixed(),
//   d_image: mixed(),
//   gallery_images: array().of(
//     mixed().test("is-valid-file", "File type is not allowed", file => {
//       if (file instanceof File) {
//         return fileTypeValidation(file)
//       }
//       return false
//     }),
//   ),
//   parameters: array().of(
//     object({
//       parameter_id: string(),
//       value: string(),
//     }),
//   ),
// })

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
// export type CreatePropertyForm = InferType<typeof CreatePropertySchema>

// ************************************************************************************

export const CreatePropStep01Schema = object({
  // Details
  category_id: string(),
  title: string().required("Ingresa una respuesta"),
  description: string(),
  type_id: string().required("Ingresa una respuesta"),
  price: number(),
  owner_id: string(),
})

export const CreatePropStep02Schema = object({
  state: string(),
  city: string(),
  municipality: string(),
  // urbanization: string(),
  full_address: string(),
  plan_id: string().required("Ingresa una respuesta"),
  rent_duration: string(),
})

export const CreatePropStep03Schema = object({
  // video_link: string(),
  title_image: mixed(),
  gallery_images: array().of(
    mixed().test("is-valid-file", "File type is not allowed", file => {
      if (file instanceof File) {
        return fileTypeValidation(file)
      }
      return false
    }),
  ),
})

export const CreatePropStep04Schema = object({
  parameters: array().of(
    object({
      parameter_id: string(),
      value: string(),
    }),
  ),
})

export const CreatePropStep05Schema = object({
  // video_link: string(),
  img_property: mixed().required("Ingresa una imagen"),
  img_cedula: mixed().required("Ingresa una imagen"),
  img_rif: mixed().required("Ingresa una imagen"),
  other_images: array().of(
    mixed().test("is-valid-file", "File type is not allowed", file => {
      if (file instanceof File) {
        return fileTypeValidation(file)
      }
      return false
    }),
  ),
})

export type CreatePropStep01Form = InferType<typeof CreatePropStep01Schema>
export type CreatePropStep02Form = InferType<typeof CreatePropStep02Schema>
export type CreatePropStep03Form = InferType<typeof CreatePropStep03Schema>
export type CreatePropStep04Form = InferType<typeof CreatePropStep04Schema>
export type CreatePropStep05Form = InferType<typeof CreatePropStep05Schema>

export const CreatePropertySchema = object().shape({
  ...CreatePropStep01Schema.fields,
  ...CreatePropStep02Schema.fields,
  ...CreatePropStep03Schema.fields,
  ...CreatePropStep04Schema.fields,
  ...CreatePropStep05Schema.fields,
})
