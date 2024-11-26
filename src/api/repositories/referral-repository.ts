import { MessageResponsedDTO } from "../../core/models/interfaces/general-model"
import { ReferralDTO } from "../../core/models/interfaces/referral-model"
import apiService from "../api-service"

export const referralRepository = {
  createReferral: async (data: ReferralDTO): Promise<MessageResponsedDTO> => {
    return await apiService.post<ReferralDTO>(`/referrals`, data)
  },
}
