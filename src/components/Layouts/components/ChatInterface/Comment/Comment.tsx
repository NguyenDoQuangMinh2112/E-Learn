import classNames from 'classnames/bind'
import styles from './Comment.module.scss'
import { useSelector } from 'react-redux'
import { authSelector } from '~/redux/auth/authSelectors'
import { Comment as CommentInterface } from '~/interfaces/blog'
import { useState } from 'react'
import CommentField from '../CommentField/CommentField'
const cx = classNames.bind(styles)
interface CommentProps {
  commentData: CommentInterface
  // onReply: (parentId: string, replyText: string) => void;
}

const Comment = ({ commentData }: CommentProps) => {
  const { userInfo } = useSelector(authSelector)
  const [isReplyVisible, setIsReplyVisible] = useState(false)
  const handleReplyToggle = () => {
    setIsReplyVisible(!isReplyVisible) // Chuyển đổi trạng thái hiển thị
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('userAvatar')}>
          <img src={userInfo?.avatar_url} alt="avatar" />
        </div>
        <span className={cx('userName')}>{userInfo?.fullName}</span>
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
      {isReplyVisible && <CommentField isReplyForm={true} setIsReplyVisible={setIsReplyVisible} />}
    </div>
  )
}

export default Comment
