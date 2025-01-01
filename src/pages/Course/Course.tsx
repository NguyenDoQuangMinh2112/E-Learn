import MetaData from '~/components/MetaData'
import classNames from 'classnames/bind'
import styles from './Course.module.scss'
import { Suspense, useEffect } from 'react'
import Paginations from '~/components/Pagination/Pagination'
import { useSelector } from 'react-redux'
import CourseItem from './CourseItem/CourseItem'
import { courseSelector } from '~/redux/course/courseSelector'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/redux/store'
import { fetchCourses } from '~/redux/course/courseAction'
import { useSearchParams } from 'react-router-dom'
const cx = classNames.bind(styles)

const Course = () => {
  const { listCourse, pagination } = useSelector(courseSelector)
  const dispatch = useDispatch<AppDispatch>()

  const [params] = useSearchParams()
  const page = Number(params.get('page')) || 1
  const handlePageChange = (page: number) => {
    dispatch(fetchCourses({ limit: 5, page }))
  }

  useEffect(() => {
    dispatch(fetchCourses({ limit: 5, page }))
  }, [])
  return (
    <>
      <MetaData title="List courses" />

      <div className={cx('containerTop')}>
        <h1 className={cx('heading')}>List courses</h1>
      </div>
      <div className={cx('containerBody')}>
        <div className={cx('row')}>
          <div className={cx('col col-9 col-xxl-8 col-lg-12')}>
            <div className={cx('left')}>
              <Suspense fallback="Loading...">
                <ul>
                  {listCourse?.map((course) => (
                    <CourseItem data={course} key={course._id} />
                  ))}
                </ul>
              </Suspense>
            </div>

            <div className={cx('pagination')}>
              {pagination && (
                <Paginations
                  totalItems={Number(pagination.totalCourses)}
                  itemsPerPage={pagination.pageSize}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
          <div className={cx('col col-3 col-xxl-8 col-lg-12')}>
            <div className={cx('d-md-none')}>
              <aside className={cx('wrapper')}>
                <h3>View courses by topic</h3>
                <ul className={cx('topic')}>
                  <li>
                    <a href="">Front-end / Mobile apps</a>
                  </li>

                  <li>
                    <a href="">Backend / Devops</a>
                  </li>
                  <li>
                    <a href="">UI / UX / Design</a>
                  </li>
                  <li>
                    <a href="">Others</a>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Course
