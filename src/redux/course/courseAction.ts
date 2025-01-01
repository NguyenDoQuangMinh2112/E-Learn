import { createAsyncThunk } from '@reduxjs/toolkit'
import { Course, CourseInfo } from '~/interfaces/course'
import * as apis from '~/apis/course'
import { Chapter } from '~/interfaces/course'
import { getChaptersByCourseIdAPI } from '~/apis/chapter'
import { PaginationInfo } from '~/interfaces/ApiResponse'

export const fetchDetailCourse = createAsyncThunk<CourseInfo, string>('courses/fetchDetailCourse', async (courseId) => {
  const response = await apis.getDetailCourseAPI(courseId)
  if (response.statusCode !== 200) {
    throw new Error('Failed to fetch course details')
  } else {
    return response.data
  }
})

export const fetchChapters = createAsyncThunk<Chapter[], string>('courses/fetchChapters', async (id) => {
  const response = await getChaptersByCourseIdAPI(id)
  if (response.statusCode !== 200) {
    throw new Error('Failed to fetch chapters')
  } else {
    return response.data
  }
})

export const fetchCourses = createAsyncThunk<
  { listCourse: Course[]; pagination?: PaginationInfo },
  { limit?: number; page?: number }
>('courses/fetchCourses', async ({ limit, page }, thunkAPI) => {
  try {
    // Gọi API với logic phù hợp
    const response = await apis.getAllCourseAPI(limit, page)
    if (response.statusCode !== 200) {
      return thunkAPI.rejectWithValue('Failed to fetch blogs.')
    }
    return { listCourse: response.data, pagination: response.pagination }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'An error occurred.')
  }
})
