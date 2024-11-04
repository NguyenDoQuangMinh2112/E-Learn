import authorizedAxiosInstance from '~/axios'
import { ApiResponse } from '~/interfaces/ApiResponse'
import { Comment } from '~/interfaces/blog'
import { API_ROOT } from '~/utils/constant'

export const addCommentAPI = async (data: any): Promise<ApiResponse<Comment>> => {
  return await authorizedAxiosInstance.post(`${API_ROOT}/v1/comment/add-comment`, data)
}
