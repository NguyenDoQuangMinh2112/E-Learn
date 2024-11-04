import { createAsyncThunk } from '@reduxjs/toolkit'

import * as apis from '~/apis/blogs'
import { Blog } from '~/interfaces/blog'

// Api get all courses
export const fetBlogs = createAsyncThunk<Blog[], void>('blogs/fetBlogs', async () => {
  const response = await apis.getAllBlogAPI()
  if (response.statusCode !== 200) {
    throw new Error('Failed to fetch blogs.')
  } else {
    return response.data
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
