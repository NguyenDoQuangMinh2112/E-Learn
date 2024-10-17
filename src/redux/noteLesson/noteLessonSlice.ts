import { createSlice } from '@reduxjs/toolkit'

interface NoteLessonState {
  isOpenNoteLesson: boolean
  myNotes: Array<{ id: number; title: string; content: string; time: string }>
}
const initialState: NoteLessonState = {
  isOpenNoteLesson: false,
  myNotes: [
    { id: 1, title: 'Lời khuyên trước khóa học', content: 'Note 1', time: '00:01' },
    { id: 2, title: 'Lời khuyên trước khóa học 2', content: 'Note 2', time: '00:02' },
    { id: 3, title: 'Lời khuyên trước khóa học 3', content: 'Note 3', time: '00:03' }
  ]
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
    },
    createNewNoteLesson: (state, action) => {
      const { id, title, content, time } = action.payload
      state.myNotes.push({ id: id, title: title, content: content, time: time })
    }
  }
})

export const { showNoteLesson, hideNoteLesson, createNewNoteLesson } = noteLessonSlice.actions
export default noteLessonSlice.reducer
