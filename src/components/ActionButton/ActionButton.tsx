import classNames from 'classnames/bind'
import styles from './ActionButton.module.scss'

import { FaRegBookmark } from 'react-icons/fa'
import { FaEllipsis } from 'react-icons/fa6'
import Tippy from '@tippyjs/react/headless'

import { FaFacebookSquare } from 'react-icons/fa'
import { FaLink } from 'react-icons/fa6'
import { IoFlagSharp } from 'react-icons/io5'

import { useState } from 'react'

const cx = classNames.bind(styles)

const ActionButton = () => {
  const [open, setOpen] = useState(false)
  console.log(open)

  return (
    <div className={cx('actions')}>
      <div className={cx('toggle')}>
        <FaRegBookmark />
      </div>

      <Tippy
        placement="top"
        interactive
        delay={[0, 300]}
        offset={[12, 8]}
        trigger="click"
        render={(attrs) => (
          <ul className={cx('wrapper', 'options')} tabIndex={-1} {...attrs}>
            <li>
              <FaFacebookSquare />
              <span>Chia sẻ lên Facebook</span>
            </li>

            <li>
              <FaLink />
              <span>Chia sẻ lên Facebook</span>
            </li>

            <li>
              <IoFlagSharp />
              <span>Chia sẻ lên Facebook</span>
            </li>
          </ul>
        )}
      >
        <div className={cx('options')}>
          <FaEllipsis onClick={() => setOpen(!open)} />
        </div>
      </Tippy>
    </div>
  )
}

export default ActionButton
