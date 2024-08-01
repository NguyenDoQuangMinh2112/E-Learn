import classNames from 'classnames/bind'
import styles from './SidebarContent.module.scss'

import CustomSlider from './Slider'
import ListCourse from '../../ListCourse'

const cx = classNames.bind(styles)

const SidebarContent = () => {
  return (
    <div className={cx('wrapper')}>
      <CustomSlider />

      {/* List Course */}
      <div className={cx('container')}>
        <ListCourse />
      </div>
      {/* End List Course */}
    </div>
  )
}

export default SidebarContent
