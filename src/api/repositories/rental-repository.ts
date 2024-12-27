import {
  IRequestPaginated,
  MessageResponsedDTO,
} from "../../core/models/interfaces/general-model"
import apiService from "../api-service"

export const rentalRepository = {
  getAll: async (rq: IRequestPaginated): Promise<any> => {
    return await apiService.get<any>(`/rents&page=${rq.page}`)
  },
}
