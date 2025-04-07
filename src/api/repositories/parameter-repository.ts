import { MessageResponsedDTO } from "../../core/models/interfaces/general-model"
import apiService from "../api-service"

export const parameterRepository = {
  getAll: async (): Promise<any> => {
    return await apiService.get<any>(`/parameters`)
  },

  getState: async (): Promise<any> => {
    return await apiService.get<any>(`/states`)
  },

  getCity: async (): Promise<any> => {
    return await apiService.get<any>(`/cities`)
  },

  getMuni: async (): Promise<any> => {
    return await apiService.get<any>(`/municipalities`)
  },

  getNei: async (): Promise<any> => {
    return await apiService.get<any>(`/neighborhoods`)
  },

  getUrba: async (): Promise<any> => {
    return await apiService.get<any>(`/urbanizations`)
  },
}
