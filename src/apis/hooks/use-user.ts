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
import userRepository from "../repositories/user.repository"

/**
 * Hook para actualizar un usuario.
 * Utiliza useMutation para gestionar la operación de actualización de usuario.
 * Al tener éxito, se puede actualizar la cache o el estado global.
 */
export function useUpdateUser() {
  const queryClient = useQueryClient()
  return useMutation<
    SignInResponse,
    Error,
    { id: string; updateData: Partial<RegisterDTO> }
  >({
    mutationFn: ({ id, updateData }) =>
      userRepository.updateUser(id, updateData),
    onSuccess: data => {
      // Actualizamos la cache de 'auth' o cualquier otra clave relevante.
      queryClient.setQueryData(["auth"], data)
    },
    onError: (error: Error) => {
      console.error("Error al actualizar el usuario:", error)
    },
  })
}

/**
 * Hook para actualizar un usuario.
 * Utiliza useMutation para gestionar la operación de actualización de usuario.
 * Al tener éxito, se puede actualizar la cache o el estado global.
 */
export function useCompleteRegister() {
  const queryClient = useQueryClient()
  return useMutation<
    SignInResponse,
    Error,
    { id: string; updateData: Partial<RegisterDTO> }
  >({
    mutationFn: ({ id, updateData }) =>
      userRepository.completeRegister(id, updateData),
    onSuccess: data => {
      // Actualizamos la cache de 'auth' o cualquier otra clave relevante.
      queryClient.setQueryData(["auth"], data)
    },
    onError: (error: Error) => {
      console.error("Error al actualizar el usuario:", error)
    },
  })
}
