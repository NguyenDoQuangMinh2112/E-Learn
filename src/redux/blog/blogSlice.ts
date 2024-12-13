import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetBlogs, fetchCommentByBlog, fetchDetailBlog } from './blogAction'
import { Blog, Comment } from '~/interfaces/blog'
import { PaginationInfo } from '~/interfaces/ApiResponse'

interface CourseState {
  blogs: Blog[]
  pagination: PaginationInfo | null
  blogDetail: Blog | null
  loading: boolean
  error: string | null
  isShowReplyForm: boolean
  commentByBlog: Comment[] | null
}
const initialState: CourseState = {
  blogs: [],
  blogDetail: null,
  loading: false,
  error: null,
  isShowReplyForm: false,
  commentByBlog: null,
  pagination: null
}

const blogSlice = createSlice({
  name: 'blogSlice',
  initialState,
  reducers: {
    toggleShowRepplyForm: (state, action) => {
      state.isShowReplyForm = action.payload
    },
    updateBlog(state, action) {
      state.blogDetail = {
        ...state.blogDetail,
        ...action.payload
      }
    },

    updateCommentByBlog: (state, action) => {
      if (action.payload.parent === null) {
        state.commentByBlog = state.commentByBlog ? [action.payload, ...state.commentByBlog] : [action.payload]
      } else {
        const findComment = state.commentByBlog?.find((cmt) => cmt._id === action.payload.parent)
        findComment?.replies?.push(action.payload)
        findComment?.children?.push(action.payload._id)
        state.commentByBlog = state.commentByBlog ? [action.payload, ...state.commentByBlog] : [action.payload]
      }
    },

    deleteBlog: (state, action) => {
      const idBlog = action.payload

      state.blogs = state.blogs.filter((blog) => blog._id !== idBlog)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetBlogs.pending, (state) => {
        state.loading = true
      })
      .addCase(fetBlogs.fulfilled, (state, action) => {
        state.loading = false
        state.blogs = action.payload.blogs
        state.pagination = action.payload.pagination || null
      })
      .addCase(fetBlogs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchDetailBlog.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDetailBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false
        state.blogDetail = action.payload
      })
      .addCase(fetchDetailBlog.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'An error occurred while fetching detail.'
      })

      .addCase(fetchCommentByBlog.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCommentByBlog.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.loading = false
        state.commentByBlog = action.payload
      })
      .addCase(fetchCommentByBlog.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'An error occurred while fetching detail.'
      })
  }
})

export const { toggleShowRepplyForm, updateBlog, updateCommentByBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer
