import styles from './LessonItem.module.scss'
import classNames from 'classnames/bind'

import { FaCirclePlay } from 'react-icons/fa6'
import { FaCircleCheck } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { Lesson } from '~/interfaces/course'
import { setActiveLesson } from '~/redux/course/courseSlice'

const cx = classNames.bind(styles)
interface LessonItemProps {
  toggle: boolean
  lesson: Lesson
  isActive: boolean
}
const LessonItem = ({ toggle, lesson, isActive }: LessonItemProps) => {
  const dispatch = useDispatch()
  return (
    <div className={cx('track', { active: toggle })} onClick={() => dispatch(setActiveLesson(lesson))}>
      <div className={cx('wrapper_track', { 'active-bg': isActive })}>
        <div className={cx('info')}>
          <h3 className={cx('info_title')}>
            {lesson.order}. {lesson.title}
          </h3>
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
