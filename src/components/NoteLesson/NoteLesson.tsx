import classNames from 'classnames/bind'
import styles from './NoteLesson.module.scss'

import Button from '../Button'

import { useDispatch } from 'react-redux'
import { hideNoteLesson } from '~/redux/noteLesson/noteLesson'

const cx = classNames.bind(styles)

const NoteLesson = ({ noteLessonRef }: any) => {
  const dispatch = useDispatch()
  return (
    <div className={cx('wrapper')}>
      <div className={cx('overlay')}></div>
      <div className={cx('container')} ref={noteLessonRef}>
        <div className={cx('close')}>
          <Button className={cx('close-btn')} onClick={() => dispatch(hideNoteLesson())}>
            {' '}
            X{' '}
          </Button>
        </div>
        <div className={cx('body')}>
          <h2>Ghi chú của tôi</h2>
        </div>
      </div>
    </div>
  )
}

export default NoteLesson
