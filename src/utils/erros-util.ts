import { toast } from "sonner"

export const setErrResponse = (err: any) => {
  if (verifyErrResponse(err)) {
    // console.log("Error Util => ", err)
    toast.error(err.response.data.message)
  }
}
export const verifyErrResponse = (err: any): boolean =>
  !!err && !!err.response && !!err.response.data && !!err.response.data.message
