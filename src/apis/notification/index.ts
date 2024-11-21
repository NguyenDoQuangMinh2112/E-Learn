import authorizedAxiosInstance from '~/axios'
import { ApiResponse } from '~/interfaces/ApiResponse'
import { NotificationInterface } from '~/interfaces/notification'
import { API_ROOT } from '~/utils/constant'

export const getNotificationByUserIdAPI = (): Promise<ApiResponse<NotificationInterface[]>> =>
  authorizedAxiosInstance.get(`${API_ROOT}/v1/notification`)

export const markAllNotificationAPI = async () => {
  return await authorizedAxiosInstance.put(`${API_ROOT}/v1/notification/mark-all`)
}

export const markAsSeenNotificationAPI = async (notificationId: string) => {
  return await authorizedAxiosInstance.patch(`${API_ROOT}/v1/notification/${notificationId}`)
}
