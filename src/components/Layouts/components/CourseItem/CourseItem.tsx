import classNames from 'classnames/bind'
import styles from './CourseItem.module.scss'
const cx = classNames.bind(styles)

const CourseItem = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('fallbackAvatar')}>
        <img
          className={cx('course_avatar')}
          src="https://files.fullstack.edu.vn/f8-prod/courses/1.png"
          alt="javascript"
        />
      </div>
      <span>Lập trình javascript cơ bản</span>
    </div>
  )
}

export default CourseItem