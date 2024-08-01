import { createSlice } from '@reduxjs/toolkit'

interface NoteLessonState {
  isOpenNoteLesson: boolean
  myNotes: Array<{ id: number; title: string; content: string }>
}
const initialState: NoteLessonState = {
  isOpenNoteLesson: false,
  myNotes: []
}

const noteLesson = createSlice({
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

export const { showNoteLesson, hideNoteLesson } = noteLesson.actions
export default noteLesson.reducer
