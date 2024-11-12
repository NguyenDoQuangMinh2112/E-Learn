import classNames from 'classnames/bind'
import styles from './Notification.module.scss'
import { NotificationInterface } from '~/interfaces/notification'
import moment from 'moment'

const cx = classNames.bind(styles)

interface ItemNotificationInterface {
  data: NotificationInterface
}
const ItemNotification = ({ data }: ItemNotificationInterface) => {
  return (
    <div className={cx('notification', { no_seen: !data?.seen })}>
      <div className={cx('notification__avatar')}>
        <div className={cx('avatar')}>
          <img src={data?.user?.avatar_url} alt="avatar" />
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

export default ItemNotification
