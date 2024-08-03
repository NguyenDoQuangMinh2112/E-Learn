import classNames from 'classnames/bind'
import styles from './Header.module.scss'

import logo from '~/assets/images/logo-black.png'
import Search from '../Search'
import Menu from '../Popper/Menu/Menu'
import Button from '~/components/Button'

import { FaUser } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { MdLogout } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { showPopup } from '~/redux/popup/popupSlice'
import { NavLink } from 'react-router-dom'

const cx = classNames.bind(styles)

const userMenu = [
  {
    icon: <FaUser />,
    title: 'View profile',
    to: '/@hoaa'
  },
  {
    icon: <IoMdSettings />,
    title: 'Settings',
    to: '/settings'
  },
  {
    icon: <MdLogout />,
    title: 'Log out',
    to: '/logout',
    separate: true
  }
]

const Header = () => {
  const user = false
  const dispatch = useDispatch()

  return (
    <header className={cx('wrapper')}>
      {/* left */}
      <div className={cx('header_left')}>
        <NavLink to="/">
          <img className={cx('logo')} src={logo} alt="Logo" />
        </NavLink>
      </div>
      {/* end left */}

      {/* mid */}
      <div className={cx('header_mid')}>
        <Search />
      </div>
      {/* end mid */}

      {/* right */}
      <div className={cx('header_right')}>
        {user ? (
          <Menu items={userMenu}>
            <div className={cx('fallbackAvatar')}>
              <img
                className={cx('avatar')}
                src="https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-1/334494904_909968490428262_1880365116923209069_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeErH2P7xEeo-vkOF98bYC1I-2A4wtwBWXv7YDjC3AFZe6D-FvUkuCF_XJ3a7smeJ6xuy9uvzpa-wEnnm0OUwpJl&_nc_ohc=hENnBr3Q8lQQ7kNvgFsH_Qd&_nc_ht=scontent.fdad3-6.fna&oh=00_AYAgReDNx1EtPXglQBzbH_ViOn09SzcHo6tOC3Kor04T-Q&oe=66AD4F40"
                alt="avatar"
              />
            </div>
          </Menu>
        ) : (
          <>
            <Button className={cx('btn-register')} onClick={() => dispatch(showPopup('register'))}>
              Đăng ký
            </Button>
            <Button className={cx('btn-login')} onClick={() => dispatch(showPopup('login'))}>
              Đăng nhập
            </Button>
          </>
        )}
      </div>
      {/* end right */}
    </header>
  )
}

export default Header
