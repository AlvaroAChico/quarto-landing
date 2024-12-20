import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
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
  type_id: string(),
  price: number(),
  owner_id: string(),
})

export const CreatePropStep02Schema = object({
  city: string(),
  municipality: string(),
  urbanization: string(),
  full_address: string(),
  plan_id: string(),
  rent_duration: string(),
})

export const CreatePropStep03Schema = object({
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
})
export const CreatePropStep04Schema = object({
  parameters: array().of(
    object({
      parameter_id: string(),
      value: string(),
    }),
  ),
})

export type CreatePropStep01Form = InferType<typeof CreatePropStep01Schema>
export type CreatePropStep02Form = InferType<typeof CreatePropStep02Schema>
export type CreatePropStep03Form = InferType<typeof CreatePropStep03Schema>
export type CreatePropStep04Form = InferType<typeof CreatePropStep04Schema>

export const CreatePropertySchema = object().shape({
  ...CreatePropStep01Schema.fields,
  ...CreatePropStep02Schema.fields,
  ...CreatePropStep03Schema.fields,
  ...CreatePropStep04Schema.fields,
})

// Schemas Methods
// ********** Step 01 **********
export const methodsStep01 = useForm<CreatePropStep01Form>({
  resolver: yupResolver(CreatePropStep01Schema),
  defaultValues: {
    category_id: "",
    title: "",
    description: "",
    type_id: "1",
    price: 0,
    owner_id: "",
  },
})

export const {
  handleSubmit: submitWrapperStep01,
  formState: { errors: errorsStep01 },
  register: registerStep01,
  setValue: setValueStep01,
  getValues: getValuesStep01,
} = methodsStep01

// ********** Step 02 **********
export const methodsStep02 = useForm<CreatePropStep02Form>({
  resolver: yupResolver(CreatePropStep02Schema),
  defaultValues: {
    city: "",
    municipality: "",
    urbanization: "",
    full_address: "",
    plan_id: "",
    rent_duration: "",
  },
})

export const {
  handleSubmit: submitWrapperStep02,
  formState: { errors: errorsStep02 },
  register: registerStep02,
  setValue: setValueStep02,
  getValues: getValuesStep02,
} = methodsStep02

// ********** Step 03 **********
export const methodsStep03 = useForm<CreatePropStep03Form>({
  resolver: yupResolver(CreatePropStep03Schema),
  defaultValues: {
    video_link: "",
    title_image: "",
    d_image: "",
    gallery_images: [],
  },
})

export const {
  handleSubmit: submitWrapperStep03,
  formState: { errors: errorsStep03 },
  register: registerStep03,
  setValue: setValueStep03,
  getValues: getValuesStep03,
} = methodsStep03

// ********** Step 04 **********
export const methodsStep04 = useForm<CreatePropStep04Form>({
  resolver: yupResolver(CreatePropStep04Schema),
  defaultValues: {
    parameters: [],
  },
})

export const {
  handleSubmit: submitWrapperStep04,
  formState: { errors: errorsStep04 },
  register: registerStep04,
  setValue: setValueStep04,
  getValues: getValuesStep04,
} = methodsStep04
