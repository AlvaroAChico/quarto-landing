import { MessageResponsedDTO } from "../../core/models/interfaces/general-model"
import apiService from "../api-service"

export const parameterRepository = {
  getAll: async (): Promise<any> => {
    return await apiService.get<any>(`/parameters`)
  },

  getMuni: async (): Promise<any> => {
    return await apiService.get<any>(`/municipalities`)
  },

  getNei: async (): Promise<any> => {
    return await apiService.get<any>(`/neighborhoods`)
  },

  getState: async (): Promise<any> => {
    return await apiService.get<any>(`/states`)
  },
}
