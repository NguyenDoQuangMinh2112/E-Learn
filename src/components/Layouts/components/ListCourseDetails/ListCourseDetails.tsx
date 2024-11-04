import styles from './ListCourseDetails.module.scss'
import classNames from 'classnames/bind'
import IntroduceLesson from './IntroduceLesson/IntroduceLesson'
import { CourseInfo, Lesson } from '~/interfaces/course'
const cx = classNames.bind(styles)

interface ListCourseDetailsProps {
  datas?: CourseInfo | null
  activeLesson: Lesson | null
}

const ListCourseDetails = ({ datas, activeLesson }: ListCourseDetailsProps) => {
  return (
    <div className={cx('body')}>
      {datas?.chapters?.map((c) => (
        <IntroduceLesson chapter={c} activeLesson={activeLesson} />
      ))}
    </div>
  )
}

export default ListCourseDetails
