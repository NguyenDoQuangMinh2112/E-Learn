import styles from './Setting.module.scss'
import classNames from 'classnames/bind'

import { FaChevronRight } from 'react-icons/fa'

const cx = classNames.bind(styles)

const SecuritySettings = () => {
  return (
    <main className={cx('wrapper_info')}>
      <h1 className={cx('title')}>Mật khẩu và bảo mật</h1>
      <p className={cx('des')}>Quản lý mật khẩu và cài đặt bảo mật.</p>

      <div className={cx('inner')}>
        <div className={cx('info_content')}>
          <div className={cx('info_details')}>
            <div className={cx('wrapper1')}>
              <h4>Đổi mật khẩu</h4>
              <span>Chưa đổi mật khẩu</span>
            </div>
            <button className={cx('right_btn')}>
              <FaChevronRight />
            </button>
          </div>
          <div className={cx('info_details')}>
            <div className={cx('wrapper1')}>
              <h4>Xác minh 2 bước</h4>
              <span>Đang tắt</span>
            </div>
            <button className={cx('right_btn')}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SecuritySettings
