import { useForm, useFieldArray } from "react-hook-form"

type FormValues = {
  persons: {
    profesion: string
    trabajoActual: string
    ingresos: string
  }[]
}

const {
  register,
  control,
  handleSubmit,
  formState: { errors },
} = useForm<FormValues>({
  defaultValues: {
    persons: [{ profesion: "", trabajoActual: "", ingresos: "" }],
  },
})

const { fields, append } = useFieldArray({
  control,
  name: "persons",
})
