import classNames from 'classnames/bind'
import styles from './CourseItem.module.scss'

import { FaCirclePlay } from 'react-icons/fa6'
import { GoClockFill } from 'react-icons/go'
import { NavLink } from 'react-router-dom'
import { formatPrice } from '~/utils/helper'

interface CourseItemInterface<T> {
  data: T
  isHide?: boolean
}

const cx = classNames.bind(styles)

const CourseItem = <
  T extends {
    id: number
    thumbnail: string
    title: string
    avatarAuthor: string
    nameAuthor: string
    oldPrice?: number
    newPrice?: number
    totalVideo?: number
    totalHoure?: string
    description?: string
  }
>({
  data,
  isHide = false
}: CourseItemInterface<T>) => {
  return (
    <div className={cx('col')} key={data.id}>
      <div className={cx('wrapper')}>
        <NavLink className={cx('link')} to={'/course/title'}>
          <img src={data.thumbnail} alt="CourseItem" />
        </NavLink>
        <div className={cx('content')}>
          <h3 className={cx('title')}>
            <NavLink to={'/course/title'}>{data.title}</NavLink>
          </h3>
          {!isHide && (
            <div className={cx('price')}>
              <span className={cx('main-price')}>{`${formatPrice(Number(data.newPrice))}`} đ</span>
            </div>
          )}
          <div className={cx('details')}>
            <div className={cx('moreInfo')}>
              <div className={cx('teacher')}>
                <img
                  className={cx('images')}
                  src="https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/334494904_909968490428262_1880365116923209069_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeErH2P7xEeo-vkOF98bYC1I-2A4wtwBWXv7YDjC3AFZe6D-FvUkuCF_XJ3a7smeJ6xuy9uvzpa-wEnnm0OUwpJl&_nc_ohc=hENnBr3Q8lQQ7kNvgHe0AsC&_nc_ht=scontent.fdad3-6.fna&oh=00_AYCUYtdKfQLy9JaRZkHZ1ivoKuQOaF28DlVZC9HhUVQHCA&oe=66AEF0BA"
                  alt=""
                />
              </div>
              <span className={cx('name')}>{data.nameAuthor}</span>
            </div>

            {!isHide && (
              <div className={cx('moreInfo')}>
                <FaCirclePlay />
                <span className={cx('students')}>{data.totalVideo}</span>
              </div>
            )}

            {!isHide && (
              <div className={cx('moreInfo')}>
                <GoClockFill />
                <span className={cx('duration')}>{data.totalHoure}</span>
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
