import classNames from 'classnames/bind'
import styles from './Profile.module.scss'

import profileBanner from '~/assets/images/profileBanner.png'

import { FaUserGroup } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'

const cx = classNames.bind(styles)

const Profile = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('banner')} style={{ backgroundImage: `url(${profileBanner})` }}>
        <div className={cx('user')}>
          <div className={cx('user-avatar')}>
            <img
              src="https://files.fullstack.edu.vn/f8-prod/public-images/6721e710b604b.png"
              alt="avatar"
              className={cx('avatar')}
            />
          </div>
          <div className={cx('user-name')}>
            <h3>Nguyễn Đỗ Quang Minh</h3>
          </div>
        </div>
      </div>

      <div className={cx('container')}>
        <div className={cx('row')}>
          <section className={cx('left')}>
            <div className={cx('content')}>
              <h4 className={cx('title')}>Giới thiệu</h4>
              <div className={cx('paticipation')}>
                <div className={cx('icon')}>
                  <FaUserGroup />
                </div>
                <span>
                  Thành viên của : <span style={{ fontWeight: '600' }}>E-Learn </span> từ 1 tháng trước.
                </span>
              </div>
            </div>
          </section>
          <section className={cx('right')}>
            <div className={cx('content')}>
              <h4 className={cx('title')}>Các khóa học đã tham gia</h4>

              <div className={cx('no-course')}>
                Bạn chưa đăng ký khóa học nào 👉
                <NavLink to="/">Trang chủ</NavLink>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Profile
