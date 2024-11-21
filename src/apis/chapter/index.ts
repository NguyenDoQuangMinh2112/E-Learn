import authorizedAxiosInstance from '~/axios'
import { ApiResponse } from '~/interfaces/ApiResponse'
import { Chapter } from '~/interfaces/course'
import { Quiz } from '~/interfaces/exercise'
import { API_ROOT } from '~/utils/constant'

export const getChaptersByCourseIdAPI = async (id: string): Promise<ApiResponse<Chapter[]>> =>
  authorizedAxiosInstance.get(`${API_ROOT}/v1/chapter/${id}`)

export const getDetailExerciseAPI = async (id: string): Promise<ApiResponse<Quiz>> =>
  authorizedAxiosInstance.get(`${API_ROOT}/v1/exercise/${id}`)
