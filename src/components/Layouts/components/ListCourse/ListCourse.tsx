import classNames from 'classnames/bind'
import styles from './ListCourse.module.scss'
import { mockDataBlog, mockDataCourse } from '~/data/mockData'
import CourseItem from './CourseItem'

const cx = classNames.bind(styles)

const ListCourse = () => {
  return (
    <div className={cx('wrapper')}>
      {/* Heading */}
      <div className={cx('heading-wrap')}>
        <h2>Danh sách khóa học</h2>
      </div>
      {/*End Heading */}

      {/* Body */}
      <div className={cx('body')}>
        <div
          className={cx(
            'row row-cols-6 row-cols-xxxxxl-5 row-cols-xxxxl-4 row-cols-xl-3 row-cols-lg-2 gy-6 gx-xxl-2 gx-xl-3 gx-lg-2'
          )}
        >
          {mockDataCourse?.map((course) => (
            <CourseItem data={course} key={course.id} />
          ))}
        </div>
      </div>
      {/* Blogs render */}
      <div className={cx('heading-wrap')}>
        <h2>Danh sách bài viết nổi bật</h2>
      </div>
      <div
        className={cx(
          'row row-cols-6 row-cols-xxxxxl-5 row-cols-xxxxl-4 row-cols-xl-3 row-cols-lg-2 gy-6 gx-xxl-2 gx-xl-3 gx-lg-2'
        )}
      >
        {mockDataBlog?.map((blog) => (
          <CourseItem data={blog} isHide={true} key={blog.id} />
        ))}
      </div>
      {/* End Body */}
    </div>
  )
}

export default ListCourse
