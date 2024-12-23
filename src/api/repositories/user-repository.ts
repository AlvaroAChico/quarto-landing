import { MessageResponsedDTO } from "../../core/models/interfaces/general-model"
import { UpdateUserSchema } from "../../core/models/schemas/user-schema"
import apiService from "../api-service"

export const userRepository = {
  getUserById: async (userId: boolean): Promise<boolean> => {
    return await apiService.get<boolean>(`/users/${userId}`)
  },

  updateById: async (userId: number, formData: FormData): Promise<any> => {
    return await apiService.postFormData(`/users/${userId}`, formData)
  },
}
