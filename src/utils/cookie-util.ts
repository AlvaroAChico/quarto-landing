import Cookies from "js-cookie"
import { FilterPermissionsDTO } from "../core/models/interfaces/user-model"

export const MAX_COOKIE_SIZE = 4000
export const PREFIX_PERMISSION = "PERTST_ONL"

export const splitJSON = (json: object): string[] => {
  const jsonString = JSON.stringify(json)
  const parts: string[] = []

  let startIndex = 0
  while (startIndex < jsonString.length) {
    parts.push(jsonString.slice(startIndex, startIndex + MAX_COOKIE_SIZE))
    startIndex += MAX_COOKIE_SIZE
  }

  return parts
}

export const saveJsonCookiesWithSplit = (json: object): void => {
  const parts = splitJSON(json)
  for (let i = 0; i < parts.length; i++) {
    Cookies.set(`${PREFIX_PERMISSION}${i + 1}`, parts[i])
  }
}

export const getJsonFromCookies = (): object => {
  const parts: string[] = []
  let i = 1
  while (true) {
    const part = Cookies.get(`${PREFIX_PERMISSION}${i}`)
    if (!part) break
    parts.push(part)
    i++
  }

  const jsonString = parts.join("")
  return JSON.parse(jsonString)
}

export const deleteCookiesWithPrefix = (prefix: string): void => {
  let i = 1
  while (true) {
    const cookieName = `${prefix}${i}`
    const cookieValue = Cookies.get(cookieName)

    if (!cookieValue) break

    Cookies.remove(cookieName)
    i++
  }
}

export const createEmptyFilterPermissions = (): FilterPermissionsDTO => {
  return {
    dashboard: [],
    user: [],
    role: [],
    service: [],
    company: [],
    property: [],
    apartment: [],
    assignment: [],
    calendar: [],
    reports: [],
    work: [],
    quality: [],
    contractor: [],
  }
}
