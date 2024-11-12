import { useEffect, useState } from 'react'
import styles from './Setting.module.scss'
import classNames from 'classnames/bind'

import { NavLink } from 'react-router-dom'

import avatar from '~/assets/images/logo-black.png'
import Button from '~/components/Button'
import { sideBarSettingAcountPage } from '~/utils/menu'
import PersonalInfo from './PersonalInfo '
import SecuritySettings from './SecuritySettings '

const cx = classNames.bind(styles)

const Setting = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null)
  useEffect(() => {
    // Đặt activeItem là ID của nút đầu tiên khi component được mount
    if (sideBarSettingAcountPage && sideBarSettingAcountPage.length > 0) {
      setActiveItem(sideBarSettingAcountPage[0].id)
    }
  }, [sideBarSettingAcountPage])
  return (
    <div className={cx('wrapper', 'container')}>
      <div className={cx('row_1', 'row')}>
        <div className={cx('col col-3 col-xxxl-4 col-lg-12')}>
          <aside className={cx('left_content')}>
            <div className={cx('content')}>
              <header>
                <NavLink to="/">
                  <img src={avatar} alt="avatar" className={cx('logo_btn')} />
                </NavLink>
                <h2 className={cx('title')}>Cài đặt tài khoản</h2>
                <p className={cx('des')}>
                  Quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài đặt bảo mật, quản lý thông báo, v.v.
                </p>
              </header>

              <nav className={cx('nav')}>
                {sideBarSettingAcountPage?.map((sidebar) => (
                  <Button
                    key={sidebar.id}
                    classNameTitle={cx('title')}
                    classNameIcon={cx('icon')}
                    leftIcon={sidebar.icons}
                    className={cx('link_btn', { active: activeItem === sidebar.id })}
                    onClick={() => setActiveItem(sidebar.id)}
                  >
                    {sidebar.text}
                  </Button>
                ))}
              </nav>
            </div>
          </aside>
        </div>
        <div className={cx('col col-6 col-xxxxl-7 col-xxxl-8 col-lg-12')}>
          {activeItem === 1 && <PersonalInfo />}

          {activeItem === 2 && <SecuritySettings />}
        </div>
      </div>
    </div>
  )
}

export default Setting
