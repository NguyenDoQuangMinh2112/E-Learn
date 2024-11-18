import styles from './LessonItem.module.scss'
import classNames from 'classnames/bind'
import { useEffect } from 'react'
import { FaCirclePlay } from 'react-icons/fa6'
import { FaCircleCheck } from 'react-icons/fa6'
import { MdQuiz } from 'react-icons/md'

import { useDispatch } from 'react-redux'
import { Exercises } from '~/interfaces/course'
import { Lesson } from '~/interfaces/noteLesson'
import { setActiveLesson } from '~/redux/course/courseSlice'
import { showPopup } from '~/redux/popup/popupSlice'

const cx = classNames.bind(styles)
type LessonOrExercise = Lesson | Exercises
// Đổi `data` thành một generic
interface LessonItemProps<T extends LessonOrExercise> {
  toggle: boolean
  isActive: boolean
  title?: string
  order?: number
  data?: T
}

const LessonItem = <T extends LessonOrExercise>({ toggle, title, order, data, isActive }: LessonItemProps<T>) => {
  const dispatch = useDispatch()

  const handleNavigate = () => {
    if (data.questions) {
      dispatch(showPopup('exercise'))
    } else {
      dispatch(setActiveLesson(data))
    }
  }

  return (
    <div className={cx('track', { active: toggle })} onClick={handleNavigate}>
      <div className={cx('wrapper_track', { 'active-bg': isActive })}>
        <div className={cx('info')}>
          <h3 className={cx('info_title')}>
            {order}. {title}
          </h3>
          <p className={cx('info_desc')}>
            {'questions' in (data || {}) ? (
              <MdQuiz />
            ) : (
              <>
                <FaCirclePlay />
                <span>04:20</span>
              </>
            )}
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
