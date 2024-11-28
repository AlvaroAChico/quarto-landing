import { MessageResponsedDTO } from "../../core/models/interfaces/general-model"
import apiService from "../api-service"

export const visitRepository = {
  getAll: async (): Promise<any> => {
    return await apiService.get<any>(`/visits`)
  },

  getVisitById: async (id: string): Promise<any> => {
    return await apiService.get<any>(`/visits/${id}`)
  },
}
