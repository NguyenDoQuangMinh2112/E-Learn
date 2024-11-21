import { SideBarMenuItem } from '~/interfaces/menu'
import icons from './icons'

const { IoHome, FaRoad, FaRegNewspaper, FaUserCog, IoShield } = icons
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
    path: '/blog'
  },
  {
    id: 3,
    icons: <FaRoad />,
    text: 'Teach on Elearn',
    path: '/teach-on-elearn'
  }
]

export const sideBarSettingAcountPage = [
  {
    id: 1,
    text: 'Thông tin cá nhân',
    // path: '/setting/account',
    icons: <FaUserCog size="20" />
  },
  {
    id: 2,
    text: 'Mật khẩu và bảo mật',
    // path: '/setting/account/management',
    icons: <IoShield />
  }
]
