export interface PreRegisterDTO {
  email: string
  password: string
  password_confirmation: string
}

export interface RegisterDTO {
  first_name: string
  last_name: string
  document_type: string
  document_number: string
  code_phone: string
  phone: string
  realtor: number
  token: string
  interest: string[]
}

export interface Step01RegisterDTO {
  first_name: string
  last_name: string
  document_type: string
  document_number: string
  code_phone: string
  phone: string
}
export interface Step02RegisterDTO {
  realtor: number
  token: string
  interest: string[]
}

export interface LoginDTO {
  email: string
}

export interface AuthResponseDTO {}

export interface ForgotPasswordDTO {}

export interface AuthResponseDTO {}
