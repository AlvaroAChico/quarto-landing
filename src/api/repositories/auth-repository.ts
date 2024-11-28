import { MessageResponsedDTO } from "../../core/models/interfaces/general-model"
import { MeDTO, SignInResponse } from "../../core/models/interfaces/user-model"
import apiService from "../api-service"

export const authRepository = {
  signIn: async (data: {
    email: string
    password: string
  }): Promise<SignInResponse> => {
    return await apiService.post<any>(`/auth/login`, {
      email: data.email,
      password: data.password,
    })
  },

  getMe: async (): Promise<MeDTO> => {
    return await apiService.get<MeDTO>(`/auth/me`)
  },

  resetPassword: async (data: {
    token: string
    email: string
    password: string
    password_confirmation: string
  }): Promise<MessageResponsedDTO> => {
    return await apiService.post<any>(`/auth/reset-password`, {
      token: data.token,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    })
  },

  recoveryPassword: async (data: {
    email: string
  }): Promise<MessageResponsedDTO> => {
    return await apiService.post<any>(`/auth/recover-password`, {
      email: data.email,
    })
  },

  // register: async (data: RegisterFormData): Promise<MessageResponsedDTO> => {
  //   return await apiService.post<RegisterFormData>(`/users`, data)
  // },

  // SignIn Social
  // signInWithProvider: async (provider: string): Promise<any> => {
  //   return await apiService.get<any>(`/auth/login/${provider}`)
  // },

  // sendCallbackProvider: async (
  //   provider: string,
  //   data: { code: string },
  // ): Promise<any> => {
  //   console.log("Refister data", data)
  //   return await apiService.post<{ code: string }>(
  //     `/auth/login/${provider}/callback`,
  //     data,
  //   )
  // },

  // EXAMPLE FORM DATA
  // uploadProfileImage: async (formData: FormData): Promise<string> => {
  //   return await apiService.postFormData("/upload/profile-image", formData)
  // },
}
