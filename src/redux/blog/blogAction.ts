import { createAsyncThunk } from '@reduxjs/toolkit'

import * as apis from '~/apis/blogs'
import { PaginationInfo } from '~/interfaces/ApiResponse'
import { Blog, Comment } from '~/interfaces/blog'

// Api get all blogs
export const fetBlogs = createAsyncThunk<
  { blogs: Blog[]; pagination?: PaginationInfo },
  { limit?: number; page?: number }
>('blogs/fetBlogs', async ({ limit, page }, thunkAPI) => {
  try {
    // Gọi API với logic phù hợp
    const response = await apis.getAllBlogAPI(limit, page)
    if (response.statusCode !== 200) {
      return thunkAPI.rejectWithValue('Failed to fetch blogs.')
    }
    return { blogs: response.data, pagination: response.pagination }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'An error occurred.')
  }
})

export const fetchDetailBlog = createAsyncThunk<Blog, string>('blogs/fetchDetailBlog', async (blogId) => {
  const response = await apis.getDetailBlogAPI(blogId)
  if (response.statusCode !== 200) {
    throw new Error('Failed to fetch course details')
  } else {
    return response.data
  }
})

export const fetchCommentByBlog = createAsyncThunk<Comment[], string>('blogs/fetchCommentByBlog', async (blogId) => {
  const response = await apis.getCommentByBlogAPI(blogId)
  if (response.statusCode !== 200) {
    throw new Error('Failed to fetch course details')
  } else {
    return response.data
  }
})
