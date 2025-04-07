// src/hooks/useAuth.ts

import { useMutation, useQueryClient } from "@tanstack/react-query"
import authRepository from "../repositories/auth.repository"
import {
  AuthResponseDTO,
  ForgotPasswordDTO,
  LoginDTO,
  PreRegisterDTO,
  RegisterDTO,
} from "../../core/models/interfaces/auth-model"
import { SignInResponse } from "../../core/models/interfaces/user-model"
import { useState } from "react"

/**
 * Hook para registrar un nuevo usuario.
 * Utiliza useMutation para gloginAsyncestionar la operación de registro.
 * Al tener éxito, por ejemplo, se puede almacenar el token o actualizar el estado de autenticación.
 */
export function useRegister() {
  const queryClient = useQueryClient()
  return useMutation<SignInResponse, Error, PreRegisterDTO>({
    mutationFn: authRepository.register,
    onSuccess: data => {
      // Se puede guardar el token en localStorage, actualizar un contexto global o similar.
      // Ejemplo: localStorage.setItem("authToken", data.token);
      queryClient.setQueryData(["auth"], data)
    },
    onError: (error: Error) => {
      console.error("Error en el registro:", error)
    },
  })
}

/**
 * Hook para iniciar sesión.
 * Utiliza useMutation para realizar la operación de login.
 * Al tener éxito, se actualiza el estado de autenticación.
 */
export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation<AuthResponseDTO, Error, LoginDTO>({
    mutationFn: authRepository.login,
    onSuccess: data => {
      // Aquí puedes guardar el token, actualizar un contexto global, redirigir al usuario, etc.
      queryClient.setQueryData(["auth"], data)
    },
    onError: (error: Error) => {
      console.error("Error en el login:", error)
    },
  })
}

/**
 * Hook para iniciar sesión solo con email
 * Utiliza useMutation para realizar la operación de login.
 * Al tener éxito, se actualiza el estado de autenticación.
 */
export function useLoginEmail() {
  const queryClient = useQueryClient()
  return useMutation<SignInResponse, Error, LoginDTO>({
    mutationFn: authRepository.loginByEmail,
    onSuccess: data => {
      // Aquí puedes guardar el token, actualizar un contexto global, redirigir al usuario, etc.
      queryClient.setQueryData(["auth"], data)
    },
    onError: (error: Error) => {
      console.error("Error en el login:", error)
    },
  })
}

/**
 * Hook para verificar login mediante GET, usando useMutation.
 * La función mutationFn recibe un objeto con el token y un signal (opcional) para cancelar la petición.
 */
export function useVerifyLoginEmail() {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState<boolean>(false)

  return useMutation<
    SignInResponse,
    Error,
    { token: string; signal?: AbortSignal }
  >({
    mutationFn: async ({ token, signal }) => {
      // Llamamos al método de repository que hace la petición GET con el token y el signal.
      return authRepository.verifyLoginByToken(token, signal)
    },
    onMutate: () => {
      setLoading(true)
      console.log("Iniciando verificación de login...")
    },
    onSuccess: data => {
      // Actualizamos la cache de 'auth' con la data recibida.
      queryClient.setQueryData(["auth"], data)
    },
    onError: (error: Error) => {
      console.error("Error en el login:", error)
    },
    onSettled: () => {
      setLoading(false)
      console.log("Verificación de login completada.")
    },
  })
}

/**
 * Hook para solicitar la recuperación de contraseña.
 * Utiliza useMutation para gestionar la operación de forgot-password.
 * En onSuccess se puede mostrar una notificación informando que se ha enviado el correo.
 */
export function useForgotPassword() {
  return useMutation<{ message: string }, Error, ForgotPasswordDTO>({
    mutationFn: authRepository.forgotPassword,
    onSuccess: data => {
      // Ejemplo: Notificar al usuario que revise su correo.
      console.log("Correo de recuperación enviado:", data.message)
    },
    onError: (error: Error) => {
      console.error("Error en la recuperación de contraseña:", error)
    },
  })
}
