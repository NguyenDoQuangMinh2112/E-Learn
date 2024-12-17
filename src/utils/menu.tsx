import { SideBarMenuItem } from '~/interfaces/menu'
import icons from './icons'

const { IoHome, GrContact, FaRegNewspaper, FaUserCog, IoShield } = icons
export const sideBarMenu: SideBarMenuItem[] = [
  {
    id: 1,
    icons: <IoHome />,
    text: 'Home',
    path: '/'
  },
  {
    id: 2,
    icons: <FaRegNewspaper />,
    text: 'Blogs',
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
    text: 'Personal information',
    icons: <FaUserCog size="20" />
  },
  {
    id: 2,
    text: 'Password and security',
    icons: <IoShield />
  }
]
