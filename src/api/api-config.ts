import axios from "axios"
import Cookies from "js-cookie"
import { COOKIES_APP } from "../constants/app"
import { settingsApp } from "../config/environment/settings"
import { setErrResponse } from "../utils/erros-util"
import { pathRoutes } from "../config/routes/paths"

const axiosInstance = axios.create({
  baseURL: settingsApp.api.base,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    CacheControl: "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
})

// const pathsWithoutToken = ["/login", "/register"]

axiosInstance.interceptors.request.use(
  config => {
    const token = Cookies.get(COOKIES_APP.TOKEN_APP)?.slice(1, -1) ?? ""

    // const isPathWithoutToken = pathsWithoutToken.some(path =>
    //   config.url?.endsWith(path),
    // )
    // const isUsersPost =
    //   config.method === "post" && config.url?.endsWith("/users")

    // if (token && !isPathWithoutToken && !isUsersPost) {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    setErrResponse(error)
    if (error.response.status == 401) {
      // window.location.href = `${settingsApp.app.local}${pathRoutes.SIGN_IN.to}`
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
