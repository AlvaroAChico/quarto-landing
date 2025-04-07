// src/repositories/auth.repository.ts

import {
  AuthResponseDTO,
  ForgotPasswordDTO,
  LoginDTO,
  PreRegisterDTO,
  RegisterDTO,
} from "../../core/models/interfaces/auth-model"
import { SignInResponse } from "../../core/models/interfaces/user-model"
import httpClient from "../http-client" // Se asume que httpClient es una instancia de Axios preconfigurada

/**
 * Repository para gestionar las operaciones de autenticación.
 * Centraliza las peticiones HTTP a la API de auth.
 */
class AuthRepository {
  /**
   * Registra un nuevo usuario.
   * @param registerData Objeto con la información necesaria para el registro.
   * @returns Una promesa que resuelve con los datos de autenticación (token y usuario).
   */
  async register(registerData: PreRegisterDTO): Promise<SignInResponse> {
    const response = await httpClient.post("/register", registerData)
    return response.data
  }

  /**
   * Inicia sesión para un usuario.
   * @param loginData Objeto con el email y contraseña.
   * @returns Una promesa que resuelve con los datos de autenticación.
   */
  async login(loginData: LoginDTO): Promise<AuthResponseDTO> {
    const response = await httpClient.post("/auth/login", loginData)
    return response.data
  }

  /**
   * Inicia sesión para un usuario.
   * @param loginData Objeto con el email y contraseña.
   * @returns Una promesa que resuelve con los datos de autenticación.
   */
  async loginByEmail(loginData: LoginDTO): Promise<SignInResponse> {
    const response = await httpClient.post("/auth/login-email", loginData)
    return response.data
  }

  /**
   * Verificar token para el Inicio de sesión de un usuario.
   * @param loginData Objeto con el email y contraseña.
   * @returns Una promesa que resuelve con los datos de autenticación.
   */
  async verifyLoginByToken(
    token: string,
    signal?: AbortSignal,
  ): Promise<SignInResponse> {
    const response = await httpClient.get(`/auth/email-login/${token}`, {
      signal,
    })
    return response.data
  }

  /**
   * Solicita la recuperación de contraseña.
   * @param forgotData Objeto que contiene el email para recuperación.
   * @returns Una promesa que resuelve con un mensaje de confirmación.
   */
  async forgotPassword(
    forgotData: ForgotPasswordDTO,
  ): Promise<{ message: string }> {
    const response = await httpClient.post("/auth/forgot-password", forgotData)
    return response.data
  }
}

// Se exporta una instancia singleton del repository para usar en toda la aplicación.
export default new AuthRepository()
