import { memo } from 'react'

import classNames from 'classnames/bind'
import styles from './Notification.module.scss'

import moment from 'moment'

import { NotificationInterface } from '~/interfaces/notification'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/redux/store'
import { showChat } from '~/redux/noteLesson/noteLessonSlice'
import { markAsSeenNotificationAPI } from '~/apis/notification'

const cx = classNames.bind(styles)

interface ItemNotificationInterface {
  data: NotificationInterface
  onMarkAsSeen: (notificationId: string) => void
}
const ItemNotification = ({ data, onMarkAsSeen }: ItemNotificationInterface) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleClickNotification = async (type: 'comment' | 'like' | 'reply') => {
    onMarkAsSeen(data._id)
    navigate(`/blog/${data.blog._id}`)
    await markAsSeenNotificationAPI(data._id)
    if (type === 'comment' || type === 'reply') {
      dispatch(showChat())
    }
  }

  return (
    <div className={cx('notification', { no_seen: !data?.seen })} onClick={() => handleClickNotification(data?.type)}>
      <div className={cx('notification__avatar')}>
        <div className={cx('avatar')}>
          <img src={data?.user?.avatar_url} alt="avatar" loading="lazy" />
        </div>
      </div>
      <div className={cx('notification__message')}>
        {data?.type === 'reply' && (
          <div>
            <strong>{data?.user?.fullName}</strong> đã phản hồi bình luận của bạn:
            <strong> {data?.blog?.title}.</strong>
          </div>
        )}
        {data?.type === 'like' && (
          <div>
            <strong>{data?.user?.fullName}</strong> đã thích:
            <strong> {data?.blog?.title}.</strong>
          </div>
        )}
        {data?.type === 'comment' && (
          <div>
            <strong>{data?.user?.fullName}</strong> đã bình luận
            <strong> {data?.blog?.title}.</strong>
          </div>
        )}
        <div className={cx('createdTime')}>{moment(new Date(data?.createdAt)).fromNow()}</div>
      </div>
    </div>
  )
}

export default memo(ItemNotification)
