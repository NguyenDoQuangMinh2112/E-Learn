import { Blog } from '~/interfaces/blog'

export const sampleBlogs: Blog[] = [
  {
    id: 1,
    title: 'Lập trình JavaScript cho người mới bắt đầu',
    banner: 'https://example.com/banner1.jpg',
    des: 'Một hướng dẫn chi tiết về JavaScript. Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...',
    content: ['JavaScript là một ngôn ngữ lập trình phổ biến.', 'Nó được sử dụng để phát triển web.'],
    tags: ['JavaScript', 'Lập trình', 'Web'],
    author: '60f5a47a9b0a5c001f1c3c8a',
    activity: {
      total_likes: 100,
      total_comments: 20,
      total_reads: 500,
      total_parent_comments: 15
    },
    comments: ['60f5a47a9b0a5c001f1c3c8b', '60f5a47a9b0a5c001f1c3c8c'],
    draft: false,
    createdAt: Date.now(),
    updatedAt: null,
    _destroy: false
  },
  {
    id: 2,
    title: 'Cách sử dụng Node.js',
    banner: 'https://example.com/banner2.jpg',
    des: 'Một hướng dẫn chi tiết về JavaScript. Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang..Khám phá Node.js và các ứng dụng của nó.',
    content: [
      'Node.js là một môi trường chạy JavaScript bên ngoài trình duyệt.',
      'Nó giúp phát triển các ứng dụng server-side.'
    ],
    tags: ['Node.js', 'Backend', 'Server'],
    author: '60f5a47a9b0a5c001f1c3c8d',
    activity: {
      total_likes: 150,
      total_comments: 30,
      total_reads: 800,
      total_parent_comments: 25
    },
    comments: [],
    draft: true,
    createdAt: Date.now(),
    updatedAt: null,
    _destroy: false
  }
]
