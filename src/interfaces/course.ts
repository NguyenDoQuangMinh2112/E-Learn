interface Instructor {
  fullName: string
  email?: string
  role?: string
  thumbnail?: string
  avatar_url?: string
}

export interface Lesson {
  _id: string
  courseId: string
  title: string
  chapter_id: string
  order: number
  videoUrl: string
  createdAt: number
  updatedAt: number | null
  _destroy: boolean
}

export interface Chapter {
  _id: string
  title: string
  courseId: string
  order: number
  lessons: Lesson[]
  createdAt: number
  updatedAt: number | null
  _destroy: boolean
}

export interface Course {
  _id: string
  title: string
  description?: string
  price: number
  thumbnail: string
  noteVideo?: any[] // Update the type if you have a specific structure for noteVideo
  chapters?: string[] // Array of chapter ObjectIds
  createdAt?: number // Timestamp
  updatedAt?: number | null // Can be null if not updated
  _destroy?: boolean
  instructor: Instructor // Object containing instructor's information
}

export interface CourseInfo {
  _id: string
  title: string
  description: string
  price: number
  noteVideo: string[]
  chapters: Chapter[]
  createdAt: number
  updatedAt: number | null
  _destroy: boolean
  instructor: Instructor
}
