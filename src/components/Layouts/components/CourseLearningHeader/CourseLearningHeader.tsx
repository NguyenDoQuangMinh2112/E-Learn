import classNames from 'classnames/bind'
import styles from './CourseLearningHeader.module.scss'

import logo from '~/assets/images/logo-white.png'

import NoteLesson from '~/components/NoteLesson/NoteLesson'
import useOutsideClick from '~/hooks'
import Button from '~/components/Button'
import { NavLink } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { MdArrowBackIosNew } from 'react-icons/md'
import { MdOutlineStickyNote2 } from 'react-icons/md'
import { FaRegCircleQuestion } from 'react-icons/fa6'
import { noteLessonSelector } from '~/redux/noteLesson/noteLesson.selector'
import { hideNoteLesson, showNoteLesson } from '~/redux/noteLesson/noteLesson'

const cx = classNames.bind(styles)

const CourseLearningHeader = () => {
  const dispatch = useDispatch()
  const { isOpenNoteLesson } = useSelector(noteLessonSelector)

  const noteLessonRef = useOutsideClick(() => dispatch(hideNoteLesson()))

  return (
    <header className={cx('wrapper')}>
      {isOpenNoteLesson && <NoteLesson noteLessonRef={noteLessonRef} />}
      {/* Back btn */}
      <Button className={cx('back-btn')} to="/">
        <MdArrowBackIosNew size={20} color="#fff" />
      </Button>
      {/* End Back btn */}
      {/* left */}
      <div className={cx('header_left')}>
        <NavLink to="/">
          <img className={cx('logo')} src={logo} alt="Logo" />
        </NavLink>
      </div>
      {/* end left */}

      {/* right */}
      <div className={cx('header_right')}>
        <Button
          onClick={() => dispatch(showNoteLesson())}
          className={cx('note')}
          classNameTitle={cx('noteTitle')}
          leftIcon={<MdOutlineStickyNote2 size={15} color="#fff" />}
        >
          Ghi chú
        </Button>
        <Button
          className={cx('note')}
          classNameTitle={cx('noteTitle')}
          leftIcon={<FaRegCircleQuestion size={15} color="#fff" />}
        >
          Hướng dẫn
        </Button>
      </div>
      {/* end right */}
    </header>
  )
}

export default CourseLearningHeader
