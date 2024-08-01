import { useState } from 'react'

import classNames from 'classnames/bind'
import styles from './Accordion.module.scss'

import LessonItem from './LessonItem'

import { GoPlus } from 'react-icons/go'
import { HiMinusSmall } from 'react-icons/hi2'

const cx = classNames.bind(styles)

const Accordion = () => {
  const [toggle, setToggle] = useState<boolean>(false)
  return (
    <div className={cx('container')}>
      <div className={cx('wrapper')} onClick={() => setToggle(!toggle)}>
        <h5 className={cx('title')}>
          <div className={cx('headline')}>
            {toggle ? <HiMinusSmall /> : <GoPlus />}
            <strong>1. Technical concepts you need to know</strong>
            <span className={cx('timeOfSection')}>3 lessons</span>
          </div>
        </h5>
      </div>
      {/* content */}
      <div className={cx('content', { active: toggle })}>
        <LessonItem />
        <LessonItem />
      </div>
    </div>
  )
}

export default Accordion
