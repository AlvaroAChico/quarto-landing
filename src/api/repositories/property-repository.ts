import { PropertyDTO } from "../../core/models/interfaces/property-model"
import apiService from "../api-service"

export const propertyRepository = {
  getProperties: async (): Promise<PropertyDTO[]> => {
    return await apiService.get<PropertyDTO[]>(`/properties`)
  },
}
