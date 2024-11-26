import axiosInstance from "./api-config"

const apiService = {
  get: async <T>(url: string) => {
    const response = await axiosInstance.get(url)
    return response.data as T
  },

  post: async <T>(url: string, data: T) => {
    const response = await axiosInstance.post(url, data)
    return response.data
  },

  delete: async <T>(url: string) => {
    const response = await axiosInstance.delete(url)
    return response.data as T
  },

  // FormData Functions
  postFormData: async (url: string, formData: FormData) => {
    const response = await axiosInstance.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  },
}

export default apiService
