export interface BlogActivity {
  total_likes: number
  total_comments: number
  total_reads: number
  total_parent_comments: number
}
export interface Comment {
  _id: string
  blog_id: string
  blog_author: string
  comment: string
  childrenLevel?: number
  commented_by: {
    fullName: string
    avatar_url: string
  }
  parent?: string
  createdAt: string
  children: any[]
  replies?: Comment[]
  isReply: boolean
  updatedAt: string | null
  _destroy: boolean
}
export interface Blog {
  _id: number
  title: string
  banner: string
  des: string
  content: string[]
  tags?: string[]
  author: {
    fullName: string
    avatar_url: string
    role: 'admin' | 'student' | 'teacher'
  }
  activity: BlogActivity
  comments?: Comment[] // Array of Object IDs
  draft?: boolean
  views: number
  createdAt: number // Timestamp
  updatedAt: number | null // Timestamp or null
  _destroy?: boolean
}
