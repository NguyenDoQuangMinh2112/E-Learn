import classNames from 'classnames/bind'
import styles from './BlogItem.module.scss'

import { NavLink } from 'react-router-dom'
import ActionButton from '~/components/ActionButton/ActionButton'
import { Blog } from '~/interfaces/blog'

const cx = classNames.bind(styles)

interface blogProps {
  data: Blog
}

const BlogItem = ({ data }: blogProps) => {
  return (
    <li className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('author')}>
          <a href="">
            <img className={cx('avatar')} src="" alt="" />
          </a>
          <span>Quang Minh</span>
        </div>
        <ActionButton />
      </div>
      <div className={cx('body')}>
        <div className={cx('info')}>
          <NavLink to="/blog/123">
            <h2 className={cx('title')}>{data?.title}</h2>
          </NavLink>
          <p className={cx('des')}>{data?.des}</p>
          <div className={cx('metaInfo')}>
            {data?.tags?.map((tag, i) => (
              <a key={i} href="" className={cx('tag')}>
                {tag}
              </a>
            ))}
            <span>6 ngày trước</span>
            <span className={cx('dot')}>.</span>6 ngày trước
          </div>
        </div>
        <div className={cx('thumb')}>
          <a href="">
            <img src="https://files.fullstack.edu.vn/f8-prod/blog_posts/10658/665db085cc3fb.png" alt="thumb" />
          </a>
        </div>
      </div>
    </li>
  )
}

export default BlogItem
