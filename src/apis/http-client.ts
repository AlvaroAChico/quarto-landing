import axios from "axios"
import { settingsApp } from "../config/environment/settings"
import Cookies from "js-cookie"
import { COOKIES_APP } from "../constants/app"
import { setErrResponse } from "../utils/erros-util"

const httpClient = axios.create({
  baseURL: settingsApp.api.base,
  timeout: 10000, // 10 segundos de timeout
})

// Interceptor para manejo global de respuestas y errores
httpClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error(
        "Error en la API:",
        error.response.status,
        error.response.data,
      )
      setErrResponse(error)
    } else if (error.request) {
      console.error("No se recibió respuesta:", error.request)
    } else {
      console.error("Error al configurar la petición:", error.message)
    }
    return Promise.reject(error)
  },
)

// Interceptor para agregar el token a las cabeceras de las peticiones
httpClient.interceptors.request.use(
  config => {
    try {
      const token = Cookies.get(COOKIES_APP.TOKEN_APP)
      let parsedToken = null
      if (token) {
        try {
          // parsedToken = JSON.parse(token)
          // console.log("parsedToken => ", parsedToken)
          // Verificar si la ruta es auth/login
          // const isAuthLoginPath = config.url?.endsWith("auth/login")
          // const isAuthRegisterPath = config.url?.endsWith("users/:id")

          // if (parsedToken && !isAuthLoginPath) {
          // if (parsedToken) {
          config.headers["Authorization"] = `Bearer ${token}`
          // }
        } catch (parseError) {
          console.warn("Error al parsear el token:", parseError)
        }
      }
    } catch (error) {
      console.warn("Error al parsear el token:", error)
      // Si ocurre un error al parsear, no se agrega el token
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export default httpClient
