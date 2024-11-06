import classNames from 'classnames/bind'
import styles from './ChatInterface.module.scss'
import Button from '~/components/Button'
import { IoMdClose } from 'react-icons/io'
import { hideChat } from '~/redux/noteLesson/noteLessonSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Comment from './Comment/Comment'
import { blogSelector } from '~/redux/blog/blogSelector'
import CommentField from './CommentField/CommentField'

import { AppDispatch } from '~/redux/store'
const cx = classNames.bind(styles)

const ChatInterface = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { commentByBlog } = useSelector(blogSelector)
  console.log('🚀 ~ ChatInterface ~ commentByBlog:', commentByBlog)
  const parentComments = commentByBlog?.filter((comment) => comment.parent === null)

  return (
    <div className={cx('wrapper')}>
      <div className={cx('overlay')}></div>
      <div className={cx('container')}>
        <div className={cx('close')}>
          <Button className={cx('close-btn')} onClick={() => dispatch(hideChat())}>
            <IoMdClose size={25} color="#655b5b" />
          </Button>
        </div>
        <div className={cx('body')}>
          <CommentField />

          {/* Show comment */}
          <div className={cx('listComment')}>
            <h2 className={cx('title')}>{commentByBlog?.length} comment(s)</h2>

            {parentComments &&
              parentComments?.map((comment) => (
                <Comment key={comment._id} commentData={comment} commentsList={commentByBlog} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface
