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
import { useSelector } from 'react-redux'
import { authSelector } from '~/redux/auth/authSelectors'

const cx = classNames.bind(styles)

const userMenu = [
  {
    icon: <FaUser />,
    title: 'View profile'
  },
  {
    icon: <IoMdSettings />,
    title: 'Settings'
  },
  {
    icon: <MdLogout />,
    title: 'Log out',
    separate: true
  }
]

const Header = () => {
  const { userInfo } = useSelector(authSelector)
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
        {userInfo ? (
          <Menu items={userMenu}>
            <div className={cx('fallbackAvatar')}>
              <img className={cx('avatar')} src={userInfo.avatar_url} alt="avatar" />
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
