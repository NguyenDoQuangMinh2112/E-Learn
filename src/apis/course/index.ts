import authorizedAxiosInstance from '~/axios'
import { ApiResponse } from '~/interfaces/ApiResponse'
import { Course, CourseInfo } from '~/interfaces/course'
import { API_ROOT } from '~/utils/constant'

export const getAllCourseAPI = async (): Promise<ApiResponse<Course[]>> => {
  return await authorizedAxiosInstance.get(`${API_ROOT}/v1/course`)
}

export const getDetailCourseAPI = async (idC: string): Promise<ApiResponse<CourseInfo>> => {
  return await authorizedAxiosInstance.get(`${API_ROOT}/v1/course/${idC}`)
}

export const createCourseAPI = async () => {
  return await authorizedAxiosInstance.get(`${API_ROOT}/v1/course`)
}
