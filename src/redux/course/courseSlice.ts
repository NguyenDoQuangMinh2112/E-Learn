import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Chapter, Course, CourseInfo } from '~/interfaces/course'
import { fetchCourses, fetchChapters, fetchDetailCourse } from './courseAction'
import { PaginationInfo } from '~/interfaces/ApiResponse'

interface CourseState {
  courseDetail: CourseInfo | null
  loading: boolean
  error: string | null
  chapters: Chapter[] | null
  isEnroll: boolean | null
  listCourse: Course[] | null
  pagination: PaginationInfo | null
}
const initialState: CourseState = {
  courseDetail: null,
  loading: false,
  error: null,
  chapters: null,
  isEnroll: null,
  listCourse: null,
  pagination: null
}

const courseSlice = createSlice({
  name: 'courseSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDetailCourse.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDetailCourse.fulfilled, (state, action: PayloadAction<CourseInfo>) => {
        state.loading = false
        state.courseDetail = action.payload
      })
      .addCase(fetchDetailCourse.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'An error occurred.'
      })
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false
        state.listCourse = action.payload.listCourse
        state.pagination = action.payload.pagination || null
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'An error occurred.'
      })
      .addCase(fetchChapters.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchChapters.fulfilled, (state, action) => {
        state.loading = false
        state.chapters = action.payload
      })
      .addCase(fetchChapters.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'An error occurred.'
      })
  }
})

export const {} = courseSlice.actions
export default courseSlice.reducer
