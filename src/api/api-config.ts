import axios from "axios"
import Cookies from "js-cookie"
import { COOKIES_APP } from "../constants/app"
import { settingsApp } from "../config/environment/settings"
import { setErrResponse } from "../utils/erros-util"

const axiosInstance = axios.create({
  baseURL: settingsApp.api.base,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// const pathsWithoutToken = ["/login", "/register"]

axiosInstance.interceptors.request.use(
  config => {
    const token = JSON.parse(Cookies.get(COOKIES_APP.TOKEN_APP) || "{}")

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
    return Promise.reject(error)
  },
)

export default axiosInstance
