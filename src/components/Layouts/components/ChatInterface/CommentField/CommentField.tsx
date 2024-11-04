import classNames from 'classnames/bind'
import styles from './CommentField.module.scss'
import Button from '~/components/Button'
import { useSelector } from 'react-redux'
import { authSelector } from '~/redux/auth/authSelectors'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/redux/store'
import { showPopup } from '~/redux/popup/popupSlice'
import { addCommentAPI } from '~/apis/comment/comment'

const cx = classNames.bind(styles)

const CommentField = ({
  isReplyForm,
  setIsReplyVisible
}: {
  isReplyForm?: boolean
  setIsReplyVisible?: (v: boolean) => void
}) => {
  const { userInfo } = useSelector(authSelector)
  const dispatch = useDispatch<AppDispatch>()
  const [isHideComment, setIsHideComment] = useState<boolean>(false)
  const [comment, setComment] = useState<string>()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const { id } = useParams()

  useEffect(() => {
    if (isHideComment && textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }, [isHideComment])

  const handleCancelComment = () => {
    setIsHideComment(false)
    setComment('')
    if (setIsReplyVisible) {
      setIsReplyVisible(false)
    }
  }

  const handleAddNewComment = async () => {
    try {
      if (!userInfo) {
        dispatch(showPopup('login'))
      }
      const payload = {
        blog_id: id,
        blog_author: userInfo?._id,
        comment
      }

      const res = await addCommentAPI(payload)
      if (res.statusCode === 201) {
        setComment(textAreaRef.current?.value)
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              // defaultValue={comment} // Nếu muốn hiển thị comment hiện tại
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
