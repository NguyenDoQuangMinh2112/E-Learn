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
    parent: null
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
    setIsReplyVisible && setIsReplyVisible(false)
  }

  const handleAddNewComment = async () => {
    try {
      if (!userInfo) {
        dispatch(showPopup('login'))
        return
      }

      if (!comment.text) {
        return alert('Comment cannot be empty.')
      }
      const payload = {
        blog_id: id,
        blog_author: userInfo._id,
        comment: comment.text,
        parent: parentId || null
      }

      // const obj = {
      //   blog_author: userInfo._id,
      //   blog_id: id,
      //   children: [],
      //   comment: comment.text,
      //   commented_by: 'dsadasdas',
      //   createdAt: '2024-11-05T14:46:30.870Z',
      //   isReply: false,
      //   parent: parentId,
      //   replies: [],
      //   updatedAt: null,
      //   _destroy: false,
      //   _id: '672a2fc63ff029aef9c54839'
      // }
      // dispatch(updateCommentByBlog({ avatar_default: userInfo.avatar_url, ...obj }))
      // setComment({ text: '', parent: null })
      // setIsHideComment(false)
      // if(setIsReplyVisible){
      //   setIsReplyVisible(false)
      // }

      const res = await addCommentAPI(payload)
      if (res.statusCode === 201) {
        setComment({ text: '', parent: null })
        dispatch(updateCommentByBlog({ avatar_default: userInfo.avatar_url, ...res.data }))
        setIsHideComment(false)
        setIsReplyVisible && setIsReplyVisible(false)
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
