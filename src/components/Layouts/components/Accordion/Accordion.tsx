import { memo, useState } from 'react'

import classNames from 'classnames/bind'
import styles from './Accordion.module.scss'

import LessonItem from './LessonItem'

import { GoPlus } from 'react-icons/go'
import { HiMinusSmall } from 'react-icons/hi2'
import { Chapter } from '~/interfaces/course'

const cx = classNames.bind(styles)

interface AccordionProps {
  data: Chapter
}

const Accordion = ({ data }: AccordionProps) => {
  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <div className={cx('container')}>
      <div className={cx('wrapper')} onClick={() => setToggle(!toggle)}>
        <h5 className={cx('title')}>
          <div className={cx('headline')}>
            {toggle ? <HiMinusSmall /> : <GoPlus />}
            <strong>{data?.title}</strong>
            <span className={cx('timeOfSection')}>{data?.lessons?.length} lessons</span>
          </div>
        </h5>
      </div>
      {/* content */}
      <div className={cx('content', { active: toggle })}>
        {data?.lessons?.map((lesson, index) => (
          <LessonItem data={lesson} key={index} />
        ))}
      </div>
    </div>
  )
}

export default memo(Accordion)
