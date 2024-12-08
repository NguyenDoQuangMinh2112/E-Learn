import classNames from 'classnames/bind'
import styles from './CourseItem.module.scss'

import { FaCirclePlay } from 'react-icons/fa6'
import { GoClockFill } from 'react-icons/go'

import { useNavigate } from 'react-router-dom'

import { formatPrice, getLastTwoNames } from '~/utils/helper'
import { Course } from '~/interfaces/course'
import { checkUserEnrollAPI } from '~/apis/enroll'

import { useCallback } from 'react'

interface CourseItemInterface {
  data: Course
  isHide?: boolean
}

const cx = classNames.bind(styles)

const CourseItem = ({ data, isHide }: CourseItemInterface) => {
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
    <div className={cx('col')} key={data._id}>
      <div className={cx('wrapper')}>
        <div className={cx('link')} onClick={handleNavigation}>
          <img src={data.thumbnail} alt="CourseItem" loading="lazy" />
        </div>
        <div className={cx('content')}>
          <h3 className={cx('title')}>
            <span>{data.title}</span>
          </h3>
          {!isHide && (
            <div className={cx('price')}>
              <span className={cx('main-price')}>{`${formatPrice(Number(data.price))}`} đ</span>
            </div>
          )}
          <div className={cx('details')}>
            <div className={cx('moreInfo')}>
              <div className={cx('teacher')}>
                <img className={cx('images')} src={data?.instructor?.avatar_url} alt="logo" loading="lazy" />
              </div>
              <span className={cx('name')}>{getLastTwoNames(data?.instructor?.fullName)}</span>
            </div>

            {!isHide && (
              <div className={cx('moreInfo', 'd-xxl-none d-sm-flex')}>
                <FaCirclePlay />
                <span className={cx('students')}>40</span>
              </div>
            )}

            {!isHide && (
              <div className={cx('moreInfo')}>
                <GoClockFill />
                <span className={cx('duration')}>40h</span>
              </div>
            )}

            {!!isHide && (
              <div className={cx('moreInfo')}>
                <span className={cx('duration')}>6 người đã xem</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseItem
