import classNames from 'classnames/bind'
import styles from './BlogItem.module.scss'

import { NavLink } from 'react-router-dom'
import ActionButton from '~/components/ActionButton/ActionButton'
import { Blog } from '~/interfaces/blog'
import { checkLengthOfWords, getLastTwoNames } from '~/utils/helper'
import { FaCheckCircle } from 'react-icons/fa'
import adminSignature from '~/assets/images/admin.svg'
import { memo } from 'react'

const cx = classNames.bind(styles)

interface blogProps {
  data: Blog
}

const BlogItem = ({ data }: blogProps) => {
  return (
    <li className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('author')}>
          <div
            className={cx('userMenu_avatar')}
            style={{
              background: `${data.author?.role === 'admin' && 'linear-gradient(180deg, #ffd900, #b45264 93.68%)'}`
            }}
          >
            <img className={cx('avatar')} src={data.author.avatar_url} alt="avatar" />
            {data.author?.role === 'admin' && <img src={adminSignature} alt="" className={cx('adminSignature')} />}
          </div>
          <span>{getLastTwoNames(data?.author.fullName)}</span>
          {data.author?.role === 'admin' && <FaCheckCircle className={cx('icon')} />}
        </div>
        <ActionButton />
      </div>
      <div className={cx('body')}>
        <div className={cx('info')}>
          <NavLink to={`/blog/${data._id}`}>
            <h2 className={cx('title')}>{data?.title}</h2>
          </NavLink>
          <p className={cx('des')}>{checkLengthOfWords(data?.content[0], 255)}</p>
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
            <img src={data.banner} alt="thumb" />
          </a>
        </div>
      </div>
    </li>
  )
}

export default memo(BlogItem)
