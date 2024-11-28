import { MessageResponsedDTO } from "../../core/models/interfaces/general-model"
import apiService from "../api-service"

export const generalRepository = {
  deleteItem: async (url: string): Promise<any> => {
    return await apiService.delete<any>(`/${url}`)
  },
}
