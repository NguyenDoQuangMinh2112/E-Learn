import { createAsyncThunk } from '@reduxjs/toolkit'
import { CourseInfo } from '~/interfaces/course'
import * as apis from '~/apis/course'
import { Chapter } from '~/interfaces/course'
import { getChaptersByCourseIdAPI } from '~/apis/chapter'

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
