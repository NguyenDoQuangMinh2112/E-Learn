import { configureStore } from '@reduxjs/toolkit'
import popupReducer from './popup/popupSlice'
import noteLessonReducer from './noteLesson/noteLesson'
const store = configureStore({
  reducer: {
    popup: popupReducer,
    noteLesson: noteLessonReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
