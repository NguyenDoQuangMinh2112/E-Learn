import { Key, ReactElement } from 'react'

import classNames from 'classnames/bind'
import styles from './Menu.module.scss'

import Tippy from '@tippyjs/react/headless'

import PopperWrapper from '../PopperWrapper'
import MenuItem from './MenuItem'

import adminSignature from '~/assets/images/admin.svg'
const cx = classNames.bind(styles)

type MenuProps = {
  children: ReactElement
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any
}
const Menu = ({ children, items = [] }: MenuProps): ReactElement => {
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
              <div className={cx('userMenu_avatar')}>
                <img
                  className={cx('avatar')}
                  src="https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-1/334494904_909968490428262_1880365116923209069_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeErH2P7xEeo-vkOF98bYC1I-2A4wtwBWXv7YDjC3AFZe6D-FvUkuCF_XJ3a7smeJ6xuy9uvzpa-wEnnm0OUwpJl&_nc_ohc=hENnBr3Q8lQQ7kNvgFsH_Qd&_nc_ht=scontent.fdad3-6.fna&oh=00_AYAgReDNx1EtPXglQBzbH_ViOn09SzcHo6tOC3Kor04T-Q&oe=66AD4F40"
                  alt="avatar"
                />
                <img src={adminSignature} alt="" className={cx('adminSignature')} />
              </div>
              <div className={cx('userMenu_info')}>
                <span className={cx('userMenu_name')}>Minh Nguyen Do Quang</span>
                <span className={cx('userMenu_email')}>@nguyendoquangminh2112</span>
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

export default Menu
