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
