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

  // Combine and sort lessons and exercises
  const sortedItems = [
    ...(data?.lessons?.map((lesson) => ({ ...lesson, type: 'lesson' as const })) || []),
    ...(data?.exercises?.map((exercise) => ({ ...exercise, type: 'exercises' as const })) || [])
  ].sort((a, b) => Number(a.order) - Number(b.order))

  return (
    <>
      <div className={cx('wrapper')} onClick={() => setToggle(!toggle)}>
        <h3 className={cx('title')}>
          {data?.order}. {data?.title}
        </h3>
        <span className={cx('desc')}>3/3 | 07:28</span>
        <span className={cx('icon')}>{toggle ? <FaChevronUp /> : <FaChevronDown />}</span>
      </div>

      {/* Render sorted items */}
      {sortedItems.map((item) => (
        <LessonItem
          toggle={toggle}
          title={item.title}
          order={item.order}
          id={item._id}
          type={item.type}
          key={item._id}
        />
      ))}
    </>
  )
}

export default Chapter
