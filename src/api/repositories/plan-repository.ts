import apiService from "../api-service"

export const planRepository = {
  getAll: async (): Promise<any> => {
    return await apiService.get<any>(`/plans`)
  },
}
