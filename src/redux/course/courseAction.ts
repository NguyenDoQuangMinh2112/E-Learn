import { createAsyncThunk } from '@reduxjs/toolkit'
import { CourseInfo } from '~/interfaces/course'
import * as apis from '~/apis/course'

export const fetchDetailCourse = createAsyncThunk<CourseInfo, string>('courses/fetchDetailCourse', async (courseId) => {
  const response = await apis.getDetailCourseAPI(courseId)
  if (response.statusCode !== 200) {
    throw new Error('Failed to fetch course details')
  } else {
    return response.data
  }
})
