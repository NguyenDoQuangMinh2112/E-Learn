import styles from './LessonItem.module.scss'
import classNames from 'classnames/bind'

import { FaCirclePlay } from 'react-icons/fa6'
import { FaCircleCheck } from 'react-icons/fa6'

const cx = classNames.bind(styles)
interface LessonItemProps {
  toggle: boolean
}
const LessonItem = ({ toggle }: LessonItemProps) => {
  return (
    <div className={cx('track', { active: toggle })}>
      <div className={cx('wrapper_track')}>
        <div className={cx('info')}>
          <h3 className={cx('info_title')}>1. Lời khuyên trước khóa học</h3>
          <p className={cx('info_desc')}>
            <FaCirclePlay />
            <span>04:20</span>
          </p>
        </div>
        <div className={cx('icon')}>
          <FaCircleCheck />
        </div>
      </div>
    </div>
  )
}

export default LessonItem
