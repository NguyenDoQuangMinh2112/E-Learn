import { useEffect, useRef, useState } from 'react'

import classNames from 'classnames/bind'
import styles from './CommentField.module.scss'

import Button from '~/components/Button'

import { useSelector } from 'react-redux'
import { authSelector } from '~/redux/auth/authSelectors'
import { useParams } from 'react-router-dom'
import { AppDispatch } from '~/redux/store'
import { useDispatch } from 'react-redux'
import { showPopup } from '~/redux/popup/popupSlice'

import { addCommentAPI } from '~/apis/comment/comment'
import { updateCommentByBlog } from '~/redux/blog/blogSlice'

const cx = classNames.bind(styles)

const CommentField = ({
  isReplyForm,
  setIsReplyVisible,
  parentId
}: {
  isReplyForm?: boolean
  setIsReplyVisible?: (v: boolean) => void
  parentId?: string
}) => {
  const { userInfo } = useSelector(authSelector)
  const dispatch = useDispatch<AppDispatch>()
  const [isHideComment, setIsHideComment] = useState<boolean>(false)
  const [comment, setComment] = useState({
    text: '',
    parent: null // dùng để lưu ID của comment cha nếu có
  })

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const { id } = useParams()

  useEffect(() => {
    if (isHideComment && textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }, [isHideComment])

  const handleCancelComment = () => {
    setIsHideComment(false)
    setComment({ text: '', parent: null })
    if (setIsReplyVisible) {
      setIsReplyVisible(false)
    }
  }

  const handleAddNewComment = async () => {
    try {
      if (!userInfo) {
        dispatch(showPopup('login'))
        return
      }

      if (!comment.text) {
        // Thông báo lỗi nếu comment rỗng
        return alert('Comment cannot be empty.')
      }
      const payload = {
        blog_id: id,
        blog_author: userInfo._id,
        comment: comment.text,
        parent: parentId || null // Gán ID của comment cha
      }

      const res = await addCommentAPI(payload)
      if (res.statusCode === 201) {
        setComment({ text: '', parent: null })
        dispatch(updateCommentByBlog({ avatar_default: userInfo.avatar_url, ...res.data }))
        setIsHideComment(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={cx('wrapper', { repply: isReplyForm })}>
      <div className={cx('user')}>
        <img src={userInfo?.avatar_url} alt="avatar" className={cx('avatar')} />
      </div>
      <div className={cx('comment')}>
        {isHideComment || isReplyForm ? (
          <>
            <textarea
              id={cx('text-comment')}
              rows={4}
              ref={textAreaRef}
              placeholder="Leave a comment..."
              value={comment.text}
              onChange={(e) => setComment({ ...comment, text: e.target.value })}
            />
            <div className={cx('actions')}>
              <div
                onClick={(event) => {
                  event.stopPropagation()
                  setIsHideComment(false)
                }}
              >
                <Button className={cx('cancle')} onClick={handleCancelComment}>
                  HỦY BỎ{' '}
                </Button>
              </div>
              <Button className={cx('addNote_btn')} onClick={handleAddNewComment}>
                CẬP NHẬT
              </Button>
            </div>
          </>
        ) : (
          <div className={cx('commentPlaceholder')} onClick={() => setIsHideComment(true)}>
            Write your comment here
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentField
