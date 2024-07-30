import classNames from 'classnames/bind'
import styles from './Content.module.scss'

import Sidebar from './Sidebar'

import { Outlet } from 'react-router-dom'

const cx = classNames.bind(styles)

const Content = () => {
  return (
    <div className={cx('wrapper')}>
      <Sidebar />
      <div className={cx('content')}>
        <Outlet />
      </div>
    </div>
  )
}

export default Content
