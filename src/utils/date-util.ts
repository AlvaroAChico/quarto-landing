import { months } from "../constants/app"

export const formatToDDMMYYYY = (dateString: string): string => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0") // Los meses son 0-indexados
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

export const formatToDDMonth = (dateString: string): string => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${day} ${month}`
}

export const formatToDMYHH = (dateString: string) => {
  const date = new Date(dateString)

  const pad = (num: number) => String(num).padStart(2, "0")

  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1) // Los meses son 0-indexed
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const compareEqualsDate = (date1: string, date2: string) => {
  const splitDate1 = date1.split("/")
  const splitDate2 = date2.split("/")

  const fechaObj1 = new Date(
    parseInt(splitDate1[2]), // Año
    parseInt(splitDate1[1]) - 1, // Mes (0-11)
    parseInt(splitDate1[0]), // Día
  )

  const fechaObj2 = new Date(
    parseInt(splitDate2[2]), // Año
    parseInt(splitDate2[1]) - 1, // Mes (0-11)
    parseInt(splitDate2[0]), // Día
  )

  return (
    fechaObj1.getFullYear() === fechaObj2.getFullYear() &&
    fechaObj1.getMonth() === fechaObj2.getMonth() &&
    fechaObj1.getDate() === fechaObj2.getDate()
  )
}
