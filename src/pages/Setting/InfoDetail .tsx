import styles from './Setting.module.scss'
import classNames from 'classnames/bind'

import { FaChevronRight } from 'react-icons/fa'

const cx = classNames.bind(styles)

const InfoDetail = ({
  label,
  value,
  image = false,
  onClick
}: {
  label: string
  value?: string
  image?: boolean
  onClick?: () => void
}) => {
  return (
    <div className={cx('info_details', { hasEmail: image })} onClick={onClick}>
      <div className={cx('wrapper1', { hasEmail: image })}>
        <h4>{label}</h4>
        <span>{value}</span>
        {image && (
          <img
            className={cx('avatar')}
            src="https://files.fullstack.edu.vn/f8-prod/public-images/6676511103ac3.png"
            alt="avtar"
          />
        )}
      </div>
      <button className={cx('right_btn')}>
        <FaChevronRight />
      </button>
    </div>
  )
}

export default InfoDetail
