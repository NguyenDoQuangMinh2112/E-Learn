export interface BlogActivity {
  total_likes: number
  total_comments: number
  total_reads: number
  total_parent_comments: number
}

export interface Blog {
  id: number
  title: string
  banner: string
  des: string
  content: string[]
  tags?: string[]
  author: string // Object ID
  activity: BlogActivity
  comments?: string[] // Array of Object IDs
  draft?: boolean
  createdAt: number // Timestamp
  updatedAt: number | null // Timestamp or null
  _destroy?: boolean
}
