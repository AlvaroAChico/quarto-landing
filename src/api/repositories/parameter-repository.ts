import { MessageResponsedDTO } from "../../core/models/interfaces/general-model"
import apiService from "../api-service"

export const parameterRepository = {
  getAll: async (): Promise<any> => {
    return await apiService.get<any>(`/parameters`)
  },
}
