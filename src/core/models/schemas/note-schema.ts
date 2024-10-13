import { InferType, object, string } from "yup"

export const CreateNoteWorkSchema = object({
  notes: string().required("Enter a note"),
})

export type CreateNoteWorkForm = InferType<typeof CreateNoteWorkSchema>
