import { MessageResponsedDTO } from "../../core/models/interfaces/general-model"
import apiService from "../api-service"

export const visitRepository = {
  getAll: async (): Promise<any> => {
    return await apiService.get<any>(`/visits`)
  },

  getVisitById: async (id: string): Promise<any> => {
    return await apiService.get<any>(`/visits/${id}`)
  },

  completeVisit: async (id: number, formData: FormData): Promise<any> => {
    return await apiService.postFormData(`/visits/${id}`, formData)
  },
}
