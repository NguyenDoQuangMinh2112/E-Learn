import classNames from 'classnames/bind'
import styles from './SearchItem.module.scss'
import { NavLink } from 'react-router-dom'
const cx = classNames.bind(styles)

interface SearchItemInterface {
  title?: string
  thumnails?: string
  courseId?: string
  blogId?: string
}

const SearchItem = ({ title, thumnails, courseId, blogId }: SearchItemInterface) => {
  return (
    <NavLink to={courseId ? `/course/${courseId}` : `/blog/${blogId}`} className={cx('wrapper')}>
      <div className={cx('fallbackAvatar')}>
        <img className={cx('course_avatar')} src={thumnails} alt="thumbnail" />
      </div>
      <span>{title}</span>
    </NavLink>
  )
}

export default SearchItem
