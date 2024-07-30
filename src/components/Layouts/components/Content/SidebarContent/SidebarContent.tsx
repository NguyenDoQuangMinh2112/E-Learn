import classNames from 'classnames/bind'
import styles from './SidebarContent.module.scss'

const cx = classNames.bind(styles)

const SidebarContent = () => {
  return <div className={cx('wrapper')}>SidebarContent</div>
}

export default SidebarContent
