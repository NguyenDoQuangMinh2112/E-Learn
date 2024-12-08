import authorizedAxiosInstance from '~/axios'
import { ApiResponse } from '~/interfaces/ApiResponse'
import { UserEnrollCourse } from '~/interfaces/course'
import { API_ROOT } from '~/utils/constant'

export const createPaymentIntentAPI = async (
  data: any
): Promise<{
  message: string
  clientSecret: string
  paymentId: string
}> => {
  return await authorizedAxiosInstance.post(`${API_ROOT}/v1/enroll/create-payment-intent`, data)
}

export const createPaymentSessionAPI = async (
  data: any
): Promise<{
  id: string
}> => {
  return await authorizedAxiosInstance.post(`${API_ROOT}/v1/enroll/create-checkout-session`, data)
}

export const checkUserEnrollAPI = async (courseId: string) => {
  return await authorizedAxiosInstance.post(`${API_ROOT}/v1/enroll/check-user-enroll`, { courseId: courseId })
}

export const fetchListUserEnrollAPI = async (): Promise<ApiResponse<UserEnrollCourse[]>> => {
  return await authorizedAxiosInstance.get(`${API_ROOT}/v1/enroll/user-enroll-courses`)
}
