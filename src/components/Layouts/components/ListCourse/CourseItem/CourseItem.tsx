import classNames from 'classnames/bind'
import styles from './CourseItem.module.scss'

import { FaCirclePlay } from 'react-icons/fa6'
import { GoClockFill } from 'react-icons/go'
import { NavLink } from 'react-router-dom'
import { formatPrice, getLastTwoNames } from '~/utils/helper'
import { Course } from '~/interfaces/course'

interface CourseItemInterface {
  data: Course
  isHide?: boolean
}

const cx = classNames.bind(styles)

const CourseItem = ({ data, isHide }: CourseItemInterface) => {
  return (
    <div className={cx('col')} key={data._id}>
      <div className={cx('wrapper')}>
        <NavLink className={cx('link')} to={`/course/${data._id}`}>
          <img src={data.thumbnail} alt="CourseItem" />
        </NavLink>
        <div className={cx('content')}>
          <h3 className={cx('title')}>
            <NavLink to={`/course/${data._id}`}>{data.title}</NavLink>
          </h3>
          {!isHide && (
            <div className={cx('price')}>
              <span className={cx('main-price')}>{`${formatPrice(Number(data.price))}`} đ</span>
            </div>
          )}
          <div className={cx('details')}>
            <div className={cx('moreInfo')}>
              <div className={cx('teacher')}>
                <img className={cx('images')} src={data?.instructor?.avatar_url} alt="logo" />
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
