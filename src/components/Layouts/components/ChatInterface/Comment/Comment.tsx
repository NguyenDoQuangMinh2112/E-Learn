import { useState } from 'react'

import classNames from 'classnames/bind'
import styles from './Comment.module.scss'

import { Comment as CommentInterface } from '~/interfaces/blog'
import CommentField from '../CommentField/CommentField'

const cx = classNames.bind(styles)

interface CommentProps {
  commentData: CommentInterface
  commentsList: CommentInterface[] | null
}

const Comment = ({ commentData, commentsList }: CommentProps) => {
  const { commented_by } = commentData
  const [isReplyVisible, setIsReplyVisible] = useState(false)

  const childrenComments = commentData.children
    .map((childId) => {
      // Tìm đối tượng bình luận từ ID trong commentsList
      return commentsList?.find((comment) => comment._id === childId)
    })
    .filter(Boolean)

  const handleReplyToggle = () => {
    setIsReplyVisible(!isReplyVisible)
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('userAvatar')}>
          <img src={commented_by?.avatar_url || commentData?.avatar_default} alt="avatar" />
        </div>
        <span className={cx('userName')}>{commented_by?.fullName}</span>
      </div>

      <div className={cx('body')}>
        <div className={cx('content')}>
          <p>{commentData?.comment}</p>
        </div>
      </div>

      <div className={cx('reaction')}>
        <span className={cx('reactBtn')}>Like</span>
        <button className={cx('reactBtn')} onClick={handleReplyToggle}>
          Reply
        </button>
      </div>
      {isReplyVisible && (
        <CommentField isReplyForm={true} setIsReplyVisible={setIsReplyVisible} parentId={commentData._id} />
      )}
      {childrenComments.length > 0 && (
        <div className={cx('childrent_cmt')}>
          {childrenComments.map((childComment) => (
            <Comment key={childComment!._id} commentData={childComment!} commentsList={commentsList} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Comment
