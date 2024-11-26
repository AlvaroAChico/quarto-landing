import { MovementDTO } from "../../core/models/interfaces/movement-model"
import apiService from "../api-service"

export const movementRepository = {
  getMovements: async (): Promise<MovementDTO[]> => {
    return await apiService.get<MovementDTO[]>(`/movements`)
  },
}
