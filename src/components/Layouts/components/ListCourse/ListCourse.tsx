import classNames from 'classnames/bind'
import styles from './ListCourse.module.scss'
import CourseItem from './CourseItem'
import React, { Suspense, useEffect } from 'react'
import { Course } from '~/interfaces/course'
// import CardItem from './CardItem/CardItem'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '~/redux/store'
import { fetBlogs } from '~/redux/blog/blogAction'
import { useSelector } from 'react-redux'
import { fetchCourses } from '~/redux/course/courseAction'
import { courseSelector } from '~/redux/course/courseSelector'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

const LazyCardItem = React.lazy(() => import('./CardItem/CardItem'))

const ListCourse = () => {
  const { blogs } = useSelector((state: RootState) => state.blog)
  const { listCourse } = useSelector(courseSelector)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetBlogs({}))
    dispatch(fetchCourses({}))
  }, [])

  return (
    <div className={cx('wrapper')}>
      {/* Heading */}
      <div className={cx('heading-wrap')}>
        <h2>Courses</h2>

        <Button className={cx('seeAll')} classNameTitle={cx('title')} to={'/course?page=1'}>
          All courses
        </Button>
      </div>
      {/*End Heading */}

      {/* Body */}
      <div className={cx('body')}>
        <div
          className={cx(
            'row row-cols-6 row-cols-xxxxxl-5 row-cols-xxxxl-4 row-cols-xl-3 row-cols-lg-2 gy-6 gx-xxl-2 gx-xl-3 gx-lg-2'
          )}
        >
          {listCourse?.slice(0, 4)?.map((course: Course) => (
            <CourseItem data={course} key={course._id} />
          ))}
        </div>
      </div>
      {/* Blogs render */}
      <div className={cx('heading-wrap')}>
        <h2>Featured blogs</h2>
      </div>
      <Suspense fallback="Loading blog...">
        <div
          className={cx(
            'row row-cols-6 row-cols-xxxxxl-5 row-cols-xxxxl-4 row-cols-xl-3 row-cols-lg-2 gy-6 gx-xxl-2 gx-xl-3 gx-lg-2'
          )}
        >
          {blogs?.slice(0, 4)?.map((blog) => (
            <LazyCardItem data={blog} isHide={true} key={blog._id} />
          ))}
        </div>
      </Suspense>
      {/* End Body */}
    </div>
  )
}

export default ListCourse
