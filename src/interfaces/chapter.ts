import { Quiz } from './exercise'
import { Lesson } from './lesson'

export interface Chapter {
  _id: string
  title: string
  courseId: string
  order: number
  lessons: Lesson[]
  exercises?: Quiz[]
  createdAt: number
  updatedAt: number | null
  _destroy: boolean
}