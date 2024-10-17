import authorizedAxiosInstance from '~/axios'
import { API_ROOT } from '~/utils/constant'

export const createBlogAPI = async (data: any) => {
  return await authorizedAxiosInstance.post(`${API_ROOT}/v1/blog/create`, data)
}
