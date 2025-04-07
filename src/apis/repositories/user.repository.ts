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
class UserRepository {
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
   * Actualiza la información de un usuario.
   * @param id Identificador del usuario a actualizar.
   * @param updateData Objeto con la información a actualizar.
   * @returns Una promesa que resuelve con los datos actualizados del usuario.
   */
  async updateUser(
    id: string,
    updateData: Partial<RegisterDTO>,
  ): Promise<SignInResponse> {
    const response = await httpClient.patch(`/users/${id}`, updateData)
    return response.data
  }

  /**
   * Actualiza la información de un usuario.
   * @param id Identificador del usuario a actualizar.
   * @param updateData Objeto con la información a actualizar.
   * @returns Una promesa que resuelve con los datos actualizados del usuario.
   */
  async completeRegister(
    id: string,
    updateData: Partial<RegisterDTO>,
  ): Promise<SignInResponse> {
    const response = await httpClient.post(`/update-user`, updateData)
    return response.data
  }
}

// Se exporta una instancia singleton del repository para usar en toda la aplicación.
export default new UserRepository()
