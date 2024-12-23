import { MessageResponsedDTO } from "../../core/models/interfaces/general-model"
import { SignInResponse } from "../../core/models/interfaces/user-model"
import apiService from "../api-service"

export const ownerRepository = {
  getAll: async (): Promise<any> => {
    return await apiService.get<any>(`/owners`)
  },

  create: async (formData: FormData): Promise<any> => {
    return await apiService.postFormData("/owners", formData)
  },
}
