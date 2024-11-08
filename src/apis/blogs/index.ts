import authorizedAxiosInstance from '~/axios'
import { ApiResponse } from '~/interfaces/ApiResponse'
import { Blog, Comment } from '~/interfaces/blog'
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

export const getCommentByBlogAPI = async (id: string): Promise<ApiResponse<Comment[]>> => {
  return await authorizedAxiosInstance.get(`${API_ROOT}/v1/comment/${id}`)
}

export const reactionBlogAPI = async (payload: {
  blogId: string
  isLiked: boolean
}): Promise<ApiResponse<{ statusCode: number; data: { like_by_user: boolean } }>> => {
  return await authorizedAxiosInstance.post(`${API_ROOT}/v1/blog/reactions`, payload)
}

export const checkLikedByUserAPI = async (payload: {
  blogId: string
}): Promise<ApiResponse<{ statusCode: number; data: number }>> => {
  return await authorizedAxiosInstance.post(`${API_ROOT}/v1/blog/isliked-by-user`, payload)
}
