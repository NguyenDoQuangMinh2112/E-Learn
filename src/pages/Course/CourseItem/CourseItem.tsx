import classNames from 'classnames/bind'
import styles from './CourseItem.module.scss'

import moment from 'moment'

import { formatPrice, getLastTwoNames } from '~/utils/helper'
import { FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Course } from '~/interfaces/course'
import { useCallback } from 'react'
import { checkUserEnrollAPI } from '~/apis/enroll'
const cx = classNames.bind(styles)

interface courseItemProps {
  data: Course
}

const CourseItem = ({ data }: courseItemProps) => {
  const navigate = useNavigate()
  const handleNavigation = useCallback(async () => {
    const res = await checkUserEnrollAPI(data._id)

    if (res) {
      navigate(`/course/learning/${data._id}`)
    } else {
      navigate(`/course/${data._id}`)
    }
  }, [data._id])
  return (
    <li className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('author')}>
          <div
            className={cx('userMenu_avatar')}
            style={{
              background: `${data.instructor?.role === 'admin' && 'linear-gradient(180deg, #ffd900, #b45264 93.68%)'}`
            }}
          >
            <img className={cx('avatar')} src={data.instructor.avatar_url} alt="avatar" loading="lazy" />
            {data.instructor?.role === 'admin' && <img src="" alt="" className={cx('adminSignature')} />}
          </div>
          <span>{getLastTwoNames(data?.instructor.fullName)}</span>
          {data.instructor?.role === 'admin' && <FaCheckCircle className={cx('icon')} />}
        </div>
      </div>
      <div className={cx('body')}>
        <div className={cx('info')}>
          <h2 className={cx('title')} onClick={handleNavigation}>
            {data.title}
          </h2>

          <p className={cx('des')}>{data?.description}</p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '4px' }}>
            <p className={cx('price')}>{formatPrice(Number(data?.price))} đ</p>
            <span>{moment(data?.createdAt).fromNow()}</span>
          </div>
        </div>

        <div className={cx('thumb', 'd-xl-none')}>
          <div onClick={handleNavigation}>
            <img src={data.thumbnail} alt="thumb" loading="lazy" />
          </div>
        </div>
      </div>
    </li>
  )
}

export default CourseItem
