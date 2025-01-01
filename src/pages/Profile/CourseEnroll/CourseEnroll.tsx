import classNames from 'classnames/bind'
import styles from './CourseEnroll.module.scss'
import { UserEnrollCourse } from '~/interfaces/course'
import { checkLengthOfWords } from '~/utils/helper'
const cx = classNames.bind(styles)

interface CourseEnrollProps {
  data: UserEnrollCourse
}

const CourseEnroll: React.FC<CourseEnrollProps> = ({ data }) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('thumb')}>
        <img src={data?.courseId[0]?.thumbnail} alt="" />
      </div>

      <div className={cx('info')}>
        <h3 className={cx('info__title')}>{data?.courseId[0]?.title}</h3>
        <p className={cx('info__des')}>{checkLengthOfWords(String(data?.courseId[0]?.description), 100)}</p>
      </div>
    </div>
  )
}

export default CourseEnroll
