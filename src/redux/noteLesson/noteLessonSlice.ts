import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchNoteLessonByLessonID } from './noteLessonAction'
import { NoteLesson } from '~/interfaces/noteLesson'

interface NoteLessonState {
  isOpenNoteLesson: boolean
  loading: boolean
  isOpenChat: boolean
  error: string | null
  myNoteLessons: NoteLesson[] | null
  selectedTime: number | null
}
const initialState: NoteLessonState = {
  isOpenNoteLesson: false,
  isOpenChat: false,
  loading: false,
  myNoteLessons: null,
  error: null,
  selectedTime: null
}

const noteLessonSlice = createSlice({
  name: 'noteLesson',
  initialState,
  reducers: {
    setSelectedTime(state, action: PayloadAction<number>) {
      state.selectedTime = action.payload
    },
    showNoteLesson: (state) => {
      state.isOpenNoteLesson = true
    },
    hideNoteLesson: (state) => {
      state.isOpenNoteLesson = false
    },
    showChat: (state) => {
      state.isOpenChat = true
    },
    hideChat: (state) => {
      state.isOpenChat = false
    },
    deleteNoteLesson(state, action) {
      const { id } = action.payload
      state.myNoteLessons = state.myNoteLessons?.filter((note) => note._id !== id) || []
    },
    updateNoteLesson(state, action) {
      const { _id, content } = action.payload

      if (state?.myNoteLessons) {
        const noteIndex = state.myNoteLessons.findIndex((note) => note._id === _id)

        if (noteIndex !== -1) {
          state.myNoteLessons[noteIndex] = {
            ...state.myNoteLessons[noteIndex],
            content: content
          }
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNoteLessonByLessonID.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchNoteLessonByLessonID.fulfilled, (state, action: PayloadAction<NoteLesson[]>) => {
        state.loading = false
        state.myNoteLessons = action.payload
      })

      .addCase(fetchNoteLessonByLessonID.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'An error occurred.'
      })
  }
})

export const {
  setSelectedTime,
  showNoteLesson,
  hideNoteLesson,
  showChat,
  hideChat,
  updateNoteLesson,
  deleteNoteLesson
} = noteLessonSlice.actions
export default noteLessonSlice.reducer
