import { useState } from 'react'
import styles from './IntroduceLesson.module.scss'
import classNames from 'classnames/bind'
import LessonItem from '../LessonItem/LessonItem'

import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
const cx = classNames.bind(styles)

const IntroduceLesson = () => {
  const [toggle, setToggle] = useState<boolean>(false)
  return (
    <>
      <div className={cx('wrapper')} onClick={() => setToggle(!toggle)}>
        <h3 className={cx('title')}>1. Giới thiệu</h3>
        <span className={cx('desc')}>3/3 | 07:28</span>
        <span className={cx('icon')}>{toggle ? <FaChevronUp /> : <FaChevronDown />}</span>
      </div>
      <LessonItem toggle={toggle} />
      <LessonItem toggle={toggle} />
      <LessonItem toggle={toggle} />
      <LessonItem toggle={toggle} />
      <LessonItem toggle={toggle} />
      <LessonItem toggle={toggle} />
      <LessonItem toggle={toggle} />
      <LessonItem toggle={toggle} />
      <LessonItem toggle={toggle} />
    </>
  )
}

export default IntroduceLesson
