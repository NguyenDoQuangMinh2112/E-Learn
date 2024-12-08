import classNames from 'classnames/bind'
import styles from './ActionButton.module.scss'

import { FaRegBookmark } from 'react-icons/fa'
import { FaEllipsis } from 'react-icons/fa6'
import { MdDeleteOutline } from 'react-icons/md'

import Tippy from '@tippyjs/react/headless'

import { FaFacebookSquare } from 'react-icons/fa'
import { FaLink } from 'react-icons/fa6'
import { Placement } from '@popperjs/core'
import { memo, useCallback } from 'react'
import { FaEdit } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { authSelector } from '~/redux/auth/authSelectors'
import { blogSelector } from '~/redux/blog/blogSelector'
import { NavLink } from 'react-router-dom'
import { deleteBlog } from '~/redux/blog/blogSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)
interface ActionButtonProps {
  place?: Placement
  blogId?: string
}
const ActionButton = ({ place = 'top', blogId }: ActionButtonProps) => {
  const { userInfo } = useSelector(authSelector)
  const { blogs } = useSelector(blogSelector)
  const dispatch = useDispatch()
  const blog = blogs?.find((b) => b._id === blogId)
  const isAuthor = blog?.author._id === userInfo?._id

  const handleDeleteBlog = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this blog?')

    if (isConfirmed) {
      dispatch(deleteBlog(blogId))
      toast.success('Blog deleted successfully')
    }
  }

  const handleCopyLink = useCallback(() => {
    const link = window.location.href

    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success('Link copied to clipboard!')
      })
      .catch((err) => {
        toast.error('Failed to copy the link')
        console.error('Error copying link: ', err)
      })
  }, [])

  const handleShareFacebook = useCallback(() => {
    const url = encodeURIComponent(window.location.href)
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    window.open(facebookShareUrl, '_blank', 'width=600,height=400')
  }, [])

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
            <li onClick={handleShareFacebook}>
              <FaFacebookSquare size={17} />
              <span>Chia sẻ lên Facebook</span>
            </li>
            {isAuthor && (
              <li>
                <NavLink to={`/post/${blogId}/edit`}>
                  <FaEdit size={17} />
                  <span>Edit blog</span>
                </NavLink>
              </li>
            )}
            {isAuthor && (
              <li onClick={handleDeleteBlog}>
                <MdDeleteOutline size={17} />
                <span>Delete blog</span>
              </li>
            )}
            <li onClick={handleCopyLink}>
              <FaLink size={17} />
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
