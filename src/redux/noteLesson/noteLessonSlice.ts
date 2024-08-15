import { createSlice } from '@reduxjs/toolkit'

interface NoteLessonState {
  isOpenNoteLesson: boolean
  myNotes: Array<{ id: number; title: string; content: string }>
}
const initialState: NoteLessonState = {
  isOpenNoteLesson: false,
  myNotes: []
}

const noteLessonSlice = createSlice({
  name: 'noteLesson',
  initialState,
  reducers: {
    showNoteLesson: (state) => {
      state.isOpenNoteLesson = true
    },
    hideNoteLesson: (state) => {
      state.isOpenNoteLesson = false
    }
  }
})

export const { showNoteLesson, hideNoteLesson } = noteLessonSlice.actions
export default noteLessonSlice.reducer
