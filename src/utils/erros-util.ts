import { toast } from "sonner"

export const setErrResponse = (err: any) => {
  if (verifyErrResponse(err)) {
    toast.error(err.response.data.message)
  } else {
    toast.error("Failed to fetch data")
  }
}
export const verifyErrResponse = (err: any): boolean =>
  !!err && !!err.response && !!err.response.data && !!err.response.data.message
