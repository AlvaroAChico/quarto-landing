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
    const storedUser = Cookies.get(COOKIES_APP.USER_RES)
    if (storedUser != null && storedUser != undefined) {
      return JSON.parse(storedUser) as UserDTO
    }
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
