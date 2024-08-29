import React from "react"
import Cookies from "js-cookie"
import { COOKIES_APP } from "../constants/app"
import { FilterPermissionsDTO } from "../core/models/interfaces/user-model"

const useDataUser = () => {
  const keysPermissions: (keyof FilterPermissionsDTO)[] = [
    "user",
    "category",
    "client",
    "contractor",
    "project",
    "projectfile",
    "setting",
    "task",
  ]

  const handleGetToken = (): string => {
    const storedToken = Cookies.get(COOKIES_APP.TOKEN_APP)
    if (storedToken != null && storedToken != undefined) {
      return JSON.parse(storedToken)
    }
    return ""
  }

  const handleGetPermissions = (): FilterPermissionsDTO => {
    const data = Cookies.get(COOKIES_APP.PERMISSIONS_APP)
    if (!!data && data != null && data != undefined) {
      const permissions: FilterPermissionsDTO = JSON.parse(
        data,
      ) as FilterPermissionsDTO
      return permissions
    }

    return keysPermissions.reduce((acc, key) => {
      acc[key] = []
      return acc
    }, {} as FilterPermissionsDTO)
  }

  const clearAllDataAPP = () => {
    Cookies.remove(COOKIES_APP.USER_RES)
    Cookies.remove(COOKIES_APP.TOKEN_APP)
    Cookies.remove(COOKIES_APP.ROLES_APP)
    Cookies.remove(COOKIES_APP.PERMISSIONS_APP)
  }

  return {
    handleGetToken,
    handleGetPermissions,
    clearAllDataAPP,
  }
}

export default useDataUser
