import classNames from 'classnames/bind'
import styles from './Blog.module.scss'
import MetaData from '~/components/MetaData'
import { useSelector } from 'react-redux'
import React, { Suspense, useEffect } from 'react'
import { AppDispatch } from '~/redux/store'
import { useDispatch } from 'react-redux'
import { fetBlogs } from '~/redux/blog/blogAction'
import Paginations from '~/components/Pagination/Pagination'
import { blogSelector } from '~/redux/blog/blogSelector'
import { useSearchParams } from 'react-router-dom'

const LazyBlogItem = React.lazy(() => import('~/components/Layouts/BlogItem/BlogItem'))

const cx = classNames.bind(styles)

const Blog = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { blogs, pagination } = useSelector(blogSelector)
  const [params] = useSearchParams()
  const page = Number(params.get('page')) || 1
  const handlePageChange = (page: number) => {
    dispatch(fetBlogs({ limit: 10, page }))
  }

  useEffect(() => {
    dispatch(fetBlogs({ limit: 10, page }))
  }, [dispatch])

  return (
    <>
      <MetaData title="List blogs" />
      <div className={cx('containerTop')}>
        <h1 className={cx('heading')}>Featured posts</h1>
        <p className={cx('des')}>
          A collection of blogs sharing experiences on self-learning programming online and web development techniques.
        </p>
      </div>
      <div className={cx('containerBody')}>
        <div className={cx('row')}>
          <div className={cx('col col-9 col-xxl-8 col-lg-12')}>
            <div className={cx('left')}>
              <Suspense fallback="Loading...">
                <ul>
                  {blogs?.map((blog) => (
                    <LazyBlogItem data={blog} key={blog._id} />
                  ))}
                </ul>
              </Suspense>
            </div>

            <div className={cx('pagination')}>
              {pagination && (
                <Paginations
                  totalItems={Number(pagination.totalBlogs)}
                  itemsPerPage={pagination.pageSize}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
          <div className={cx('col col-3 col-xxl-8 col-lg-12')}>
            <div className={cx('d-md-none')}>
              <aside className={cx('wrapper')}>
                <h3>View posts by topic</h3>
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
