import { Key, memo, ReactElement } from 'react'

import classNames from 'classnames/bind'
import styles from './Menu.module.scss'

import Tippy from '@tippyjs/react/headless'

import PopperWrapper from '../PopperWrapper'
import MenuItem from './MenuItem'

import adminSignature from '~/assets/images/admin.svg'
import { useSelector } from 'react-redux'
import { authSelector } from '~/redux/auth/authSelectors'
const cx = classNames.bind(styles)

type MenuProps = {
  children: ReactElement
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any
}
const Menu = ({ children, items = [] }: MenuProps): ReactElement => {
  const { userInfo } = useSelector(authSelector)
  const renderItems = () => {
    return items?.map((item: any, index: Key | null | undefined) => <MenuItem key={index} data={item} />)
  }
  return (
    <Tippy
      interactive
      delay={[0, 300]}
      offset={[12, 8]}
      trigger="click"
      render={(attrs) => (
        <div className={cx('menu-list')} tabIndex={-1} {...attrs}>
          <PopperWrapper className={cx('menu-popper')}>
            <div className={cx('userMenu')}>
              <div
                className={cx('userMenu_avatar')}
                style={{
                  background: `${userInfo?.role === 'admin' && 'linear-gradient(180deg, #ffd900, #b45264 93.68%)'}`
                }}
              >
                <img className={cx('avatar')} src={userInfo?.avatar_url} alt="avatar" />
                {userInfo?.role === 'admin' && <img src={adminSignature} alt="" className={cx('adminSignature')} />}
              </div>
              <div className={cx('userMenu_info')}>
                <span className={cx('userMenu_name')}>{userInfo?.fullName}</span>
                <span className={cx('userMenu_email')}>{userInfo?.email}</span>
              </div>
            </div>
            <hr />
            {renderItems()}
          </PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  )
}

export default memo(Menu)
