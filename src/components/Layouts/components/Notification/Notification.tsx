import classNames from 'classnames/bind'
import styles from './Notification.module.scss'

import Tippy from '@tippyjs/react/headless'

import { IoNotifications } from 'react-icons/io5'

import PopperWrapper from '../Popper'
import Button from '~/components/Button'
import ItemNotification from './ItemNotification'

import { useCallback, useEffect, useState } from 'react'
import { NotificationInterface } from '~/interfaces/notification'
import { getNotificationByUserIdAPI, markAllNotificationAPI } from '~/apis/notification'

import { useSelector } from 'react-redux'
import { authSelector } from '~/redux/auth/authSelectors'

const cx = classNames.bind(styles)

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationInterface[] | null>(null)
  const { userInfo } = useSelector(authSelector)
  const { socket } = useSelector((state: any) => state.socket)

  const fetchNotificationsApi = useCallback(async () => {
    try {
      const response = await getNotificationByUserIdAPI()
      if (response.statusCode === 200 && response.data.length > 0) {
        setNotifications(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  const handleMarkAllAsRead = useCallback(() => {
    if (notifications) {
      const updatedNotifications = notifications.map((notification) => ({
        ...notification,
        seen: true
      }))
      setNotifications(updatedNotifications)
      markAllNotificationAPI()
    }
  }, [notifications])

  const handleMarkAsSeen = useCallback(
    (notificationId: string) => {
      if (notifications) {
        const updatedNotifications = notifications.map((notification) => {
          if (notification._id === notificationId) {
            return { ...notification, seen: true }
          }
          return notification
        })
        setNotifications(updatedNotifications)
      }
    },
    [notifications]
  )

  useEffect(() => {
    if (userInfo) {
      fetchNotificationsApi()
    }

    return () => {
      socket?.off('newNotification')
    }
  }, [socket, userInfo?._id])

  useEffect(() => {
    if (socket) {
      socket.on('newNotification', (notification: any) => {
        setNotifications((prev) => {
          return [notification, ...(prev || [])]
        })
      })
    }
    return () => {
      socket?.off('newNotification')
    }
  }, [socket])

  return (
    <Tippy
      interactive
      delay={[0, 300]}
      offset={[12, 8]}
      trigger="click"
      placement="bottom-start"
      render={(attrs) => (
        <div tabIndex={-1} {...attrs}>
          <PopperWrapper className={cx('notification__list--popper')}>
            <ul className={cx('notification__list')}>
              <header>
                <h4>Thông báo</h4>
                <Button className={cx('mark-as-read')} onClick={handleMarkAllAsRead}>
                  Đánh dấu đã đọc
                </Button>
              </header>

              <div className={cx('notification__content')}>
                {notifications?.map((notification) => (
                  <ItemNotification data={notification} key={notification._id} onMarkAsSeen={handleMarkAsSeen} />
                ))}
              </div>
            </ul>
          </PopperWrapper>
        </div>
      )}
    >
      <div>
        {userInfo && (
          <div className={cx('notification__icon')}>
            <IoNotifications />
            {notifications && notifications?.filter((not) => !not?.seen).length > 0 && (
              <div className={cx('count')}>{notifications?.filter((not) => !not?.seen).length}</div>
            )}
          </div>
        )}
      </div>
    </Tippy>
  )
}

export default Notification
