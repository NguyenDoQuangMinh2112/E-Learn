import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CourseInfo, Lesson } from '~/interfaces/course'
import { fetchDetailCourse } from './courseAction'

interface CourseState {
  courseDetail: CourseInfo | null
  loading: boolean
  error: string | null
  activeLesson: Lesson | null
}
const initialState: CourseState = {
  courseDetail: null,
  loading: false,
  error: null,
  activeLesson: null
}

const courseSlice = createSlice({
  name: 'courseSlice',
  initialState,
  reducers: {
    setActiveLesson: (state, action: PayloadAction<Lesson>) => {
      state.activeLesson = action.payload
    }
  },
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
  }
})

export const { setActiveLesson } = courseSlice.actions
export default courseSlice.reducer
