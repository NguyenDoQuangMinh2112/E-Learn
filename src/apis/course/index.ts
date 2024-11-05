import authorizedAxiosInstance from '~/axios'
import { ApiResponse } from '~/interfaces/ApiResponse'
import { Course, CourseInfo, LessonNote } from '~/interfaces/course'
import { NoteLesson } from '~/interfaces/noteLesson'
import { API_ROOT } from '~/utils/constant'

export const getAllCourseAPI = async (): Promise<ApiResponse<Course[]>> => {
  return await authorizedAxiosInstance.get(`${API_ROOT}/v1/course`)
}

export const getDetailCourseAPI = async (idC: string): Promise<ApiResponse<CourseInfo>> => {
  return await authorizedAxiosInstance.get(`${API_ROOT}/v1/course/${idC}`)
}

export const createCourseAPI = async () => {
  return await authorizedAxiosInstance.get(`${API_ROOT}/v1/course`)
}

export const addNoteLessonAPI = async (data: {
  course_id: string
  chapter_id: string
  lesson_id: string
  time: string
  content: string
}): Promise<ApiResponse<LessonNote>> => {
  return await authorizedAxiosInstance.post(`${API_ROOT}/v1/lesson/add-noteLesson`, data)
}

export const getNoteLessonByLessonIdAPI = async (lessonId:string):Promise<ApiResponse<NoteLesson[]>> => {
  return await authorizedAxiosInstance.get(`${API_ROOT}/v1/lesson/list-note/${lessonId}`)
}
