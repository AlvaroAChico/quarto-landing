import React from "react"
import Cookies from "js-cookie"
import { COOKIES_APP } from "../constants/app"
import { UserDTO } from "../core/models/interfaces/user-model"

const useDataUser = () => {
  const handleGetToken = (): string => {
    const storedToken = Cookies.get(COOKIES_APP.TOKEN_APP)
    if (storedToken != null && storedToken != undefined) {
      return JSON.parse(storedToken)
    }
    return ""
  }

  const handleGetUser = (): UserDTO => {
    try {
      const storedUser = Cookies.get(COOKIES_APP.USER_RES)
      if (storedUser) {
        return JSON.parse(storedUser) as UserDTO
      }
    } catch (error) {
      console.error("Error al parsear la cookie del usuario:", error)
    }
    // En caso de no existir la cookie o ocurrir un error, se retorna un objeto vacío.
    return {} as UserDTO
  }

  const clearAllDataAPP = () => {
    Cookies.remove(COOKIES_APP.USER_RES)
    Cookies.remove(COOKIES_APP.TOKEN_APP)
    Cookies.remove(COOKIES_APP.ROLES_APP)
    localStorage.clear()
    sessionStorage.clear()

    if ("caches" in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName)
        })
      })
    }
  }

  return {
    handleGetUser,
    handleGetToken,
    clearAllDataAPP,
  }
}

export default useDataUser
