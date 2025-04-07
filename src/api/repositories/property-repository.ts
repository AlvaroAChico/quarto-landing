import { PropertyDTO } from "../../core/models/interfaces/property-model"
import apiService from "../api-service"

export const propertyRepository = {
  getProperties: async (): Promise<PropertyDTO[]> => {
    return await apiService.get<PropertyDTO[]>(`/properties?include=images`)
  },

  getPropertiesById: async (id: string): Promise<PropertyDTO[]> => {
    return await apiService.get<PropertyDTO[]>(
      `/properties/${id}?include=images`,
    )
  },

  createProperty: async (formData: FormData): Promise<any> => {
    return await apiService.postFormData("/properties", formData)
  },
}
