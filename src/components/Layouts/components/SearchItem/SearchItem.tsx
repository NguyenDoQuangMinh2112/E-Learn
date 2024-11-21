import classNames from 'classnames/bind'
import styles from './SearchItem.module.scss'
import { NavLink } from 'react-router-dom'
import { memo } from 'react'
const cx = classNames.bind(styles)

interface SearchItemInterface {
  title?: string
  thumnails?: string
  courseId?: string
  blogId?: string
  setSearchValue: (value: string) => void
}

const SearchItem = ({ title, thumnails, courseId, blogId, setSearchValue }: SearchItemInterface) => {
  return (
    <NavLink
      to={courseId ? `/course/${courseId}` : `/blog/${blogId}`}
      className={cx('wrapper')}
      onClick={() => setSearchValue('')}
    >
      <div className={cx('fallbackAvatar')}>
        <img className={cx('course_avatar')} src={thumnails} alt="thumbnail" loading="lazy" />
      </div>
      <span>{title}</span>
    </NavLink>
  )
}

export default memo(SearchItem)
