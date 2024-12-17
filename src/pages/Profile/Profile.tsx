import classNames from 'classnames/bind'
import styles from './Profile.module.scss'

import profileBanner from '~/assets/images/profileBanner.png'

import { FaUserGroup } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authSelector } from '~/redux/auth/authSelectors'
import { useEffect, useState } from 'react'
import { fetchListUserEnrollAPI } from '~/apis/enroll'
import { UserEnrollCourse } from '~/interfaces/course'
import CourseEnroll from './CourseEnroll/CourseEnroll'
import MetaData from '~/components/MetaData'
import moment from 'moment'

const cx = classNames.bind(styles)
const Profile = () => {
  const { userInfo } = useSelector(authSelector)
  const [data, setData] = useState<UserEnrollCourse[] | null>(null)

  const fetchListCourseEnrollment = async () => {
    const res = await fetchListUserEnrollAPI()

    if (res.statusCode === 200) {
      setData(res.data)
    }
  }

  useEffect(() => {
    fetchListCourseEnrollment()
  }, [])
  return (
    <>
      <MetaData title={`${userInfo?.fullName} | ELearn`} />
      <div className={cx('wrapper')}>
        <div className={cx('banner')} style={{ backgroundImage: `url(${profileBanner})` }}>
          <div className={cx('user')}>
            <div className={cx('user-avatar')}>
              <img src={userInfo?.avatar_url} alt="avatar" className={cx('avatar')} />
            </div>
            <div className={cx('user-name')}>
              <h3>{userInfo?.fullName}</h3>
            </div>
          </div>
        </div>

        <div className={cx('container')}>
          <div className={cx('row')}>
            <section className={cx('left')}>
              <div className={cx('content')}>
                <h4 className={cx('title')}>Introduce</h4>
                <div className={cx('paticipation')}>
                  <div className={cx('icon')}>
                    <FaUserGroup />
                  </div>
                  <span>
                    Member of: <span style={{ fontWeight: '600' }}>E-Learn </span>{' '}
                    {moment(userInfo?.createdAt).fromNow()}.
                  </span>
                </div>
              </div>
            </section>
            <section className={cx('right')}>
              <div className={cx('content')}>
                <h4 className={cx('title')}>Courses attended</h4>

                {!data?.length && (
                  <div className={cx('no-course')}>
                    Bạn chưa đăng ký khóa học nào 👉
                    <NavLink to="/">Trang chủ</NavLink>
                  </div>
                )}

                {!!data?.length && data?.map((course) => <CourseEnroll data={course} key={course._id} />)}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
