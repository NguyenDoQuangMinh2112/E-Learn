import { useState } from 'react'
import styles from './Chapter.module.scss'
import classNames from 'classnames/bind'
import LessonItem from '../LessonItem/LessonItem'

import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import { Chapter as ChapterInterface } from '~/interfaces/course'

const cx = classNames.bind(styles)

interface ChapterProps {
  data: ChapterInterface
}

const Chapter = ({ data }: ChapterProps) => {
  const [toggle, setToggle] = useState<boolean>(false)
  return (
    <>
      <div className={cx('wrapper')} onClick={() => setToggle(!toggle)}>
        <h3 className={cx('title')}>
          {data?.order}. {data?.title}
        </h3>
        <span className={cx('desc')}>3/3 | 07:28</span>
        <span className={cx('icon')}>{toggle ? <FaChevronUp /> : <FaChevronDown />}</span>
      </div>
      {/* Render lesson */}
      {data?.lessons?.map((lesson) => (
        <LessonItem
          toggle={toggle}
          title={lesson.title}
          order={lesson.order}
          id={lesson._id}
          type="lesson"
          key={lesson._id}
        />
      ))}
      {/* end */}

      {/* Render exercise */}
      {data?.exercises?.map((exercise) => (
        <LessonItem toggle={toggle} title={exercise.title} id={exercise._id} type="exercises" key={exercise._id} />
      ))}
      {/* End */}
    </>
  )
}

export default Chapter
