import { MessageResponsedDTO } from "../../core/models/interfaces/general-model"
import apiService from "../api-service"

export const rentalRepository = {
  getAll: async (): Promise<any> => {
    return await apiService.get<any>(`/rents`)
  },
}
