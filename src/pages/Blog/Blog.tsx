import classNames from 'classnames/bind'
import styles from './Blog.module.scss'
import BlogItem from '~/components/Layouts/BlogItem/BlogItem'
import MetaData from '~/components/MetaData'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AppDispatch, RootState } from '~/redux/store'
import { useDispatch } from 'react-redux'
import { fetBlogs } from '~/redux/blog/blogAction'

const cx = classNames.bind(styles)

const Blog = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { blogs } = useSelector((state: RootState) => state.blog)

  useEffect(() => {
    // call api get all blogs here

    dispatch(fetBlogs())
  }, [])
  return (
    <>
      <MetaData title="Danh sách bài viết" />
      <div className={cx('containerTop')}>
        <h1 className={cx('heading')}>Bài viết nổi bật</h1>
        <p className={cx('des')}>
          Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.
        </p>
      </div>
      <div className={cx('containerBody')}>
        <div className={cx('row')}>
          <div className={cx('col col-9 col-xxl-8 col-lg-12')}>
            <div className={cx('left')}>
              <ul>
                {blogs?.map((blog) => (
                  <BlogItem data={blog} key={blog._id} />
                ))}
              </ul>
            </div>
          </div>
          <div className={cx('col col-3 col-xxl-8 col-lg-12')}>
            <div className={cx('d-md-none')}>
              <aside className={cx('wrapper')}>
                <h3>Xem các bài viết theo chủ đề</h3>
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

export default Blog
