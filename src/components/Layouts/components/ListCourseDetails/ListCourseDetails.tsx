import { useEffect } from 'react'

import styles from './ListCourseDetails.module.scss'
import classNames from 'classnames/bind'

import Chapter from './Chapter'

import { useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { fetchChapters } from '~/redux/course/courseAction'
import { AppDispatch } from '~/redux/store'
import { useSelector } from 'react-redux'
import { courseSelector } from '~/redux/course/courseSelector'

const cx = classNames.bind(styles)

const ListCourseDetails = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { chapters } = useSelector(courseSelector)
  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchChapters(String(id)))
  }, [])

  return (
    <div className={cx('body')}>
      {chapters?.map((chapter) => (
        <Chapter data={chapter} key={chapter._id} />
      ))}
    </div>
  )
}

export default ListCourseDetails
