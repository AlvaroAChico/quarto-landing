import { array, InferType, mixed, number, object, string } from "yup"

const fileTypeValidation = (file: File): boolean => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"]
  return allowedTypes.includes(file.type)
}

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
  type_id: string().required("Ingresa una respuesta"),
  category_id: string(),
  plan_id: string(),
  full_address: string(),
  title: string(),
})

export const CreatePropStep02Schema = object({
  // Details
  category_id: string().required("Ingresa una respuesta"),
  city: string().required("Ingresa una respuesta"),
  city_id: string().required("Ingresa una respuesta"),
  municipality: string().required("Ingresa una respuesta"),
  municipality_id: string().required("Ingresa una respuesta"),
  urbanization: string(),
  urbanization_id: string(),
})

interface CreatePropStep03SchemaFields {
  checkMode: string
  canon_alquiler?: string
  canon_venta?: string
  price: string
  price_sell: string
  initial?: string
  percentage_initial_payment: string
  initial_payment: string
  number_quotes: string
  quota_payment: string
}

export const CreatePropStep03Schema = object({
  checkMode: string().required(),
  price: string().when("checkMode", {
    is: (value: string) => value === "1" || value === "3",
    then: schema => schema.required("Ingresa una respuesta"),
    otherwise: schema => schema.notRequired(),
  }),
  price_sell: string().when("checkMode", {
    is: (value: string) => value === "2" || value === "3",
    then: schema => schema.required("Ingresa una respuesta"),
    otherwise: schema => schema.notRequired(),
  }),
  initial: string().when("checkMode", {
    is: (value: string) => value === "2" || value === "3",
    then: schema => schema.required("Ingresa una respuesta"),
    otherwise: schema => schema.notRequired(),
  }),
  percentage_initial_payment: string().when("checkMode", {
    is: (value: string) => value === "2" || value === "3",
    then: schema => schema.required("Ingresa una respuesta"),
    otherwise: schema => schema.notRequired(),
  }),
  initial_payment: string().when("checkMode", {
    is: (value: string) => value === "2" || value === "3",
    then: schema => schema.required("Ingresa una respuesta"),
    otherwise: schema => schema.notRequired(),
  }),
  number_quotes: string().when("checkMode", {
    is: (value: string) => value === "2" || value === "3",
    then: schema => schema.required("Ingresa una respuesta"),
    otherwise: schema => schema.notRequired(),
  }),
  quota_payment: string().when("checkMode", {
    is: (value: string) => value === "2" || value === "3",
    then: schema => schema.required("Ingresa una respuesta"),
    otherwise: schema => schema.notRequired(),
  }),
})

export const CreatePropStep04Schema = object({
  description: string().required("Ingresa una respuesta"),
  parameters: array().of(
    object({
      parameter_id: string(),
      value: string(),
    }),
  ),
})

export const CreatePropStep05Schema = object({
  title_image: mixed(),
  gallery_images: array()
    .of(
      mixed().test("is-valid-file", "File type is not allowed", file => {
        if (file instanceof File) {
          return fileTypeValidation(file)
        }
        return false
      }),
    )
    .optional(),
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
