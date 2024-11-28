import { FieldErrors } from "react-hook-form"

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

export const validateErrorSchema = (
  errors: FieldErrors,
  its: string[],
): boolean => {
  its.forEach(it => {
    if (
      (errors[it] as any)?.message == "" ||
      (errors[it] as any)?.message == undefined
    ) {
      return true
    }
  })

  return false
}
