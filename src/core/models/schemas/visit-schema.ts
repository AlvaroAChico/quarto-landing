import { array, InferType, object, string } from "yup"

export const ScheduleVisitSchema = object().shape({
  persons: array().of(
    object().shape({
      profesion: string().required("La profesión es obligatoria"),
      trabajoActual: string().required("El trabajo actual es obligatorio"),
      ingresos: string().required("Este campo es obligatorio"),
    }),
  ),
})

export type ScheduleVisitForm = InferType<typeof ScheduleVisitSchema>
