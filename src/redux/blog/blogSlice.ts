import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetBlogs, fetchDetailBlog } from './blogAction'
import { Blog } from '~/interfaces/blog'

interface CourseState {
  blogs: Blog[]
  blogDetail: Blog | null
  loading: boolean
  error: string | null
  isShowReplyForm: boolean
}
const initialState: CourseState = {
  blogs: [],
  blogDetail: null,
  loading: false,
  error: null,
  isShowReplyForm: false
}

const blogSlice = createSlice({
  name: 'blogSlice',
  initialState,
  reducers: {
    toggleShowRepplyForm: (state, action) => {
      state.isShowReplyForm = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetBlogs.pending, (state) => {
        state.loading = true
      })
      .addCase(fetBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.loading = false
        state.blogs = action.payload
      })

      .addCase(fetBlogs.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'An error occurred.'
      })
      .addCase(fetchDetailBlog.pending, (state) => {
        state.loading = true
        state.error = null // Reset error khi bắt đầu fetch detail
      })
      .addCase(fetchDetailBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false
        state.blogDetail = action.payload // Lưu chi tiết blog
      })
      .addCase(fetchDetailBlog.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'An error occurred while fetching detail.'
      })
  }
})

export const { toggleShowRepplyForm } = blogSlice.actions
export default blogSlice.reducer
