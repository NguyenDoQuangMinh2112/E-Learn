import classNames from 'classnames/bind'
import styles from './ActionButton.module.scss'

import { FaRegBookmark } from 'react-icons/fa'
import { FaEllipsis } from 'react-icons/fa6'
import Tippy from '@tippyjs/react/headless'

import { FaFacebookSquare } from 'react-icons/fa'
import { FaLink } from 'react-icons/fa6'
import { Placement } from '@popperjs/core'
import { memo } from 'react'
import { FaEdit } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { authSelector } from '~/redux/auth/authSelectors'
import { blogSelector } from '~/redux/blog/blogSelector'
import { NavLink } from 'react-router-dom'

const cx = classNames.bind(styles)
interface ActionButtonProps {
  place?: Placement
  blogId?: string
}
const ActionButton = ({ place = 'top', blogId }: ActionButtonProps) => {
  const { userInfo } = useSelector(authSelector)
  const { blogs } = useSelector(blogSelector)
  const blog = blogs?.find((b) => b._id === blogId)
  const isAuthor = blog?.author._id === userInfo?._id
  return (
    <div className={cx('actions')}>
      <div className={cx('toggle')}>
        <FaRegBookmark />
      </div>

      <Tippy
        placement={place}
        interactive
        delay={[0, 300]}
        offset={[12, 8]}
        trigger="click"
        render={(attrs) => (
          <ul className={cx('wrapper', 'options')} tabIndex={-1} {...attrs}>
            <li>
              <FaFacebookSquare />
              <span>Chia sẻ lên Facebook</span>
            </li>
            {isAuthor && (
              <li>
                <NavLink to={`/post/${blogId}/edit`}>
                  <FaEdit />
                  <span>Edit blog</span>
                </NavLink>
              </li>
            )}
            <li>
              <FaLink />
              <span>Sao chép liên kết</span>
            </li>
          </ul>
        )}
      >
        <div className={cx('options')}>
          <FaEllipsis />
        </div>
      </Tippy>
    </div>
  )
}

export default memo(ActionButton)
