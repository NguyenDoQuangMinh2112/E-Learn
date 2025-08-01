import { useEffect } from 'react'
import styles from './ListCourseDetails.module.scss'
import classNames from 'classnames/bind'

import Chapter from './Chapter'

import { useDispatch } from 'react-redux'
import { fetchChapters } from '~/redux/course/courseAction'
import { AppDispatch } from '~/redux/store'
import { useSelector } from 'react-redux'
import { courseSelector } from '~/redux/course/courseSelector'

const cx = classNames.bind(styles)

// Define prop types
interface ListCourseDetailsProps {
  courseId?: string
}

const ListCourseDetails = ({ courseId }: ListCourseDetailsProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { chapters } = useSelector(courseSelector)

  useEffect(() => {
    dispatch(fetchChapters(String(courseId)))
  }, [courseId])

  return (
    <div className={cx('body')}>
      {chapters?.map((chapter) => (
        <Chapter data={chapter} key={chapter._id} />
      ))}
    </div>
  )
}

export default ListCourseDetails
