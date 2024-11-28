import { MessageResponsedDTO } from "../../core/models/interfaces/general-model"
import { ReferralDTO } from "../../core/models/interfaces/referral-model"
import apiService from "../api-service"

export const tenantRepository = {
  getAll: async (): Promise<any> => {
    return await apiService.get<any>(`/tenants`)
  },
}
