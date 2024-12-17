import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Chapter, Course, CourseInfo } from '~/interfaces/course'
import { fetAllCourses, fetchChapters, fetchDetailCourse } from './courseAction'

interface CourseState {
  courseDetail: CourseInfo | null
  loading: boolean
  error: string | null
  chapters: Chapter[] | null
  isEnroll: boolean | null
  listCourse: Course[] | null
}
const initialState: CourseState = {
  courseDetail: null,
  loading: false,
  error: null,
  chapters: null,
  isEnroll: null,
  listCourse: null
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
      .addCase(fetAllCourses.pending, (state) => {
        state.loading = true
      })
      .addCase(fetAllCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.loading = false
        state.listCourse = action.payload
      })
      .addCase(fetAllCourses.rejected, (state, action) => {
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
