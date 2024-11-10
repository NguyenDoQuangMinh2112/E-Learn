export interface searchCourseResultInterface {
  _id: string
  title: string
  thumbnail: string
}

export interface searchBlogResultInterface {
  _id: string
  title: string
  banner: string
}

export interface searchResultInterface {
  courses: searchCourseResultInterface[]
  blogs: searchBlogResultInterface[]
}
