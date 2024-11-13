import { array, InferType, mixed, object, string } from "yup"

const fileTypeValidation = (file: File): boolean => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"]
  return allowedTypes.includes(file.type)
}

export const CreatePropertySchema = object({
  // Details
  category_id: string(),
  title: string(),
  description: string(),
  property_type: string(),
  price: string(),
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
  // Specifications
  nro_piso: string(),
  nro_habitaciones: string(),
  nro_banios: string(),
  nro_puestos: string(),
  nro_m2: string(),
  cbx_lavandero: string(),
  cbx_piscina: string(),
  cbx_pozo_agua: string(),
  cbx_gym: string(),
  cbx_planta_electrica: string(),
  cbx_accept_mascotas: string(),
  cbx_ascensor: string(),
  cbx_internet: string(),
  cbx_amoblado: string(),
  cbx_vigilancia: string(),
  cbx_aire_acodicionado: string(),
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
