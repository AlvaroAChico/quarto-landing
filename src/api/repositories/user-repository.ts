import { MessageResponsedDTO } from "../../core/models/interfaces/general-model"
import apiService from "../api-service"

export const userRepository = {
  getUserById: async (userId: boolean): Promise<boolean> => {
    return await apiService.get<boolean>(`/users/${userId}`)
  },
}
