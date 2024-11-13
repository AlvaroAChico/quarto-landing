import React from "react"
import Cookies from "js-cookie"
import { COOKIES_APP } from "../constants/app"

const useDataUser = () => {
  const handleGetToken = (): string => {
    const storedToken = Cookies.get(COOKIES_APP.TOKEN_APP)
    if (storedToken != null && storedToken != undefined) {
      return JSON.parse(storedToken)
    }
    return ""
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
    handleGetToken,
    clearAllDataAPP,
  }
}

export default useDataUser
