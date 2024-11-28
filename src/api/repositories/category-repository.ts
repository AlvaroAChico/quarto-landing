import { MessageResponsedDTO } from "../../core/models/interfaces/general-model"
import { SignInResponse } from "../../core/models/interfaces/user-model"
import apiService from "../api-service"

export const categoryRepository = {
  getAll: async (): Promise<any> => {
    return await apiService.get<any>(`/categories`)
  },
}
