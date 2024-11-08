import { useState } from 'react'
import styles from './IntroduceLesson.module.scss'
import classNames from 'classnames/bind'
import LessonItem from '../LessonItem/LessonItem'

import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import { Chapter, Lesson } from '~/interfaces/course'
const cx = classNames.bind(styles)
interface IntroduceLessonProps {
  chapter: Chapter
  activeLesson: Lesson | null
}
const IntroduceLesson = ({ chapter, activeLesson }: IntroduceLessonProps) => {
  const [toggle, setToggle] = useState<boolean>(false)
  return (
    <>
      <div className={cx('wrapper')} onClick={() => setToggle(!toggle)}>
        <h3 className={cx('title')}>
          {chapter.order}. {chapter.title}
        </h3>
        <span className={cx('desc')}>3/3 | 07:28</span>
        <span className={cx('icon')}>{toggle ? <FaChevronUp /> : <FaChevronDown />}</span>
      </div>
      {chapter?.lessons?.map((l) => (
        <LessonItem toggle={toggle} lesson={l} isActive={activeLesson?._id === l._id} key={l._id}/>
      ))}
    </>
  )
}

export default IntroduceLesson
