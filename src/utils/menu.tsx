import { SideBarMenuItem } from '~/interfaces/menu'
import icons from './icons'

const { IoHome, FaRoad, FaRegNewspaper } = icons
export const sideBarMenu: SideBarMenuItem[] = [
  {
    id: 1,
    icons: <IoHome />,
    text: 'Trang chủ',
    path: '/'
  },
  {
    id: 2,
    icons: <FaRoad />,
    text: 'Lộ Trình',
    path: '/roadmap'
  },
  {
    id: 3,
    icons: <FaRegNewspaper />,
    text: 'Bài viết',
    path: '/blog'
  }
]