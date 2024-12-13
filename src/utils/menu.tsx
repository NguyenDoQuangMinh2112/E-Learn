import { SideBarMenuItem } from '~/interfaces/menu'
import icons from './icons'

const { IoHome, GrContact, FaRegNewspaper, FaUserCog, IoShield } = icons
export const sideBarMenu: SideBarMenuItem[] = [
  {
    id: 1,
    icons: <IoHome />,
    text: 'Trang chủ',
    path: '/'
  },
  {
    id: 2,
    icons: <FaRegNewspaper />,
    text: 'Bài viết',
    path: '/blog?page=1'
  },
  {
    id: 3,
    icons: <GrContact />,
    text: 'Contact',
    path: '/contact'
  }
]

export const sideBarSettingAcountPage = [
  {
    id: 1,
    text: 'Thông tin cá nhân',
    icons: <FaUserCog size="20" />
  },
  {
    id: 2,
    text: 'Mật khẩu và bảo mật',
    icons: <IoShield />
  }
]
