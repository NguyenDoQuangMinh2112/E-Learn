import { createAsyncThunk } from "@reduxjs/toolkit"
import { getNoteLessonByLessonIdAPI } from "~/apis/course"
import { NoteLesson } from "~/interfaces/noteLesson"

export const fetchNoteLessonByLessonID = createAsyncThunk<NoteLesson[], string>('noteLesson/fetchNoteLessonByLessonID', async (lessonId) => {
    const response = await getNoteLessonByLessonIdAPI(lessonId)
    if (response.statusCode !== 200) {
      throw new Error('Failed to fetch course details')
    } else {
      return response.data
    }
  })