import {
  IRequestPaginated,
  MessageResponsedDTO,
} from "../../core/models/interfaces/general-model"
import apiService from "../api-service"

export const visitRepository = {
  getAll: async (rq: IRequestPaginated): Promise<any> => {
    return await apiService.get<any>(`/visits&page=${rq.page}`)
  },

  getVisitById: async (id: string): Promise<any> => {
    return await apiService.get<any>(`/visits/${id}`)
  },

  completeVisit: async (id: number, formData: FormData): Promise<any> => {
    return await apiService.postFormData(`/visits/${id}`, formData)
  },
}
