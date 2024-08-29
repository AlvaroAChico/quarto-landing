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
