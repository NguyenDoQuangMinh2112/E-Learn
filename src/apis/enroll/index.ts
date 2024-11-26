import authorizedAxiosInstance from '~/axios'
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
