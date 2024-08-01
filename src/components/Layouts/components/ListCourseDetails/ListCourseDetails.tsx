import styles from './ListCourseDetails.module.scss'
import classNames from 'classnames/bind'
import IntroduceLesson from './IntroduceLesson/IntroduceLesson'
const cx = classNames.bind(styles)

const ListCourseDetails = () => {
  return (
    <div className={cx('body')}>
      <IntroduceLesson />
      <IntroduceLesson />
      <IntroduceLesson />
      <IntroduceLesson />
      <IntroduceLesson />
    </div>
  )
}

export default ListCourseDetails
