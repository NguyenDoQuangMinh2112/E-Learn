import authorizedAxiosInstance from '~/axios'
import { ApiResponse } from '~/interfaces/ApiResponse'
import { Lesson } from '~/interfaces/lesson'
import { API_ROOT } from '~/utils/constant'

export const getDetailLessonAPI = async (id: string): Promise<ApiResponse<Lesson>> =>
  authorizedAxiosInstance.get(`${API_ROOT}/v1/lesson/${id}`)
