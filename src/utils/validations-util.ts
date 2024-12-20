import { FieldErrors, FieldValues, UseFormGetValues } from "react-hook-form"
import {
  CreatePropertyForm,
  CreatePropertySchema,
} from "../core/models/schemas/property-schema"

export const validationObjectData = (data: any) => {
  //   const formData = new FormData()
  //   for (const key in data) {
  //     if (
  //       data.hasOwnProperty(key) &&
  //       data[key] !== undefined &&
  //       data[key] !== null &&
  //       data[key] !== "" &&
  //       data[key].length !== 0
  //     ) {
  //       if (key != "images" || key != "pictures" || key != "files") {
  //         formData.append(key, data[key])
  //       }
  //     }
  //   }
  //   if (formData.entries().next().done) {
  //     setIsSubmitUpdate(false)
  //     toast.warning("No changes were made")
  //     return
  //   }
  //   formData.append("_method", "PATCH")
}

type ValidKeys = keyof CreatePropertyForm

export const validateErrorSchema = (
  errors: FieldErrors,
  getValues: UseFormGetValues<CreatePropertyForm>,
  its: string[],
): boolean => {
  let isValid = true

  its.forEach(it => {
    // console.log("---------- Init property ----------")
    // console.log(`Data ${it} => `, {
    //   evaluation: `Evaluando: ${it} => Tiene el error ${errors[it]?.message} `,
    //   errors: errors,
    //   valueKey: getValues(it as ValidKeys),
    //   objects: Object.keys(errors).includes(it),
    // })
    // console.log("---------- End property ----------")
    if (Object.keys(errors).includes(it)) {
      // console.log("- - 1 - - ")
      isValid = false
    }
    // console.log("- - 2 - - ")
  })
  // console.log("**************************************")

  return isValid
}
