import authorizedAxiosInstance from '~/axios'
import { RefreshTokenResponse, UserListResponse } from '~/interfaces/ApiResponse'
import { API_ROOT } from '~/utils/constant'
// API Login
export const loginAPI = async (data: { email: string; password: string }): Promise<UserListResponse> => {
  return await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
}
// API Logout
export const logoutAPI = async () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  return await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
}
// API refreshToken
export const refreshTokenAPI = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  return await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/refresh_token`, { refreshToken })
}

// API Get all users (get list user)
export const getAllUsers = async () => {
  return await authorizedAxiosInstance.get(`${API_ROOT}/v1/users`)
}

// API Check email before register account
export const checkEmailAPI = async (email: string): Promise<{ isAvailable: boolean }> => {
  return await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/check-email?email=${email}`)
}

//API Verify email
export const verifyAPI = async (code: string): Promise<{ message: string; statusCode: number }> => {
  return await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/verify-code`, { code })
}

//API Register user

export const registerAPI = async (data: {
  fullName: string
  email: string
  password: string
}): Promise<{ message: string; statusCode: number }> => {
  return await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/register`, data)
}
