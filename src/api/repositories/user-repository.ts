import { MessageResponsedDTO } from "../../core/models/interfaces/general-model"
import apiService from "../api-service"

export const userRepository = {
  //   register: async (data: string): Promise<boolean> => {
  //     return await apiService.post<string>(`/users`, data)
  //   },

  getUser: async (userId: boolean): Promise<boolean> => {
    return await apiService.get<boolean>(`/users/${userId}`)
  },

  // signIn: async (data: RegisterFormData): Promise<any> => {
  //   return await apiService.post<RegisterFormData>(`/auth/login`, data)
  // },

  // register: async (data: RegisterFormData): Promise<MessageResponsedDTO> => {
  //   return await apiService.post<RegisterFormData>(`/users`, data)
  // },

  // SignIn Social
  signInWithProvider: async (provider: string): Promise<any> => {
    return await apiService.get<any>(`/auth/login/${provider}`)
  },
  sendCallbackProvider: async (
    provider: string,
    data: { code: string },
  ): Promise<any> => {
    console.log("Refister data", data)
    return await apiService.post<{ code: string }>(
      `/auth/login/${provider}/callback`,
      data,
    )
  },

  // EXAMPLE FORM DATA
  // uploadProfileImage: async (formData: FormData): Promise<string> => {
  //   return await apiService.postFormData("/upload/profile-image", formData)
  // },
}
