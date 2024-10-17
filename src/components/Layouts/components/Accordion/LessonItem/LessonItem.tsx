import classNames from 'classnames/bind'
import styles from './LessonItem.module.scss'

import { FaCirclePlay } from 'react-icons/fa6'
import { Lesson } from '~/interfaces/course'

const cx = classNames.bind(styles)

interface LessonItemProps {
  data: Lesson
}

const LessonItem = ({ data }: LessonItemProps) => {
  return (
    <>
      <div className={cx('lessonItem')}>
        <span>
          <FaCirclePlay />
          <div className={cx('lessonName')}>
            {data?.order}. {data?.title}
          </div>
        </span>
        <span>11:35</span>
      </div>
    </>
  )
}

export default LessonItem
