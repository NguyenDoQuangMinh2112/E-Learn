import classNames from 'classnames/bind'
import styles from './CardItem.module.scss'
import { NavLink } from 'react-router-dom'
import { FaCirclePlay } from 'react-icons/fa6'
import { GoClockFill } from 'react-icons/go'
import { Blog } from '~/interfaces/blog'
import { getLastTwoNames } from '~/utils/helper'

const cx = classNames.bind(styles)

interface ContentItemProps {
  data: Blog
  isHide?: boolean
}

const CardItem = ({ data, isHide }: ContentItemProps) => {
  const isCourse = 'price' in data
  return (
    <div className={cx('col')}>
      <div className={cx('wrapper')}>
        <NavLink to={`/blog/${data?._id}`} className={cx('link')}>
          <img src={data.banner} alt="blogItem" loading="lazy" />
        </NavLink>
        <div className={cx('content')}>
          <h3 className={cx('title')}>
            <NavLink to={`/blog/${data?._id}`}>{data?.title}</NavLink>
          </h3>
          {isCourse && !isHide && (
            <div className={cx('price')}>
              <span className={cx('main-price')}>100000 đ</span>
            </div>
          )}
          <div className={cx('details')}>
            <div className={cx('moreInfo')}>
              <div className={cx('teacher')}>
                <img className={cx('images')} src={data?.author.avatar_url} alt="logo" loading="lazy" />
              </div>
              <span className={cx('name')}>{getLastTwoNames(data?.author.fullName)}</span>
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
                <span className={cx('duration')}>{data.views} người đã xem</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardItem
