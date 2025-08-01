import type React from 'react'
import classNames from 'classnames/bind'
import { FaChevronDown } from 'react-icons/fa'
import styles from './ScrollToBottom.module.scss'

const cx = classNames.bind(styles)

interface ScrollToBottomProps {
  onClick: () => void
  show: boolean
  hasNewMessage?: boolean
}

const ScrollToBottom: React.FC<ScrollToBottomProps> = ({ onClick, show, hasNewMessage = false }) => {
  if (!show) return null

  return (
    <div className={cx('scrollToBottom', { show, hasNewMessage })}>
      <button className={cx('scrollButton')} onClick={onClick} aria-label="Scroll to bottom">
        <FaChevronDown className={cx('scrollIcon')} />
        {hasNewMessage && <div className={cx('newMessageDot')} />}
      </button>
    </div>
  )
}

export default ScrollToBottom
