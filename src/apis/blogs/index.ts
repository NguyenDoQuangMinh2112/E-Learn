import authorizedAxiosInstance from '~/axios'
import { ApiResponse } from '~/interfaces/ApiResponse'
import { Blog } from '~/interfaces/blog'
import { API_ROOT } from '~/utils/constant'

export const createBlogAPI = async (data: any): Promise<ApiResponse<Blog[]>> => {
  return await authorizedAxiosInstance.post(`${API_ROOT}/v1/blog/create`, data)
}

export const getAllBlogAPI = async (): Promise<ApiResponse<Blog[]>> => {
  return await authorizedAxiosInstance.get(`${API_ROOT}/v1/blog/`)
}

export const getDetailBlogAPI = async (id: string): Promise<ApiResponse<Blog>> => {
  return await authorizedAxiosInstance.get(`${API_ROOT}/v1/blog/${id}`)
}
