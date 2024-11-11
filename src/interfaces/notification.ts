export interface NotificationInterface {
  _id: string
  type: 'like' | 'comment' | 'reply'
  blog: {
    _id: string
    title: string
  }
  notification_for: {
    _id: string
    fullName: string
    avatar_url: string
  }
  user: {
    _id: string
    fullName: string
    avatar_url: string
  }
  comment: string
  seen: boolean
  createdAt: number
  updatedAt: string | null
  _destroy: boolean
}
