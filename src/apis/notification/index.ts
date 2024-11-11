import authorizedAxiosInstance from '~/axios'
import { ApiResponse } from '~/interfaces/ApiResponse'
import { NotificationInterface } from '~/interfaces/notification'
import { API_ROOT } from '~/utils/constant'

export const getNotificationByUserIdAPI = (): Promise<ApiResponse<NotificationInterface[]>> =>
  authorizedAxiosInstance.get(`${API_ROOT}/v1/notification`)
